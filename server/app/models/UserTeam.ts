import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import { UserTeamAttributes } from '../../types/UserTeam';
import User from './User';
import Team from './Team';

const UserTeam = sequelize.define<UserTeamAttributes>(
  'user_teams',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: 'team_id',
      },
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

User.belongsToMany(Team, { through: UserTeam });
Team.belongsToMany(User, { through: UserTeam });

export default UserTeam;
