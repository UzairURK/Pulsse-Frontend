import API from './interceptor'

const CustomerService = {
  listCustomers: () => {
    return API.get('customer/')
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
  addCustomer: params => {
    return API.post('customer/add', params)
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
  getCustomer: params => {
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
}

export default CustomerService
