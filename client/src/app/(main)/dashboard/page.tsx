'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../../lib/ThemeContext';
import { useRouter } from 'next/navigation';
import { autoLogin, getProjectsForUser } from '../../pages/api/users';
import { getNotificationsForUser } from '../../pages/api/notifications';
import DashboardNav from '../../components/Nav/DashboardNav';
import HomeView from '../../components/Dashboard/HomeView';
import { Project } from '../../../services/features/projectSlice';

//types
type activeTab = 'projects' | 'favorites' | 'worked-on';

export default function Dashboard() {
  const [active, setActive] = useState<activeTab>('projects');
  const user = useSelector((state: RootState) => state.user);
  const projects = useSelector((state: RootState) => state.project.projects);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!user.user) {
      autoLogin(dispatch, router);
    }
  }, [user, dispatch, router]);

  useEffect(() => {
    if (user.user) {
      const userId = user?.user?.user_id;
      dispatch(getNotificationsForUser(userId));
      dispatch(getProjectsForUser(userId));
    }
  }, [user, dispatch]);

  if (user.user) {
    return (
      <section className='dashboard'>
        <DashboardNav active={active} setActive={setActive} />
        <div className='dashboard__web-container'>
          <HomeView projects={projects} workedOn={null} />
        </div>
      </section>
    );
  } else {
    return <h1>Loading placeholder</h1>;
  }
}
