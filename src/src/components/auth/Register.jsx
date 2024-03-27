import { Link } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material'

// project imports
import AuthWrapper from './AuthWrapper'
import AuthCardWrapper from './AuthCardWrapper'
// import Logo from 'ui-component/Logo'
import AuthRegister from '../forms/Register'

// assets
import login from './assets/login.png'
import Logo from './assets/Logo.png'

const Register = () => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AuthWrapper style={{
      width: '1728px',
      height: '1022px',
      top: '-6194px',
      left: '-17108px',
      background: '#FFFFFF',
      display: 'flex', // Set display to flex
      flexDirection: 'row', // Set flex direction to row
    }}>
    <div
      style={{
        width: '1100px',
        height: '1022px',
        // left: '-104px',
        background: '#FFFFFF',
        position: 'relative', // Ensure positioning behaves as expected
      }}
    >
      <img
      src={login}
      alt="Login Image"
      style={{
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
        clipPath: 'polygon(0 0, calc(100% - 200px) 0, 100% 100%, 0 100%)',
      }}
      />
      </div>
      <div
      style={{
        width: '665px',
        height: '1022px',
      }}
      >
      <Grid
        container
        direction='column'
        justifyContent='flex-end'
        sx = {{width: '100%', left: '200px'}}
        >
          <Grid
          item
          xs={12}
          >
            <Stack
              alignItems='center'
              justifyContent='center'
              spacing={1}
            >
              <img
              src={Logo}
              alt="Logo"
              style={{
                width: '248px',
                height: '101px',
                left: '0',
                top: '69px',
              }}
            />
            </Stack>
            <Grid
          item
          xs={12}>
        <Stack
            alignItems='left'
            justifyContent='left'
            spacing={1}
            >
              <Typography
                color={theme.palette.secondary.main}
                gutterBottom
                variant={matchDownSM ? 'h3' : 'h2'}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '48px',
                  fontWeight: 600,
                  lineHeight: '58px',
                  textAlign: 'left',
                  letterSpacing: '0em',
                  color: '#5007CE',

                }}  
              >
                Create your account
              </Typography>
              <Typography
              style={{
                fontFamily: 'Inter',
                fontSize: '28px',
                fontWeight: 300,
                lineHeight: '33.89px',
                textAlign: 'left',
                letterSpacing: '0em',
                color: '#000000',

              }}
                variant='caption'
                fontSize='16px'
                textAlign={matchDownSM ? 'center' : 'inherit'}
              >
                Fill in the fields below 
              </Typography>
            </Stack>
          </Grid>
          </Grid>
          <Grid
            item
            xs={12}>
            <Stack
              alignItems='left'
              justifyContent='left'
              spacing={1}
              style={{
                marginTop: '50px',
              }}
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
            Full Name
          </Typography>
          <AuthRegister />
          {/* <LoginForm/> */}
          </Stack>
          </Grid>
          <Grid
              item
              xs={12}>
            <Stack
              alignItems='left'
              justifyContent='left'
              spacing={1}
              >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
              <Typography
                variant='subtitle1'
                sx={{
                  fontFamily: 'Inter',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  textAlign: 'center',
                  color: '#7B7B7B',
                }}
              >
                Already have an account?
              </Typography>
              <Typography
                component={Link}
                to='/'
                variant='subtitle1'
                sx={{
                  textDecoration: 'none',
                  fontFamily: 'Inter',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '0em',
                  textAlign: 'center',
                  color: '#5E00FF',
                }}
              >
                Login
              </Typography>
            </div>

            </Stack>
          </Grid>
      </Grid>
      </div>
  </AuthWrapper>
  )
}

export default Register
