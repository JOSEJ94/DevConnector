import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {
  CreateProfile as createProfile,
  GetCurrentProfile
} from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import IsEmpty from "../../validation/is_empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      status: "",
      skills: "",
      bio: "",
      githubusername: "",
      twitter: "",
      facebook: "",
      youtube: "",
      instagram: "",
      linkedin: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.GetCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      //bring skills array back to comma separated values;
      const skillsCSV = profile.skills.join(",");
      //if profile field doesnt exist add or make empty string;
      profile.company = !IsEmpty(profile.company) ? profile.company : "";
      profile.website = !IsEmpty(profile.website) ? profile.website : "";
      profile.location = !IsEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !IsEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !IsEmpty(profile.bio) ? profile.bio : "";
      profile.social = !IsEmpty(profile.social) ? profile.social : {};
      profile.twitter = !IsEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !IsEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.instagram = !IsEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !IsEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !IsEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      //set state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        status: profile.status,
        skills: skillsCSV,
        location: profile.location,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    //select options for the status;
    const options = [
      { label: "* Select Profesional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs)
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h4 className="display-4 text-center">Edit your profile</h4>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="An unique URL for your profile. It could be your full name or a nickname"
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea where you are at your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or your company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city and state suggested"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. Python,HTML,C#)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your lates repos and a Github Link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  GetCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    { createProfile, GetCurrentProfile }
  )(EditProfile)
);
