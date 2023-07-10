import { Model } from 'sequelize';

export interface CommentAttributes extends Model {
  comment_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}
