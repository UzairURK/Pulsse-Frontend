import API from './interceptor'

const UserService = {
  listUsers: () => {
    return API.get('user/')
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
  getUser: params => {
    return API.get({
      email: params.email,
      password: params.password,
    })
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
  verifyUser: params => {
    return API.patch(`user/verify?id=${params.id}`, {
      headers: {
        'Content-Type' : 'text/plain'
      }
    })
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
}

export default UserService
