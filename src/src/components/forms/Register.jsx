import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project imports
import { strengthColor, strengthIndicator } from '../../utils/password-strength'

// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AuthService from '../../api_services/auth.service'

// ===========================|| FIREBASE - REGISTER ||=========================== //

const Register = ({ ...others }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(true)

  const [strength, setStrength] = useState(0)
  const [level, setLevel] = useState()

  const googleHandler = async () => {
    console.error('Register')
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const changePassword = value => {
    const temp = strengthIndicator(value)
    setStrength(temp)
    setLevel(strengthColor(temp))
  }

  useEffect(() => {
    changePassword('123456')
  }, [])

  return (
    <>

      <Formik
        initialValues={{
          fullname: '',
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
            const signupFormData = new FormData()
            signupFormData.append('fullname', values.fullname)
            signupFormData.append('email', values.email)
            signupFormData.append('password', values.password)
            console.log(values.fullname + " " + " " +values.email + " " +values.password)
            AuthService.register(signupFormData)
              .then(res => {
                console.log(res)

                if (res.msg === 'Successfully Signed Up') navigate('/')
              })
              .catch(err => console.log(err))
            // if (scriptedRef.current) {
            setStatus({ success: true })
            setSubmitting(false)
            // }
          } catch (err) {
            console.error(err)
            // if (scriptedRef.current) {
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
            // }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            {...others}
          >
            <Grid
              container
              spacing={matchDownSM ? 0 : 2}
            >
              <Grid
                item
                xs={12}
                sm={12}
              >
                <input
              fullWidth
                  label='Full Name'
                  margin='normal'
                  name='fullname'
                  type='text'
                  value={values.fullname}
                  onChange={handleChange}
                  defaultValue=''
                  placeholder='First Name Last Name'
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
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
      
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
               Email Adress
              </Typography>
              <input
              id='outlined-adornment-email-register'
              type='email'
              value={values.email}
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
              placeholder='example@gmail.com'
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
                  id='standard-weight-helper-text--register'
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
              id='outlined-adornment-password-register'
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name='password'
              label='Password'
              onBlur={handleBlur}
              onChange={e => {
                handleChange(e)
                changePassword(e.target.value)
              }}
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
              
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-password-register'
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            { (values.password.length > 0) && strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid
                    container
                    spacing={2}
                    alignItems='center'
                  >
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant='subtitle1'
                        fontSize='0.75rem'
                      >
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

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
                Sign up
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Register
