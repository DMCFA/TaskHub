import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import User from './User';
import { NotificationAttributes } from '../../types/Notification';

const Notification = sequelize.define<NotificationAttributes>(
  'notifications',
  {
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    read_status: {
      type: DataTypes.ENUM('read', 'unread'),
      allowNull: false,
      defaultValue: 'unread',
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Notification.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

export default Notification;
