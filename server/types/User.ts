import { Model } from 'sequelize';

export interface UserAttributes {
  user_id: number;
  username: string;
  fname: string;
  email: string;
  password: string;
  created_on: Date;
  last_login: Date | null;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  isValidPassword: (password: string) => boolean;
}