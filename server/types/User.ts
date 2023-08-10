import { Model } from 'sequelize';
import { ProjectAttributes } from './Project';

export interface UserAttributes {
  user_id: number;
  username: string;
  fname: string;
  email: string;
  password: string;
  created_on: Date;
  last_login: Date | null;
  is_admin: boolean;
  avatar: string | null;
  projects?: ProjectAttributes[];
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  isValidPassword: (password: string) => Promise<boolean>;
  getProjects: () => Promise<ProjectAttributes[]>;
  token: string;
}
