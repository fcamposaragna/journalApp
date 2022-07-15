import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink} from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWhitEmailPassword } from '../../store/auth/thunks';


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value)=> value.includes('@'), 'El correo debe tener un @'],
  password: [(value)=> value.length >= 6, 'El password debe tener más de 6 dígitos'],
  displayName: [(value)=> value.length >= 3, 'Inserte su nombre'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmited, setformSubmited] = useState(false);

  const { status, errorMessage } = useSelector(state=> state.auth);
  const isCheckginAuthentication = useMemo( ()=> status==='checking', [ status ]);

  const { 
    email, password, onInputChange, displayName, formState,
    emailValid, passwordValid, displayNameValid, isFormValid
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmited(true);

    if( !isFormValid ) return;
    dispatch( startCreatingUserWhitEmailPassword(formState));
  }

  return (
    <AuthLayout title='Create a count'>

      <form onSubmit={ onSubmit }       className="animate__animated animate__fadeIn animate__faster" >

        <Grid container>
          <Grid item xs={ 12 } sx={{mt:2}}>
            <TextField 
              label='name' 
              type='text' 
              placeholder='name' 
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmited}
              helperText={ displayNameValid }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{mt:2}}>
            <TextField 
              label='mail' 
              type='email' 
              placeholder='mail' 
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmited}
              helperText={ emailValid }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{mt:2}}>
            <TextField 
              label='password' 
              type='password' 
              placeholder='password' 
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange}
              error={ !!passwordValid && formSubmited}
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>

            <Grid 
              item
              xs={ 12 }
              sm={ 6 } 
              display={ !!errorMessage ? '': 'none'}
              >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={ 12 }>
                <Button 
                  disabled={ isCheckginAuthentication }
                  type="submit"
                  variant='contained' 
                  fullWidth>
                  Crear cuenta
                </Button>
              
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>

            <Typography sx={{mr:1}}>Do you already have an account?</Typography>
            <Link component={ RouterLink } color='inherit' to='/auth/login'> 
              Login
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
