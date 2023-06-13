import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './db';
import { ServerSession } from '@/types';

export const getUser = async () => {
  const session = await getServerSession({ ...authOptions });
  return session?.user;
};

export const getUserFromDb = async () => {
  const session: ServerSession = await getServerSession({ ...authOptions });
  const id = session?.user.id;
  if (!id) {
    return null;
  }
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
  // return await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });
};
