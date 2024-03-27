import API from './interceptor'

const AuthService = {
  login: params => {
    return API.post('user/login', params, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    })
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
  register: params => {
    return API.post('user/signup', params)
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
  logout: params => {
    return API.delete('user/logout')
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
}

export default AuthService
