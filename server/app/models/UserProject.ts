import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import User from './User';
import Project from './Project';

const UserProject = sequelize.define(
  'user_projects',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Project,
        key: 'project_id',
      },
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

export default UserProject;
