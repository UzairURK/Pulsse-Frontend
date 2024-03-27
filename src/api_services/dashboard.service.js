import API from './interceptor'

const DashboardService = {
  getData: (params) => {
    return API.get(`/dashboard/dashboard_data/${params.key}`)
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        return err
      })
  },
}

export default DashboardService
