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
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeAfterUnderscore } from '../../../lib/stringManipulation';
import { registerUser } from '../../pages/api/users';
import { AppDispatch } from '../../store';
import { signupSuccess } from '../../../services/features/userSlice';

interface inputFieldValidation {
  error: string;
  hasError: boolean;
  valid: boolean;
}

interface User {
  username: string;
  fname: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [userProperties, setUserProperties] = useState<User>({
    username: '',
    email: '',
    fname: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userIsValid, setUserIsValid] = useState<
    Partial<Record<keyof User, inputFieldValidation>>
  >({});

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  let inputTimers: { [key: string]: ReturnType<typeof setTimeout> } = {};

  //input validation
  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'username':
        validateUsername(value);
        break;
      case 'fname':
        validateFullName(value);
        break;
      case 'email':
        validateEmail(value);
        break;
      case 'password':
        validatePassword(value);
        break;
      default:
        break;
    }
  };

  const validateUsername = (value: string) => {
    if (value.length < 4) {
      setUserIsValid((prevState) => ({
        ...prevState,
        username: {
          error: 'Username must have a minimum length of 4 characters',
          hasError: true,
          valid: false,
        },
      }));
    } else {
      setUserIsValid((prevState) => ({
        ...prevState,
        username: { error: '', hasError: false, valid: true },
      }));
    }
  };

  const validateFullName = (value: string) => {
    if (value.length < 4) {
      setUserIsValid((prevState) => ({
        ...prevState,
        fname: {
          error: 'Name must have a minimum length of 4 characters',
          hasError: true,
          valid: false,
        },
      }));
    } else {
      setUserIsValid((prevState) => ({
        ...prevState,
        fname: { error: '', hasError: false, valid: true },
      }));
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(value)) {
      setUserIsValid((prevState) => ({
        ...prevState,
        email: { error: 'Invalid email address', hasError: true, valid: false },
      }));
    } else {
      setUserIsValid((prevState) => ({
        ...prevState,
        email: { error: '', hasError: false, valid: true },
      }));
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 8 || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
      setUserIsValid((prevState) => ({
        ...prevState,
        password: {
          error:
            'Password must have a minimum length of 8 characters, an uppercase letter, and a number',
          hasError: true,
          valid: false,
        },
      }));
    } else {
      setUserIsValid((prevState) => ({
        ...prevState,
        password: { error: '', hasError: false, valid: true },
      }));
    }
  };

  const validateFields = () => {
    return Object.values(userIsValid).every((field) => !field?.hasError);
  };

  //handle input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUserProperties((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    clearTimeout(inputTimers[name]);
    inputTimers[name] = setTimeout(() => {
      validateField(name, value);
    }, 500);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);

    //validate fields
    if (validateFields()) {
      const { username, fname, email, password } = userProperties;

      const data = {
        username,
        fname,
        email,
        password,
      };

      //fetch
      const user = await registerUser(data);
      console.log(user);

      if (user) {
        dispatch(signupSuccess(user));
        console.log('here');
        router.push('/dashboard');

        // Display signup error message
      } else {
        setUserIsValid({
          username: {
            error: 'Invalid username/email or password',
            hasError: true,
            valid: false,
          },
          fname: {
            error: 'Invalid username/email or password',
            hasError: true,
            valid: false,
          },
          email: {
            error: 'Invalid username/email or password',
            hasError: true,
            valid: false,
          },
          password: {
            error: 'Invalid username/email or password',
            hasError: true,
            valid: false,
          },
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <section className='signup'>
      <div className='signup__web-image-container'>
        <Image
          src='/img/home-pattern.jpg'
          className='signup__web-image signup__pattern'
          priority
          width={400}
          height={700}
          alt=''
        />
        <Image
          src='/img/logo-no-background.svg'
          className='signup__web-image signup__logo'
          priority
          width={300}
          height={300}
          alt='company logo'
        />
      </div>
      <div className='signup__container'>
        <h1>Create an account</h1>
        <div className='signup__form-container'>
          <Box
            component='form'
            className='signup__form'
            onSubmit={handleSubmit}
          >
            <FormControl className='signup__name' fullWidth>
              <TextField
                id='fname-signup'
                name='fname'
                className={userIsValid.fname?.valid ? 'input--success' : ''}
                label='Full name'
                helperText={
                  userIsValid.fname?.hasError
                    ? userIsValid.fname.error
                    : 'Please tell us your name'
                }
                aria-describedby='enter your name'
                required
                error={userIsValid.fname?.hasError || false}
                value={userProperties.fname}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className='signup__user' fullWidth>
              <TextField
                id='username-signup'
                name='username'
                className={userIsValid.username?.valid ? 'input--success' : ''}
                label='Username'
                helperText={
                  userIsValid.username?.hasError
                    ? userIsValid.username.error
                    : 'Please enter your username'
                }
                aria-describedby='enter your username'
                required
                error={userIsValid.username?.hasError || false}
                value={userProperties.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className='signup__email' fullWidth>
              <TextField
                id='email-signup'
                name='email'
                className={userIsValid.email?.valid ? 'input--success' : ''}
                label='Email'
                helperText={
                  userIsValid.email?.hasError
                    ? userIsValid.email.error
                    : 'Please enter your email'
                }
                aria-describedby='enter your email'
                required
                error={userIsValid.email?.hasError || false}
                value={userProperties.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className='signup__password' fullWidth error>
              <TextField
                autoComplete='off'
                name='password'
                id='user-password'
                className={userIsValid.password?.valid ? 'input--success' : ''}
                label='Password'
                helperText={
                  userIsValid.password?.hasError
                    ? userIsValid.password.error
                    : 'Please enter your password'
                }
                error={!!userIsValid.password?.error}
                aria-describedby='enter your password'
                type={showPassword ? 'text' : 'password'}
                required
                value={userProperties.password}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleShowPassword} edge='end'>
                        {showPassword ? <BiHide /> : <BiShow />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <div className='signup__btn-container'>
              <Tooltip title='Submit' placement='bottom-end'>
                <button
                  type='submit'
                  aria-label='submit'
                  className='signup__btn'
                >
                  {isLoading ? (
                    <span className='signup__loading'></span>
                  ) : (
                    'Sign up'
                  )}
                </button>
              </Tooltip>
            </div>
          </Box>
          <div className='signup__register'>
            <Link href='/login' className='signup__link'>
              Already have an account?
            </Link>
          </div>
        </div>
        <Divider variant='fullWidth' flexItem />
        <div className='signup__alt-options'>
          <div className='signup__external-btn'>
            <button type='submit' className='signup__google'>
              <GrGoogle />
              Continue with Google
            </button>
          </div>
          <div className='signup__external-btn'>
            <button type='submit' className='signup__facebook'>
              <GrFacebook /> Continue with Facebook
            </button>
          </div>
          <div className='signup__external-btn'>
            <button type='submit' className='signup__apple'>
              <GrApple /> Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
