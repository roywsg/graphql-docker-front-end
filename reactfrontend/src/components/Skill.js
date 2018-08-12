import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../store/actions'
import * as styles from './Skill.module.scss'

class Skill extends Component {
  constructor(props) {
    super(props)

    this.state = {
      edit: false,
      form: {
        id: this.props.id,
        name: this.props.name,
        level: this.props.level,
        type: this.props.type,
      },
      skillPercent: {
        background: `linear-gradient(90deg, #ff8609 0%, #f6ff00 ${this.props.level * 10}%, #FFFFFF 0%)`,
      },
    }

    this.onClose = this.onClose.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
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

  componentWillReceiveProps(nextProps) {
    if (this.props.level !== nextProps.level) {
      this.setState({
        skillPercent: {
          background: `linear-gradient(90deg, #ff8609 0%, #f6ff00 ${nextProps.level * 10}%, #FFFFFF 0%)`,
        },
      })
    }
  }

  onClose(e) {
    e.preventDefault()
    this.setState({edit: false})
  }

  onDelete() {
    this.props.deleteSkill(this.props.skills, this.props.id)
  }

  onEdit() {
    this.setState({edit: true})
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.editSkill(this.props.skills, this.state.form)
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  render() {
    const {name, type} = this.props
    return (
      <div className={styles.skillBox}>
        <i
          className={['fas fa-times-circle d-none', styles.faTimesCircle, styles.dNone].join(' ')}
          onClick={this.onDelete}
        />
        <h6>{type}</h6>
        <i className={['far fa-edit d-none', styles.faEdit, styles.dNone].join(' ')} onClick={this.toggleEdit} />
        <h2>{name}</h2>
        <div className={styles.skillLevel} style={this.state.skillPercent} />

        {this.state.edit && (
          <div className={styles.editBox}>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.form.name}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Level</label>
                <input
                  type="range"
                  name="level"
                  onChange={this.onChange}
                  value={this.state.form.level}
                  className="form-control"
                  min="0"
                  max="10"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Type</label>
                <input
                  type="text"
                  name="type"
                  onChange={this.onChange}
                  value={this.state.form.type}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button type="submit" className={['btn btn-primary', styles.editBtn].join(' ')}>
                  Edit
                </button>
                <a href="#close" onClick={this.onClose}>
                  Close
                </a>
              </div>
            </form>
          </div>
        )}
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
    editSkill: (skills, skill) =>
      dispatch(actions.editSkill(skill)).then(res => {
        if (res.data.data.editSkill.id) {
          newSkills = skills.map(s => {
            if (s.id === skill.id) {
              s = skill
            }
            return s
          })
          dispatch(actions.setSkills(newSkills))
        }
      }),
    deleteSkill: (skills, id) =>
      dispatch(actions.deleteSkill(id)).then(res => {
        if (res.data.data.deleteSkill.id) {
          newSkills = skills.filter(s => s.id !== id)
          dispatch(actions.setSkills(newSkills))
        }
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Skill)
