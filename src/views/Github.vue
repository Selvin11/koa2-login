<template>
<div style="text-align:left;">
  <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">Github</el-menu-item>
    <el-menu-item index="2" :style="{float: 'right'}">
      <el-dropdown @command="loginOut">
        <span :style="{color:'#FFF'}" v-show="user.name">
        {{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command>登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
  <el-row style="margin-top:20px;">
    <el-col :span="4" :offset="4">
      <a :href="user.html_url">
        <img :src="user.avatar_url" class="image">
      </a>
      <div style="padding: 14px;">
        <h3 style="font-size: 26px;">{{user.name}}</h3>
        <p>{{user.login}}</p>
      </div>
    </el-col>
    <el-col :span="10">
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">
            Repositories<el-badge class="mark" :value="user.public_repos" />
          </span>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">
            Followers<el-badge class="mark" :value="user.followers" />
          </span>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">
            Following<el-badge class="mark" :value="user.following" />
          </span>
        </el-tab-pane>
      </el-tabs>
    </el-col>  
  </el-row>
</div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        user: {},
        activeName: 'first'
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        let params = {
          token: this.$route.query.access_token
        }
        this.$rest.auth.getGithubUser(params).then(res => {
          if (res.success) {
            this.user = res.data
            console.log(res)
          }
        })
      },
      loginOut () {
        this.$router.push('/login')
      }
    }
  }

</script>

<style scoped>
.image {
  height: 230px; 
}
</style>

