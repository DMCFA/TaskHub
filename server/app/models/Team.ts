// Team model
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import { TeamAttributes } from '../../types/Team';
import Project from './Project';

const Team = sequelize.define<TeamAttributes>(
  'teams',
  {
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
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

Team.hasMany(Project, { foreignKey: 'team_id' });
Project.belongsTo(Team, { foreignKey: 'team_id' });

export default Team;
