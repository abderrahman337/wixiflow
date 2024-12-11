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

export interface User {
  _id: string;
  email: string;
  subscription?: {
    remain?: number;
    total?: number;
    plan?: string;
    expiresAt?: string;
  };
  createdAt: string;
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
