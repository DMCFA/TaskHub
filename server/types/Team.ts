import { Model } from 'sequelize';

export interface TeamAttributes extends Model {
  team_id: number;
  name: string;
  description: string;
  created_on: Date;
  updated_on: Date;
}
