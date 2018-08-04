import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { DeleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.DeleteEducation(id);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to ? (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          ) : (
            "Current day"
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}
Education.propTypes = {
  DeleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { DeleteEducation }
)(Education);
