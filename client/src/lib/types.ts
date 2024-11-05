export interface AuthUserData {
  email?: string | undefined;
  password?: string | undefined;
}
export interface AuthError {
  email?: string | undefined;
  password?: string | undefined;
}

export interface SigninProps {
  closeModal: () => void;
}

export interface PaymentOptions {
  amount: number;
  currency: string;
  mode: string;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  body: string;
}
