import User from '../app/models/User';
import Task from '../app/models/Task';

User.hasMany(Task, {
  foreignKey: 'assigned_user_id',
  as: 'tasks',
});

Task.belongsTo(User, {
  foreignKey: 'assigned_user_id',
  as: 'user',
});

export { User, Task };
