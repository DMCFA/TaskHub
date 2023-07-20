import { Model } from 'sequelize';

export interface UserTeamAttributes extends Model {
  user_id: number;
  team_id: number;
  is_admin: boolean;
}
