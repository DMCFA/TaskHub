import { Model } from 'sequelize';

interface Comment {
  comment: string;
  user_id: number;
  posted_date: Date;
  likes: number;
}

export interface TaskAttributes extends Model {
  task_id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: Date;
  start_date: Date | null;
  completion_date: Date | null;
  tags: string[] | null;
  attachments: string[] | null;
  comments: Comment[] | null;
  subtasks: number[] | null;
  followers: number[] | null;
  estimated_time: number | null;
  actual_time: number | null;
  task_dependencies: number[] | null;
  assigned_user_id: number;
  project_id: number;
  created_on: Date;
  updated_on: Date;
}
