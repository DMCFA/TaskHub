import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../../config/database';
import { UserInstance } from '../../types/User';

const User = sequelize.define<UserInstance>(
  'users',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [4, 50],
          msg: 'Username must have a minimum of 4 characters',
        },
      },
    },
    fname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: 'Password must have a minimum of 8 characters',
        },
        isStrongPassword: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
          msg: 'Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        },
      },
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

User.prototype.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default User;
