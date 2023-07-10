import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import { TaskAttributes } from '../../types/Task';

const Tasks = sequelize.define<TaskAttributes>(
  'tasks',
  {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completion_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    comments: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    subtasks: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    estimated_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actual_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    task_dependencies: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    assigned_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /*
        references: {
            model: 'projects',
            key: 'project__id',
          },
          */
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Tasks;
