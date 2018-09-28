import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//moment
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends React.Component {

  //delete an Education
  onDeleteClick(id) {
    this.props.deleteEducation(id)
  }

  render () {

    //map Education from props and create table rows -- todo: edu.to if current display 'current'
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="MM/DD/YYYY">{edu.from}</Moment> - {edu.to === null ? ('Current') : (<Moment format="MM/DD/YYYY">{edu.to}</Moment>)}
          </td>
        <td>
          <button className='btn btn-danger' onClick={this.onDeleteClick.bind(this, edu._id)}>
            <i className="fas fa-times"></i>
          </button>
        </td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)
