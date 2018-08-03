<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email: </label>
        <input type="text" id="email" v-model="form.email">
      </div>

      <div class="form-group">
        <label for="password">Password: </label>
        <input type="password" id="password" v-model="form.password">
      </div>

      <div class="form-group">
        <input type="submit" value="Submit">
      </div>

      <div class="alert alert-danger" v-if="authErr">
        Incorrect login
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../app.config'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      authErr: false,
    }
  },
  methods: {
    submit() {
      this.authErr = false

      axios
        .post(config.apiendpoint, {
          query: `
          query auth{
            auth(email:"${this.form.email}", password:"${this.form.password}") {
              status
              token
            }
          }
        `,
        })
        .then(res => {
          const auth = res.data.data.auth
          if (auth.status === 'ok') {
            Cookies.set('token', auth.token, {expires: 1})
            this.$router.push('/home')
          } else {
            this.authErr = true
          }
        })
        .catch(err => console.log(err))
    },
  },
}
</script>

<style scoped>
</style>
