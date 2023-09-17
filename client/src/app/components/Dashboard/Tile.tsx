import { Card, CardContent, Avatar, Icon, Typography } from '@mui/material';
import { MdOutlineWork } from 'react-icons/md';
import { BsFileBarGraphFill, BsThreeDots } from 'react-icons/bs';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Project } from '../../../services/features/projectSlice';
import { Task, taskStatus } from '../../pages/api/tasks';
import { getTimeLeft } from '../../../lib/utilFunctions';
import { User } from '../../../services/features/userSlice';
import useUserAvatar from '../../../hooks/useUserAvatar';
import useTeamData from '../../../hooks/useTeamData';

interface TileProps {
  data: Project | Task;
  index: number;
}

export default function Tile({ data, index }: TileProps) {
  const isProject = 'project_id' in data && !('due_date' in data);
  const isTask = 'task_id' in data;
  const avatarUrl = useUserAvatar(data, isTask);
  const { teamData, teamDataIsLoading } = useTeamData(data, isProject);
  const title = (data as Task).title || (data as Project).name;

  const isInProgress = (status: taskStatus) =>
    status !== 'Completed' && status !== 'Cancelled';

  const tasksInProgress = isProject
    ? (data as Project).tasks?.filter((task) => isInProgress(task.status))
        .length ?? 0
    : 0;

  const tasksCompleted = isProject
    ? (data as Project).tasks?.filter((task) => task.status === 'Completed')
        .length ?? 0
    : 0;

  return (
    <Card variant='outlined' className='tile'>
      <CardContent className='tile__container'>
        <div className='tile__icons'>
          <Icon fontSize='large'>
            {index % 2 === 0 ? <MdOutlineWork /> : <BsFileBarGraphFill />}
          </Icon>
          <Icon fontSize='large'>
            {Math.random() < 0.5 ? <AiOutlineStar /> : <AiFillStar />}
          </Icon>
          <Icon fontSize='large' sx={{ cursor: 'pointer' }}>
            <BsThreeDots />
          </Icon>
        </div>

        {/* Project/Task Name */}
        <div className='tile__title'>
          <Typography
            variant='h5'
            component='div'
            align='left'
            style={{ margin: '16px 0' }}
          >
            {title}
          </Typography>
        </div>

        {/* Project/task details */}
        {isProject ? (
          <div className='tile__details'>
            <div className='tile__detail'>
              <p className='tile__detail-name'>Tasks in Progress</p>
              <p className='tile__detail-value'>{tasksInProgress}</p>
            </div>
            <div className='tile__detail tile__detail--last'>
              <p className='tile__detail-name'>Tasks Completed</p>
              <p className='tile__detail-value'>{tasksCompleted}</p>
            </div>
          </div>
        ) : (
          <div className='tile__details'>
            <div className='tile__detail'>
              <p className='tile__detail-name'>Subtasks Left</p>
              <p className='tile__detail-value'>
                {(data as Task).subtasks?.length}
              </p>
            </div>
            <div className='tile__detail tile__detail--last'>
              <p className='tile__detail-name'>Time Left</p>
              <p className='tile__detail-value'>
                {getTimeLeft((data as Task).due_date)}
              </p>
            </div>
          </div>
        )}

        {/* Multiple Avatars at the bottom */}
        <div className='tile__avatar'>
          {teamData && teamData.users && !teamDataIsLoading ? (
            teamData?.users?.map((user: User) => (
              <Avatar
                key={user.user_id}
                src={user.avatar ? user.avatar : 'img/user-default.svg'}
              />
            ))
          ) : (
            <Avatar src={avatarUrl} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
