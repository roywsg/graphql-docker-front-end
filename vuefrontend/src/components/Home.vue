<template>
  <div id="home">
    <section>
      <div class="container">
        <h2>Skills</h2>
          <transition-group name="skills" class="skills" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
            <Skill v-for="s in skills" :key="s.id" :skill="s"  />
          </transition-group>
      </div>
    </section>

    <section>
      <div class="container">
        <h2>Add skill</h2>
        <form @submit.prevent="addSkill">
          <div class="form-group">
            <label for="">Name</label>
            <input type="text" ref="name" v-model="form.name" class="form-control">
          </div>
          <div class="form-group">
            <label for="">Level</label>
            <input type="range" v-model="form.level" class="form-control" min="0" max="10">
          </div>
          <div class="form-group">
            <label for="">Type</label>
            <input type="text" v-model="form.type" class="form-control">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

import Skill from './Skill'
import config from '../app.config'

export default {
  name: 'Home',
  data() {
    return {
      form: {
        name: '',
        level: '10',
        type: '',
      },
    }
  },
  components: {
    Skill,
  },
  computed: {
    ...mapGetters({skills: 'getSkills'}),
  },
  methods: {
    addSkill() {
      const id = parseInt(this.$store.state.skills.slice(-1)[0].id) + 1
      const skill = {
        id,
        name: this.form.name,
        level: this.form.level,
        type: this.form.type,
      }
      this.$store.dispatch('onAdd', skill)

      // empty field values
      Object.keys(this.form).forEach(k => {
        this.form[k] = ''
        if (k === 'level') this.form[k] = '10'
      })

      // set name field focus
      this.$refs.name.focus()
    },
  },
  mounted() {
    this.$store.dispatch('getSkills')
  },
}
</script>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1em;
}

.animated-enter-active,
.animated-leave-active {
  animation-duration: 5s;
  animation-fill-mode: both;
}
</style>

