import User from '../app/models/User';
import Task from '../app/models/Task';
import Comment from '../app/models/Comment';

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

export { User, Task, Comment };
