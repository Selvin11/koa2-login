/**
 * ajax request help
 */
import axios from 'axios'
import router from '@/router'

class Ajax {

  constructor (options) {
    this.$http = axios
    this.baseUrl = options && options.baseUrl ? options.baseUrl : ''
    this.authUrl = options && options.authUrl ? options.authUrl : ''
    this.isLogin = false
    this.queryMap = {}
    this.createMap = {}
    this.putWayMap = {}
    this.patchMap = {}
    this.deleteMap = {}
    // 正在登陆
    this.logining = false
    this.next = ''
    // 输出提示
    this.showTips = (tips) => {
      if (window.console) {
        console.log(tips)
      }
    }
    // 通用拦截器
    if (options && typeof options.success === 'function') {
      this.success = options.success
    } else {
      this.success = res => {}
    }

    // request 请求拦截器
    // 给POST请求头加上token
    axios.interceptors.request.use(
      config => {
        // 判断localStorage是否存在token，如果存在的话，则每个http header都加上token
        if (localStorage.getItem('token')) {
          config.headers.Authorization = `token ${localStorage.getItem('token')}`
              .replace(/(^")|("$)/g, '')
        } else {
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )

    // ajax 全局错误处理
    axios.interceptors.response.use(
      response => {
        this.success(response)
        return response
      },
      err => {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              this.showTips('请求发生404错误')
              break
            case 500:
              this.showTips('请求发生500错误')
              break
            case 504:
              this.showTips('请求超时')
              break
            case 400: // 用户没有csrf-token
            case 401: // 用户没有登录态
              if (!this.logining) { // 只使第一次401的hash
                this.logining = true
                if (window.location.hash) {
                  this.next = encodeURIComponent(window.location.hash)
                }
              }
              window.location.href = '#/login?next=' + this.next
              break
            default:
              this.showTips('error:' + err.response.status)
              break
          }
          return Promise.reject(err.response.data)   // 返回接口返回的错误信息
        }
      }
    )
  }

  // 设置用展示提示信息的函数
  setTipFn (fn) {
    this.showTips = fn
  }
  // 设置自定义的回调
  setSuccess (success) {
    this.success = success
  }

  parse (path, id) {
    if (typeof id === 'string') {
      return path + '/' + id
    }
    if (typeof id === 'object') {
      let search = '?'
      let counter = 0
      for (let key in id) {
        if (counter) search += '&'
        search += key + '=' + id[key]
        counter++
      }
      return path + search
    }
    return path
  }

  query (path, config1 = {cache: false}) {
    if (!this.queryMap[path]) { // cache path closure
      let url = ''
      this.queryMap[path] = (id, expand, config2 = {}) => {
        // 合并config
        let config = Object.assign({}, config1, config2)
        // 关闭缓存
        if (!config.cache) {
          let headers = config.headers = config.headers || {}
          headers['Cache-Control'] = 'no-cahce'
          headers['If-Modified-Since'] = '0'
        }
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        let newPath = url
        if (id) {
          newPath = this.parse(url, id)
        }
        let baseUrl = config.baseUrl || this.baseUrl
        return this.$http.get(baseUrl + newPath, config).then((res) => {
          return res.data
        }, (res) => {
          return res
        })
      }
    }
    return this.queryMap[path]
  }

  // 增
  create (path, config1 = {cache: false}) {
    if (!this.createMap[path]) { // cache path closure
      let url = ''
      this.createMap[path] = (data, expand, config2 = {}) => {
        // 合并config
        let config = Object.assign({}, config1, config2)
        // 关闭缓存
        if (!config.cache) {
          let headers = config.headers = config.headers || {}
          headers['Cache-Control'] = 'no-cahce'
          headers['If-Modified-Since'] = '0'
        }
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        let baseUrl = config.baseUrl || this.baseUrl
        return this.$http.post(baseUrl + url, data, config).then((res) => {
          return res.data
        }, (res) => {
          return res
        })
      }
    }
    return this.createMap[path]
  }

  // put 方法~
  putWay (path, config1 = {cache: false}) {
    if (!this.putWayMap[path]) { // cache path closure
      let url = ''
      this.putWayMap[path] = (data, expand, config2 = {}) => {
        // 合并config
        let config = Object.assign({}, config1, config2)
        // 关闭缓存
        if (!config.cache) {
          let headers = config.headers = config.headers || {}
          headers['Cache-Control'] = 'no-cahce'
          headers['If-Modified-Since'] = '0'
        }
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        let baseUrl = config.baseUrl || this.baseUrl
        return this.$http.put(baseUrl + url, data, config).then((res) => {
          return res.data
        }, (res) => {
          return res
        })
      }
    }
    return this.putWayMap[path]
  }

  // patch 方法~
  patch (path, config1 = {cache: false}) {
    if (!this.patchMap[path]) { // cache path closure
      let url = ''
      this.patchMap[path] = (data, expand, config2 = {}) => {
        // 合并config
        let config = Object.assign({}, config1, config2)
        // 关闭缓存
        if (!config.cache) {
          let headers = config.headers = config.headers || {}
          headers['Cache-Control'] = 'no-cahce'
          headers['If-Modified-Since'] = '0'
        }
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        let baseUrl = config.baseUrl || this.baseUrl
        return this.$http.patch(baseUrl + url, data, config).then((res) => {
          return res.data
        }, (res) => {
          return res
        })
      }
    }
    return this.patchMap[path]
  }

  // delete方法
  delete (path, config1 = {cache: false}) {
    if (!this.deleteMap[path]) {
      let url = ''
      this.deleteMap[path] = (data, expand, config2 = {}) => {
        // 合并config
        let config = Object.assign({}, config1, config2)
        // 关闭缓存
        if (!config.cache) {
          let headers = config.headers = config.headers || {}
          headers['Cache-Control'] = 'no-cahce'
          headers['If-Modified-Since'] = '0'
        }
        if (expand) {
          url = path + '/' + expand
        } else {
          url = path
        }
        let baseUrl = config.baseUrl || this.baseUrl
        return this.$http.delete(baseUrl + url, data, config).then((res) => {
          return res.data
        }, (res) => {
          return res
        })
      }
    }
    return this.deleteMap[path]
  }
}

export default new Ajax()
