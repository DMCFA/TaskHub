import { Model } from 'sequelize';

type taskPriority = 'Urgent' | 'High' | 'Standard' | 'Low';

type taskStatus =
  | 'Pending'
  | 'In Progress'
  | 'Completed'
  | 'On Hold'
  | 'Verification'
  | 'Cancelled';

export interface TaskAttributes extends Model {
  task_id: number;
  title: string;
  description: string | null;
  status: taskStatus;
  priority: taskPriority;
  due_date: Date;
  start_date: Date | null;
  completion_date: Date | null;
  tags: string[] | null;
  attachments: string[] | null;
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
