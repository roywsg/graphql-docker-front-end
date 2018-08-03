<template>
  <div class="skill-box">
    <i class="fas fa-times-circle d-none" @click="onDelete"></i>
    <h6>{{ skill.type }}</h6><i class="far fa-edit d-none" @click="toggleEdit"></i>
    <h2>{{ skill.name }}</h2>
    <div class="skill-level" :style="skillPercent"></div>
    <div class="edit-box" v-if="edit">
      <form @submit.prevent="onEdit">
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
          <button type="submit" class="btn btn-primary edit-btn">Edit</button>
          <a href="#" @click="onClose">Close</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import config from '../app.config'

export default {
  data() {
    return {
      edit: false,
      form: {
        name: this.skill.name,
        level: this.skill.level,
        type: this.skill.type,
      },
    }
  },
  props: ['skill'],
  computed: {
    skillPercent() {
      return `background:linear-gradient(90deg, #ff8609 0%, #f6ff00 ${this.skill.level * 10}%, #FFFFFF 0%)`
    },
  },
  methods: {
    onClose() {
      this.edit = false
    },
    onDelete() {
      this.$store.dispatch('onDelete', this.skill.id)
    },
    onEdit() {
      this.$store.dispatch('onEdit', {...this.skill, ...this.form})
      this.edit = false
    },
    toggleEdit() {
      this.edit = !this.edit
    },
  },
}
</script>

<style scoped>
.skill-box {
  position: relative;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 20px #ccc;
  padding: 1em;
}
.skill-level {
  width: calc(100% - 2em);
  border: 1px solid orange;
  background-color: pink;
  height: 1em;
  border-radius: 10px;
}
.edit-box {
  position: absolute;
  background: white;
  width: 14em;
  top: -10em;
  z-index: 1;
  right: -5em;
  padding: 1em;
  border-radius: 1.2em;
  box-shadow: 0 2px 20px #ccc;
}
.edit-btn {
  margin-right: 0.5em;
}
.fa-times-circle {
  position: absolute;
  right: 1em;
  color: rgb(244, 66, 66);
  cursor: pointer;
}
.fa-edit {
  cursor: pointer;
}
h6 {
  display: inline-block;
  margin-right: 0.5em;
}
.skill-box:hover .d-none {
  display: inline-block !important;
}
</style>

