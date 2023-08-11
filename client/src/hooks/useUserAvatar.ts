import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Project } from '../services/features/projectSlice';
import { Task } from '../app/pages/api/tasks';
import { getUserAvatar } from '../app/pages/api/users';

export default function useUserAvatar(data: Project | Task, isTask: boolean) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    '/img/user-default.svg'
  );

  const avatarQueryResult = useQuery(
    ['userAvatar', isTask ? (data as Task).assigned_user_id : null],
    () =>
      isTask
        ? getUserAvatar((data as Task).assigned_user_id)
        : Promise.resolve(null)
  );

  useEffect(() => {
    if (!avatarQueryResult.isSuccess) {
      setAvatarUrl('/img/user-default.svg');
    }
  }, [avatarQueryResult.isSuccess]);

  return avatarUrl;
}
