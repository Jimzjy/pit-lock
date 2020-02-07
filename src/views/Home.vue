<template>
  <div class="home">
    <div class="top">
      <router-link :to="{ name: 'Login' }"><div class="logo"><span>P</span><span>i</span><span>t</span></div></router-link>
      <div class="user">
        <div class="user_hello">Hello,</div>
        <div class="user_name">{{ name }}</div>
      </div>
      <div class="lock_wrapper">
        <div :class="['lock', unlocked ? 'lock_unlocked' : '']">LOCK</div>
      </div>
    </div>
    <div class="unlock">
      <div :class="['unlock_button', unlocked ? 'unlock_button_unlocked': '']" @click="onUnLockClick">UNLOCK</div>
    </div>
  </div>
</template>

<script>
var mqtt = require('mqtt')

export default {
  name: 'Home',
  data () {
    return {
      name: '',
      id: '',
      unlocked: false,
      client: null
    }
  },
  methods: {
    onUnLockClick () {
      if (this.unlocked) return

      const d = JSON.stringify({
        id: '5e131c58126ec674b2ac5960',
        command: 'open',
        data: JSON.stringify({
          name: 'jimzjy',
          id: '5e3bc1c591a93e5e2fad4a75'
        })
      })
      this.client.publish('pitservice_ack', `{"id": "5e131c58126ec674b2ac5960", "data": ${d}}`)

      this.unlocked = true
      setTimeout(() => {
        this.unlocked = false
      }, 3000)
    }
  },
  created () {
    const user = localStorage.getItem('user')
    if (!user) {
      this.$router.push({ name: 'Login' })
    }
    const userObj = JSON.parse(user)
    this.name = userObj.name
    this.id = userObj.id

    this.client = mqtt.connect('ws://139.224.239.186:9001')
  },
  beforeDestroy () {
    if (this.client) {
      this.client.end()
    }
  }
}
</script>

<style lang="scss" scoped>

.home {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#333843, #101217);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  color: #ffffff99;

  span {
    margin-right: 4px;
  }
}

.user {
  padding-left: 20px;
  font-size: 18px;

  &_hello {
    margin-bottom: 10px;
  }

  &_name {
    font-weight: bold;
  }
}

.lock {
  display: inline-block;
  font-size: 80px;
  padding: 20px;
  text-transform: uppercase;
  color: transparent;
  font-weight: bold;
  margin-top: -60px;
  background: radial-gradient(
    circle farthest-side at center center,
    white,
    #111
  ) no-repeat;
  -webkit-background-clip: text;
  transition: opacity 1s;

  &_wrapper {
    text-align: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_unlocked {
    opacity: 0;
  }
}

.unlock {
  margin-bottom: 30px;
  text-align: center;

  &_button {
    background: #fff;
    display: inline-block;
    width: 240px;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 18px;

    &_unlocked {
      opacity: 0.5;
    }
  }
}
</style>
