import User from '../app/models/User';
import Task from '../app/models/Task';
import Comment from '../app/models/Comment';
import Team from '../app/models/Team';
import UserTeam from '../app/models/UserTeam';
import Project from '../app/models/Project';
import UserProject from '../app/models/UserProject';

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

User.belongsToMany(Project, {
  through: { model: UserProject, unique: false },
  foreignKey: 'user_id',
});

Project.belongsToMany(User, {
  through: { model: UserProject, unique: false },
  foreignKey: 'project_id',
});

Task.belongsTo(Project, {
  foreignKey: 'project_id',
  as: 'project',
});

Project.hasMany(Task, {
  foreignKey: 'project_id',
  as: 'tasks',
});

export { User, Task, Comment, Team, Project };
