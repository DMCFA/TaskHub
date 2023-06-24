'use client';

import { FormControl, Divider, Tooltip, Box, TextField } from '@mui/material';
import { GrGoogle, GrFacebook, GrApple } from 'react-icons/gr';
import Link from 'next/link';

export default function Login() {
  return (
    <section className='login'>
      <div className='login__container'>
        <h1>Welcome back</h1>
        <div className='login__form-container'>
          <Box component='form' className='login__form' autoComplete='off'>
            <FormControl className='login__user' fullWidth>
              <TextField
                id='user-login'
                label='Username'
                helperText='Please enter your username or email'
                aria-describedby='enter your email or username'
              />
            </FormControl>
            <FormControl className='login__password' fullWidth>
              <TextField
                id='user-password'
                label='Password'
                helperText='Please enter your password'
                aria-describedby='enter your password'
              />
            </FormControl>
            <div className='login__btn-container'>
              <Tooltip title='Submit' placement='bottom-end'>
                <button
                  type='submit'
                  aria-label='submit'
                  className='login__btn'
                >
                  Log in
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
