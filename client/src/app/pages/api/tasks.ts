const baseUrl = 'http://localhost:3001/api/tasks';
const headers = { 'Content-Type': 'application/json' };

type taskPriority = 'Urgent' | 'High' | 'Standard' | 'Low';

export type taskStatus =
  | 'Pending'
  | 'In Progress'
  | 'Completed'
  | 'On Hold'
  | 'Verification'
  | 'Cancelled';

export interface Task {
  type: 'task';
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

export const getTaskById = async (userId: number): Promise<Task> => {
  try {
    const response = await fetch(`${baseUrl}/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};
