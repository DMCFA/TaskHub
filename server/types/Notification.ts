import { Model } from 'sequelize';

export interface NotificationAttributes extends Model {
  notification_id: number;
  user_id: number;
  message: string;
  timestamp: Date;
  read_status: 'read' | 'unread';
}
