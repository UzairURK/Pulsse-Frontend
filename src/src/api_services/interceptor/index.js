import axios from 'axios'
import toast from 'react-hot-toast'
import { Alert, Snackbar } from '@mui/material'
import { API_IP } from '../../config'

const API = axios.create({
  baseURL: API_IP,
  headers: {
    'Content-Type': 'text/plain',
    // Accept: 'application/json',
    // 'X-Frame-Options': 'SAMEORIGIN',
    // 'Referrer-Policy': 'no-referrer',
    // 'X-Content-Type-Options': 'nosniff',
    // 'Permissions-Policy': 'geolocation=()',
    // 'Content-Security-Policy': "'self' *.amazonaws.com",
    Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`,
    // 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  },
})

API.interceptors.response.use(
  res => {
    return res
  },
  async err => {
    if (err && err.response && err.response.status) {
      if (err.response.status === 401) {
        // return await Auth.currentSession()
        //   .then(res => {
        //     let jwt = 'asd'
        //     API.defaults.headers['Authorization'] = `Bearer ${jwt}`
        //     sessionStorage.setItem('token', jwt)
        //     err.config.headers.Authorization = `Bearer ${jwt}`
        //     return axios.request(err.config)
        //   })
        //   .catch(err => {
        //     console.log('Error in getting current session :', err.message)
        //     if (err.message === 'Refresh Token has expired') {
        //       const signOutChannel = new BroadcastChannel('signout_channel')
        //       sessionStorage.clear()
        //       signOutChannel.postMessage('loggedOut')
        //     }
        //   })
      } else {
        toast.error(err.response.data.message)
        return err
      }
    }
    return err
  }
)

export default API
