import { cookies } from 'next/headers';
import Dashboard from './home/page';
import Welcome from './components/Welcome';

export default function Home() {
  const cookieStore = cookies();
  const accessCookie = cookieStore.get('access_token');

  return <>{accessCookie ? <Dashboard /> : <Welcome />}</>;
}
