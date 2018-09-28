import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//moment
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends React.Component {

  //delete an experience
  onDeleteClick(id) {
    this.props.deleteExperience(id)
  }

  render () {

    //map experiences from props and create table rows -- todo: exp.to if current display 'current'
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="MM/DD/YYYY">{exp.from}</Moment> - {exp.to === null ? ('Current') : (<Moment format="MM/DD/YYYY">{exp.to}</Moment>)}
          </td>
        <td>
          <button className='btn btn-danger' onClick={this.onDeleteClick.bind(this, exp._id)}>
            <i className="fas fa-times"></i>
          </button>
        </td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience)
