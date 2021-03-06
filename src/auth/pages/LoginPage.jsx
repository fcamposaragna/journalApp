import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink} from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { chekingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state=> state.auth);

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(()=> status === 'checking', [status])

  const dispatch = useDispatch();

  const onSubmit = (event)=>{
    event.preventDefault();
    //dispatch(chekingAuthentication());
    dispatch(startLoginWithEmailPassword({email, password}));
  };

  const onGoogleSignIn = ()=>{
    console.log('On google signin');
    dispatch( startGoogleSignIn());
  }


  return (
    <AuthLayout title='Login'>

      <form 
        aria-label='submit-form'
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >

        <Grid container>
          <Grid item xs={ 12 } sx={{mt:2}}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder='correo@google.com' 
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{mt:2}}>
            <TextField 
              label='Password' 
              type='password' 
              placeholder='contraseña' 
              name='password'
              inputProps={{
                'data-testid': 'password'
              }}
              value={ password }
              onChange={onInputChange}
              fullWidth
            />
          </Grid>

          <Grid container
            display={ !!errorMessage ? '': 'none'}
            sx={{ mt: 2}}
          >
            <Grid 
              item
              xs={ 12 }
              sm={ 6 }>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled= { isAuthenticating }
                variant='contained'
                fullWidth type='submit'
                >
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                disabled= { isAuthenticating }
                variant='contained'
                fullWidth
                aria-label='google-btn'
                onClick={onGoogleSignIn}
                >
                <Google />
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to='/auth/register'> 
            Create a count
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
