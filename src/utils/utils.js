import jwtDecode from 'jwt-decode'
import axios from 'axios'

// Token functions remain the same
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
  localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp)
  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('refreshToken', data.refresh_token)
}

export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const shouldRefreshToken = () => {
  const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp')
  const currentTime = Math.floor(Date.now() / 1000)
  return refreshTokenTimestamp && currentTime < refreshTokenTimestamp
}

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      const refreshResponse = await axios.post('/dj-rest-auth/token/refresh/', {
        refresh_token: refreshToken,
      })
      localStorage.setItem('accessToken', refreshResponse.data.access_token)
      setTokenTimestamp(refreshResponse.data)
      return refreshResponse.data.access_token
    } else {
      throw new Error('No refresh token available')
    }
  } catch (error) {
    removeTokenTimestamp()
    window.location.href = '/signin' // Redirect only once if refresh fails
  }
}

export const setupAxiosInterceptors = (axiosReq, history) => {
  // Request interceptor to check token expiration and refresh if necessary
  axiosReq.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('accessToken')

      if (shouldRefreshToken()) {
        config.headers['Authorization'] = `Bearer ${await refreshToken()}`
      } else if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Response interceptor to handle 401 errors
  axiosReq.interceptors.response.use(
    (response) => response,
    async (err) => {
      if (err.response?.status === 401) {
        try {
          await refreshToken()
          return axios(err.config)
        } catch (refreshError) {
          if (err.config.url !== '/signin') {
            history.push('/signin') // Only redirect to /signin once
          }
        }
      }
      return Promise.reject(err)
    },
  )
}
