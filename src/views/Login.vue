<template>
  <div class="login">
    <div class="login_input_wrapper">
      <input class="login_input" placeholder="用户名" v-model="name"/>
      <input class="login_input" type="password" placeholder="密码" v-model="password"/>
    </div>
    <div class="login_button_wrapper">
      <div class="login_button" @click="onLoginClick">登录</div>
    </div>
  </div>
</template>

<script>
import request from '@/service'

export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    onLoginClick () {
      if (this.name === '' || this.password === '') return

      request(`
      {
        userLogin(name: "${this.name}") { id, name }
      }
      `).then(res => {
        const data = res.data.data.userLogin

        if (data) {
          localStorage.setItem('user', JSON.stringify(data))
          this.$router.push({ name: 'Home' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#333843, #101217);
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login_input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  display: block;
  outline: none;
  margin-bottom: 30px;
  padding: 6px 12px;
  color: #fff;
  width: 260px;
  background: rgba($color: #fff, $alpha: 0.2);
  font-size: 18px;

  &::placeholder {
    color: #ffffff66;
  }

  &_wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

.login_button {
  padding: 12px;
  color: #333;
  background: #fff;
  border-radius: 12px;
  font-size: 18px;
  width: 240px;
  text-align: center;

  &:active {
    opacity: 0.8;
  }

  &_wrapper {
    display: flex;
    justify-content: center;
  }
}

</style>
