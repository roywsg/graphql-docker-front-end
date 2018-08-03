const axios = require('axios')
const fs = require('fs')
const {buildSchema} = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {secret} = require('./config')

const skills = require('./skills.json')

const jsonserver = 'http://localhost:3001/skills'

const schema = buildSchema(`
  type Query {
    skills: Skills
    skill(id: String!): Skill
    auth(email: String!, password: String!): Token
  }

  type Mutation {
    addSkill(id:String!, name:String!, level:Float!, type:String!): Skill
    editSkill(id: String!, name:String, level:Float, type:String): Skill
    deleteSkill(id: String!): Skill
  }

  type Skill {
    status: String!
    message: String
    id: String
    name: String
    level: Float
    type: String
  }

  type Skills {
    status: String!
    message: String
    skills: [Skill]
  }

  type Token {
    status: String!
    message: String
    token: String!
  }
`)

const root = {
  skills: () => {
    return {status: 'ok', skills: skills.skills}
  },
  skill: ({id}) => {
    const rs = skills.skills.find(v => v.id === id)
    return {
      status: 'ok',
      ...rs,
    }
  },
  auth: ({email, password}) => {
    if (email === 'demo' && bcrypt.compareSync(password, skills.auth.password)) {
      return {
        status: 'ok',
        token: jwt.sign({user: '1'}, secret),
      }
    } else {
      return {
        status: 'error',
        token: '',
      }
    }
  },
  addSkill: ({id, name, level, type}) => {
    const skill = {
      id,
      name,
      level,
      type,
    }

    return axios
      .post(jsonserver, skill)
      .then(res => {
        return {
          status: 'ok',
          ...res.data,
        }
      })
      .catch(err => {
        let message = err.response ? err.response.status : err.message
        console.log(err)
        return {
          status: 'error',
          message,
        }
      })
  },
  editSkill: ({id, name, level, type}) => {
    const skill = skills.skills.find(v => v.id === id)
    if (!skill) {
      return {
        status: 'error',
        message: 'Not found',
      }
    }

    if (name) skill.name = name
    if (level) skill.level = level
    if (type) skill.type = type

    return axios
      .patch(jsonserver + '/' + id, skill)
      .then(res => {
        return {
          status: 'ok',
          ...res.data,
        }
      })
      .catch(err => {
        let message = err.response ? err.response.status : err.message
        console.log(message)
        return {
          status: 'error',
          message,
        }
      })
  },
  deleteSkill: ({id}) => {
    const skill = skills.skills.find(v => v.id === id)
    if (!skill) {
      return {
        status: 'error',
        message: 'Not found',
      }
    }

    return axios
      .delete(jsonserver + '/' + id, skill)
      .then(res => {
        return {
          status: 'ok',
          ...skill,
        }
      })
      .catch(err => {
        let message = err.response ? err.response.status : err.message
        return {
          status: 'error',
          message,
        }
      })
  },
}

module.exports = {schema, root}
