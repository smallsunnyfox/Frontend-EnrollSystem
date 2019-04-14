import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '/api/',
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000, // request timeout
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded' //解决post请求后台获取参数问题
  }
})

export default service
