import { ServerSession } from './ServerSession';

export interface ProfileProps {
  session: ServerSession;
  children: React.ReactNode;
}
