import User from '../app/models/User';
import Task from '../app/models/Task';
import Comment from '../app/models/Comment';
import Team from '../app/models/Team';
import UserTeam from '../app/models/UserTeam';

User.hasMany(Task, {
  foreignKey: 'assigned_user_id',
  as: 'tasks',
});

Task.belongsTo(User, {
  foreignKey: 'assigned_user_id',
  as: 'user',
});

Task.hasMany(Comment, {
  foreignKey: 'task_id',
  as: 'comments',
});

Comment.belongsTo(Task, {
  foreignKey: 'task_id',
  as: 'tasks',
});

User.belongsToMany(Team, {
  through: { model: UserTeam, unique: false },
  foreignKey: 'user_id',
});

Team.belongsToMany(User, {
  through: { model: UserTeam, unique: false },
  foreignKey: 'team_id',
});

export { User, Task, Comment };
