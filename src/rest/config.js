import { Message } from 'element-ui'
import ajax from '../common/ajax'

// 设置错误提示信息
ajax.setTipFn((tips) => {
  Message.error(tips)
})

export default {
  user: {
    register: ajax.create('/api/token/register'),
    login: ajax.create('/api/token/login'),
    token: ajax.query('/api/token')
  }
}

