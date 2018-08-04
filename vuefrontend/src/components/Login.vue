<template>
  <div class="login">
    <div class="container">
      <h1>Login</h1>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="email">Email: </label>
            <input type="text" id="email"  class="form-control" v-model="form.email">
          </div>

          <div class="form-group">
            <label for="password">Password: </label>
            <input type="password" id="password" class="form-control" v-model="form.password">
          </div>

          <div class="form-group">
            <input type="submit" value="Submit" class="btn btn-primary" >
          </div>

          <div class="alert alert-danger" v-if="authErr">
            Incorrect login
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
      this.$store.dispatch('auth', this.form).then(res => {
        console.log(res)
        res ? this.$router.push('/home') : (this.authErr = true)
      })
    },
  },
}
</script>

<style scoped>
</style>
