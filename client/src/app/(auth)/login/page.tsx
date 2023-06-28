'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import {
  FormControl,
  Divider,
  Tooltip,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { BiShow, BiHide } from 'react-icons/bi';
import { GrGoogle, GrFacebook, GrApple } from 'react-icons/gr';
import Link from 'next/link';
import Image from 'next/image';
import { loginUser } from '../../pages/api/users';

interface userIsValid {
  usernameValid: boolean;
  usernameError: string;
  usernameSuccess: boolean;
  passwordValid: boolean;
  passwordError: string;
  passwordSuccess: boolean;
  showPassword: boolean;
}

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userIsValid, setUserIsValid] = useState<userIsValid>({
    usernameValid: false,
    usernameError: '',
    usernameSuccess: false,
    passwordValid: false,
    passwordError: '',
    passwordSuccess: false,
    showPassword: false,
  });

  let usernameTimer: ReturnType<typeof setTimeout>;
  let passwordTimer: ReturnType<typeof setTimeout>;

  const handleUsernameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setUsername(value);

    clearTimeout(usernameTimer);
    usernameTimer = setTimeout(() => {
      validateUsername(value);
    }, 500);
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setPassword(value);

    clearTimeout(passwordTimer);
    passwordTimer = setTimeout(() => {
      validatePassword(value);
    }, 500);
  };

  const handleShowPassword = () => {
    setUserIsValid((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const validateUsername = (value: string) => {
    if (value.length < 4) {
      setUserIsValid((prevState) => ({
        ...prevState,
        usernameError: 'Username must have a minimum length of 4 characters',
        usernameSuccess: false,
      }));
    } else {
      setUserIsValid((prevState) => ({
        ...prevState,
        usernameError: '',
        usernameSuccess: true,
      }));
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 8 || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
      setUserIsValid((prevState) => ({
        ...prevState,
        passwordError:
          'Password must have a minimum length of 8 characters, an uppercase letter, and a number',
        passwordSuccess: false,
      }));
    } else {
      setUserIsValid((prevState) => ({
        ...prevState,
        passwordError: '',
        passwordSuccess: true,
      }));
    }
  };

  const validateFields = () => {
    let isValid = true;

    if (
      userIsValid.usernameError.length > 0 ||
      userIsValid.passwordError.length > 0
    ) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);

    //validate fields
    if (validateFields()) {
      const data = {
        username,
        password,
      };

      //fetch
      const user = await loginUser(data);

      // Display login error message
      if (!user) {
        setUserIsValid((prevState) => ({
          ...prevState,
          usernameError: 'Invalid username or password',
          passwordError: 'Invalid username or password',
        }));
      }
    }
    setIsLoading(false);
  };
  return (
    <section className='login'>
      <div className='login__web-image-container'>
        <Image
          src='/img/home-pattern.jpg'
          className='login__web-image login__pattern'
          priority
          width={400}
          height={700}
          alt=''
        />
        <Image
          src='/img/logo-no-background.svg'
          className='login__web-image login__logo'
          priority
          width={300}
          height={300}
          alt='company logo'
        />
      </div>
      <div className='login__container'>
        <h1>Welcome back</h1>
        <div className='login__form-container'>
          <Box component='form' className='login__form' onSubmit={handleSubmit}>
            <FormControl className='login__user' fullWidth>
              <TextField
                id='user-login'
                className={userIsValid.usernameSuccess ? 'input--success' : ''}
                label='Username'
                helperText={
                  userIsValid.usernameError
                    ? userIsValid.usernameError
                    : 'Please enter your username or email'
                }
                aria-describedby='enter your email or username'
                required
                error={!!userIsValid.usernameError}
                value={username}
                onChange={(e) => handleUsernameChange(e)}
              />
            </FormControl>
            <FormControl className='login__password' fullWidth error>
              <TextField
                autoComplete='off'
                id='user-password'
                className={userIsValid.passwordSuccess ? 'input--success' : ''}
                label='Password'
                helperText={
                  userIsValid.passwordError
                    ? userIsValid.passwordError
                    : 'Please enter your password'
                }
                error={!!userIsValid.passwordError}
                aria-describedby='enter your password'
                type={userIsValid.showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleShowPassword} edge='end'>
                        {userIsValid.showPassword ? <BiHide /> : <BiShow />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <div className='login__btn-container'>
              <Tooltip title='Submit' placement='bottom-end'>
                <button
                  type='submit'
                  aria-label='submit'
                  className='login__btn'
                >
                  {isLoading ? (
                    <span className='login__loading'></span>
                  ) : (
                    'Log in'
                  )}
                </button>
              </Tooltip>
            </div>
          </Box>
          <div className='login__register'>
            <Link href='/sign-up' className='login__link'>
              Don&apos;t have an account?
            </Link>
          </div>
        </div>
        <Divider variant='fullWidth' flexItem />
        <div className='login__alt-options'>
          <div className='login__external-btn'>
            <button type='submit' className='login__google'>
              <GrGoogle />
              Continue with Google
            </button>
          </div>
          <div className='login__external-btn'>
            <button type='submit' className='login__facebook'>
              <GrFacebook /> Continue with Facebook
            </button>
          </div>
          <div className='login__external-btn'>
            <button type='submit' className='login__apple'>
              <GrApple /> Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
