'use server';

import { cookies } from 'next/headers';

export const getCookies = (cookie: string) => {
  const cookieStore = cookies();
  const auth = cookieStore.get(cookie)?.value;
  return auth;
};
