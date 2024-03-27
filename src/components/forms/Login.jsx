import { useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project imports

// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AuthService from '../../api_services/auth.service'
import { useNavigate } from 'react-router-dom'

// ============================|| FIREBASE - LOGIN ||============================ //
// const useStyles = makeStyles({
//   input: {
//     '&:hover': {
//       border: 'none', // Remove border on hover
//     },
//     '&:focus': {
//       border: 'none', // Remove border on focus
//     },
//     '&:active': {
//       border: 'none', // Remove border on activation
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//       border: 'none', // Remove default border
//     },
//   },
// });

const Login = ({ ...others }) => {
  const theme = useTheme()

  const navigate = useNavigate()

  const [checked, setChecked] = useState(true)

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }


  return (
    <>
      {/* <Grid
        container
        direction='column'
        justifyContent='center'
        spacing={2}
      >
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='center'
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle1'>Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid> */}

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            let loginFormData = new FormData()

            loginFormData.append('email', values.email)
            loginFormData.append('password', values.password)
            AuthService.login(loginFormData)
              .then(res => {
                sessionStorage.setItem('token', res.access_token)

                navigate(0)
              })
              .catch(err => console.log(err))
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            {...others}
          >
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              {/* <InputLabel htmlFor='outlined-adornment-email-login'>
                Email Address / Username
              </InputLabel> */}
              {/* <OutlinedInput
                type='email'
                name='email'
                inputProps={{}}
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                label='Email Address / Username'
                id='outlined-adornment-email-login'
                
              /> */}
              <input
              type='email'
              name='email'
              inputProps={{}}
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              // placeholder='Email Address / Username'
              placeholder='example@gmail.com'
              id='outlined-adornment-email-login'
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                border: '0px solid',
                boxSizing: 'border-box',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '29.05px',
                outline: 'none',
                color: '#7B7B7B',
              }}
              />
              <div
              style={{
                width: '100%',
                height: '1px',
                border: '1px solid #5E00FF',
                boxShadow: '0px 4px 4px 0px #5E00FF40',
              }}
            ></div>
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-email-login'
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              {/* <InputLabel htmlFor='outlined-adornment-password-login'>Password</InputLabel> */}
                  <Typography
                  color={theme.palette.secondary.main}
                  gutterBottom
                  variant={matchDownSM ? 'h3' : 'h2'}
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: '29.05px',
                    textAlign: 'left',
                    letterSpacing: '0em',
                    color: '#7B7B7B',

                  }}  
                >
               Password
              </Typography>
              <input
              id='outlined-adornment-password-login'
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              label='Password'
              inputProps={{}}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                border: '0px solid',
                boxSizing: 'border-box',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '29.05px',
                outline: 'none',
                color: '#7B7B7B',
              }}
              />
              <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
              size='large'
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              <div
              style={{
                width: '100%',
                height: '1px',
                border: '1px solid #5E00FF',
                boxShadow: '0px 4px 4px 0px #5E00FF40',
              }}
            ></div>
              {/* <OutlinedInput
                id='outlined-adornment-password-login'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                      size='large'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
                inputProps={{}}
              /> */}
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-password-login'
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
  <input 
    type="checkbox" 
    id="rememberMe" 
    name="rememberMe" 
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '5px',
      border: '1px solid #5E00FF',
      background: '#FFFFFF',
      marginRight: '5px', // Adjust spacing between checkbox and label
    }} 
  />
  <label 
    htmlFor="rememberMe" 
    style={{
      fontFamily: 'Inter',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '24px',
      letterSpacing: '0em',
      textAlign: 'right',
      color: '#7B7B7B',
      padding: '5px 10px', // Adjust padding as needed
      borderRadius: '5px',
      // color: '#FFFFFF',
    }}
  >
    Remember Me
  </label>
</div>

              {/* <div style={{ marginLeft: 'auto' }}>b</div> */}
              <div>
  <button
    style={{
      marginLeft: 'auto',
      fontFamily: 'Inter',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '24px',
      letterSpacing: '0em',
      textAlign: 'right',
      color: '#7B7B7B',
      background: 'none',
      border: 'none',
      outline: 'none', // Remove button outline
      cursor: 'pointer',
    }}
  >
    Forgot Password?
  </button>
</div>

          </div>

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                style={{
                  padding: '22px 144px', // Padding shorthand for top/bottom and left/right
                  borderRadius: '31px',
                  background: '#5E00FF',
                  fontFamily: 'Inter',
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '39px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                  color: '#FFFFFF',
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Login
