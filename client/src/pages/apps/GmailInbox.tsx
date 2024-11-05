import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { GmailMessage } from "../../lib/types";
import { useCallback, useState } from "react";

const GmailInbox: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [unreadMesasge, setunreadMessage] = useState<GmailMessage[]>([]);

  const handleLoginSuccess = useCallback(
    async (tokenResponse: TokenResponse) => {
      setIsLoading(true);
      setError(null);
      console.log("tokenResponse", tokenResponse);
      try {
        const listResponse = await fetch(
          "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread+in:inbox",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const listData = await listResponse.json();
        const messages = listData.messages || [];
        console.log("listData", listData);
        console.log("messages", messages);
        // Fetch full message details for each unread message
        const fullMessages = await Promise.all(
          messages.map(async (message: { id: string }, index: number) => {
            const messageResponse = await fetch(
              `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              }
            );
            const messageData = await messageResponse.json();
            const headers = messageData.payload.headers;
            const subject =
              headers.find(
                (header: { name: string; value: string }) =>
                  header.name === "Subject"
              )?.value || "No Subject";
            const from =
              headers.find(
                (header: { name: string; value: string }) =>
                  header.name === "From"
              )?.value || "Unknown Sender";
            let body;
            console.log("headers==>", headers);
            console.log("subject==>", subject);
            console.log("from==>", from);
            if (messageData.payload.parts) {
              const textPart = messageData.payload.parts.find(
                (part: { mimeType: string }) => part.mimeType === "text/plain"
              );
              if (textPart && textPart.body.data) {
                body = atob(
                  textPart.body.data.replace(/-/g, "+").replace(/_/g, "/")
                );
              }
            } else if (messageData.payload.body.data) {
              body = atob(
                messageData.payload.body.data
                  .replace(/-/g, "+")
                  .replace(/_/g, "/")
              );
            }
            console.log("messageData", index + " " + body);
            return {
              id: messageData.id,
              threadId: messageData.threadId,
              snippet: messageData.snippet,
              subject,
              from,
              body,
            };
          })
        );
        console.log("fullMessages", fullMessages);
        setunreadMessage(fullMessages);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
        setError("Failed to fetch unread messages");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleLoginError = useCallback(() => {
    setError("Failed to log in with Google");
    setIsLoading(false);
  }, []);

  const handleSignIn = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    scope: "https://www.googleapis.com/auth/gmail.readonly",
  });

  return (
    <div>
      <h1>Gmail Inbox</h1>
      <button
        onClick={() => handleSignIn()}
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        {isLoading ? "Loading..." : "Log in with Google"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {unreadMesasge.length > 0 && (
        <div>
          <h2>Unread Messages</h2>
          <ul>
            {unreadMesasge.map((message) => (
              <li key={message.id}>
                <div className="w-full grid grid-cols-12">
                  <strong className="col-span-2">ID:</strong> {message.id}
                  <strong className="col-span-2">Thread ID:</strong>{" "}
                  {message.threadId}
                  <strong className="col-span-2">Snippet:</strong>{" "}
                  {message.snippet}
                  <strong className="col-span-2">Subject:</strong>{" "}
                  {message.subject}
                  <strong className="col-span-2">From:</strong> {message.from}
                  <strong className="col-span-2">Body:</strong> {message.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GmailInbox;
