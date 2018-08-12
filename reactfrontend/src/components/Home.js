import React, {Component} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'

import * as actions from '../store/actions'

import Skill from './Skill'
import * as homeStyles from './Home.module.scss'

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        name: '',
        level: 10,
        type: '',
      },
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getSkills()
  }

  onChange(e) {
    const target = e.target
    const name = target.name
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]: target.value,
      },
    }))
  }

  onSubmit(e) {
    e.preventDefault()
    const id = parseInt(this.props.skills.slice(-1)[0].id, 10) + 1
    const skill = {
      id,
      name: this.state.form.name,
      level: this.state.form.level,
      type: this.state.form.type,
    }
    this.setState({
      form: {name: '', level: 10, type: ''},
    })
    this.props.addSkill(this.props.skills, skill)
  }

  render() {
    let skills = null
    if (this.props.skills.length > 0) {
      skills = this.props.skills.map(s => (
        <CSSTransition
          key={s.id}
          timeout={1000}
          classNames={{
            appear: 'zoomIn',
            appearActive: 'animated',
            enter: 'zoomIn',
            enterActive: 'animated',
            exit: 'zoomOut',
            exitActive: 'animated',
          }}
        >
          <Skill {...s} />
        </CSSTransition>
      ))
    }

    return (
      <div id="Home">
        <section>
          <div className="container">
            <h2>Skills</h2>
            <TransitionGroup className={homeStyles.skills}>{skills}</TransitionGroup>
          </div>
        </section>

        <section>
          <div className="container">
            <h2>Add Skill</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input type="text" name="name" onChange={this.onChange} value={this.state.form.name} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="">Level</label>
                <input type="range" name="level" onChange={this.onChange} value={this.state.form.level} className="form-control" min="0" max="10" />
              </div>
              <div className="form-group">
                <label htmlFor="">Type</label>
                <input type="text" name="type" onChange={this.onChange} value={this.state.form.type} className="form-control" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  skills: state.skills.skills,
})

const mapDispatchToProps = dispatch => {
  let newSkills = []
  return {
    getSkills: () =>
      dispatch(actions.getSkills()).then(res => {
        const skills = res.data.data.skills

        if (skills.status === 'ok') {
          dispatch(actions.setSkills(res.data.data.skills.skills))
        }
      }),
    addSkill: (skills, skill) =>
      dispatch(actions.addSkill(skill)).then(res => {
        if (res.data.data.addSkill.id) {
          newSkills = [...skills, skill]
          dispatch(actions.setSkills(newSkills))
        }
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
