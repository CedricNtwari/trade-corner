import axios from 'axios'

axios.defaults.baseURL = 'https://ecommerce-backend-api-1-abe8f24df824.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true
