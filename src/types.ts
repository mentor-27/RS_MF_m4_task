// Note types
export type TNoteData = {
  title: string;
  content?: string;
  createdAt?: string;
  uid?: string;
  id?: string;
};

export interface INote {
  [id: string]: TNoteData;
}

// User types
export type TUserData = {
  email: string;
  createdAt: string;
};

// Auth types
type TProviderData = {
  displayName: string | null;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

type TTokenData = {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
};

export type TUserCredential = {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: TProviderData[];
  stsTokenManager: TTokenData;
  uid: string;
};
