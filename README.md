## 项目介绍

* 采用vue-cli构建初始项目
* 前端采用Vue、Element-ui、axios搭建页面以及数据处理，后端采用koa2以及Mysql完成相关请求接口
* 采用前后端分离，此为前端项目，后端项目地址移步[koa2-server](https://github.com/Selvin11/koa2-server)
* 初步了解一下koa2与Express构建服务的不同


## 项目内容

- [x] 完成token机制的注册登录

- [x] 完成Github的第三方登录


## 项目启动

```bash
yarn / npm install 使用yarn或者npm安装依赖

npm run dev 启动项目
```

同时，需要将后端项目clone至本地并启动该服务，详情请移步[koa2-server](https://github.com/Selvin11/koa2-server)



## 项目起源

* 此项目相当于[login项目](https://github.com/Selvin11/login)的补充，对第三方登录进行填坑

* 将原login项目中的后端框架Express以及mongoDB，更新为Koa2框架以及Mysql

* 原login项目中，前后端夹杂在一个项目中，后端服务重启与前端服务热更新及重启需要借助于其它方案配置，才能达到一定的自动化体验（相关内容可以移步[login项目](https://github.com/Selvin11/login)），而此项目采用前后端分离，后端依靠nodemon等实现服务监听及自重启，虽然分成两个项目，但是更加方便管理和理解

* 此项目部分目录结构有变化，如axios的进一步封装，将接口至于rest目录中同一管理，均是日常工作中的一些习惯吧

## 项目相关

* token机制的注册登录，可以看原[login项目](https://github.com/Selvin11/login)

* Github第三方登录
  
  * 主要步骤，具体可以查看koa2-server项目中的相关代码

    1. 本地应用，点击跳转至第三方验证链接，输入账户密码（https://github.com/login/oauth/authorize?client_id=xxxxx&state=xxx）
    2. 第三方通过验证后，返回code，通过code发起验证请求，拿到access_token（https://github.com/login/oauth/access_token?client_id=xxxx&client_secret=xxx&code=xxx）
    3. 本地应用拿到access_token后，向第三方相关用户信息的接口发起请求，拿到用户信息（https://api.github.com/user?access_token=xxx）

  * 相关Github配置及参考资料

    1. [使用OAuth2.0协议的github、QQ、weibo第三方登录接入总结](http://www.cnblogs.com/gabrielchen/p/5800225.html)


