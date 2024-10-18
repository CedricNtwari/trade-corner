import { useHistory } from 'react-router-dom'
import { setupAxiosInterceptors } from '../utils/utils'
import axios from 'axios'

axios.defaults.baseURL = 'https://ecommerce-backend-api-1-abe8f24df824.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create()
export const axiosRes = axios.create()

const useAxiosSetup = () => {
  const history = useHistory()

  setupAxiosInterceptors(axiosReq, history)
  setupAxiosInterceptors(axiosRes, history)
}

export default useAxiosSetup
