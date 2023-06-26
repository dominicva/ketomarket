import { Session } from 'next-auth';

// Extend the Session type to include the user id
export type ServerSession =
  | ({
      user: {
        id: string;
      };
    } & Session)
  | null;
