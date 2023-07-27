import { FormControl, Box, Divider, Skeleton } from '@mui/material';

export default function LoginSkeleton() {
  return (
    <section className='login'>
      <div className='login__web-image-container'>
        <Skeleton variant='rectangular' width={400} height={700} />
        <Skeleton variant='circular' width={300} height={300} />
      </div>
      <div className='login__container'>
        <Skeleton variant='text' />
        <div className='login__form-container'>
          <Box component='form' className='login__form'>
            <FormControl className='login__user' fullWidth>
              <Skeleton variant='text' />
            </FormControl>
            <FormControl className='login__password' fullWidth>
              <Skeleton variant='text' />
            </FormControl>
            <div className='login__btn-container'>
              <Skeleton variant='rectangular' width={100} height={40} />
            </div>
          </Box>
          <div className='login__register'>
            <Skeleton variant='text' />
          </div>
        </div>
        <Divider variant='fullWidth' flexItem />
        <div className='login__alt-options'>
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
