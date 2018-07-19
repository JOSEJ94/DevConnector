import React, { Component } from "react";
import { GetCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount() {
    this.props.GetCurrentProfile();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { GetCurrentProfile }
)(Dashboard);
