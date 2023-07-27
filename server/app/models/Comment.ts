import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import { CommentAttributes } from '../../types/Comment';
import User from './User';
import Task from './Task';

const Comment = sequelize.define<CommentAttributes>(
  'comments',
  {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Comment.belongsTo(Task, {
  foreignKey: 'task_id',
  as: 'task',
});

export default Comment;
