import { Model } from 'sequelize';

export interface ProjectAttributes extends Model {
  project_id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  project_manager_id: number;
  team_id: number;
  created_on: Date;
  updated_on: Date;
}
