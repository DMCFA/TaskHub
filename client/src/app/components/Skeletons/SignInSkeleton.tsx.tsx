import { FormControl, Box, Divider, Skeleton } from '@mui/material';

export default function SignInSkeleton() {
  return (
    <section className='login login-skeleton'>
      <div className='login__web-image-container login-skeleton__container'>
        <Skeleton variant='rectangular' width={400} height={700} />
      </div>
      <div className='login__container login-skeleton__form-container'>
        <Skeleton variant='text' height={60} />
        <div className='login__form-container'>
          <Box component='form' className='login__form login-skeleton__form'>
            <FormControl className='login__user' fullWidth>
              <Skeleton variant='text' width={250} height={30} />
            </FormControl>
            <FormControl className='login__password' fullWidth>
              <Skeleton variant='text' width={250} height={30} />
            </FormControl>
            <div className='login__btn-container'>
              <Skeleton variant='rectangular' width={250} height={50} />
            </div>
          </Box>
          <div className='login__register'>
            <Skeleton variant='text' width={250} height={20} />
          </div>
        </div>
        <Divider variant='fullWidth' flexItem />
        <div className='login__alt-options login-skeleton__options'>
          <div className='login__external-btn'>
            <Skeleton variant='rectangular' width={200} height={40} />
          </div>
          <div className='login__external-btn'>
            <Skeleton variant='rectangular' width={200} height={40} />
          </div>
          <div className='login__external-btn'>
            <Skeleton variant='rectangular' width={200} height={40} />
          </div>
        </div>
      </div>
    </section>
  );
}
