'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../../lib/ThemeContext';
import { useRouter } from 'next/navigation';
import {
  autoLogin,
  getProjectsForUser,
  getUserTasks,
} from '../../pages/api/users';
import { getNotificationsForUser } from '../../pages/api/notifications';
import MobileDashboard from '../../components/Dashboard/MobileDashboard';
import HomeView from '../../components/Dashboard/HomeView';
import SectionHeader from '../../components/Dashboard/SectionHeader';
import { Project } from '../../../services/features/projectSlice';
import { useQuery } from '@tanstack/react-query';
import { Task } from '../../pages/api/tasks';
import { getRandomProjects } from '../../pages/api/projects';

//types
type activeTab = 'projects' | 'favorites' | 'time-sensitive';

export default function Dashboard() {
  const [active, setActive] = useState<activeTab>('projects');
  const [openSection, setOpenSection] = useState<string | null>(null);
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

  const userId = user?.user?.user_id;
  const {
    data: tasks,
    isError: tasksError,
    isLoading: tasksLoading,
  } = useQuery<Task[], Error>(
    ['tasksByUserId', userId],
    () => getUserTasks(userId!),
    {
      enabled: !!userId,
    }
  );

  const {
    data: favorites,
    isError,
    isLoading,
  } = useQuery<Project[]>(['favorites'], getRandomProjects);

  const isDataLoading =
    tasksLoading || isLoading || !user.user || projects.length === 0;

  if (isDataLoading) {
    return <h1>Loading Skeleton Here...</h1>;
  }

  if (user.user) {
    return (
      <section className='dashboard'>
        <MobileDashboard active={active} setActive={setActive} />
        <SectionHeader projects={projects} 
         openSection={openSection}
         setOpenSection={setOpenSection}  />
        <HomeView
          projects={projects}
          favorites={favorites || []}
          timeSensitive={tasks || []}
          activeTab={active}
        />
      </section>
    );
  }
}
