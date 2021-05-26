import React, { Component } from "react";
import AddMember from "../Modals/AddMember/AddMember";
import { Avatar } from "@material-ui/core";
import { Add, PersonOutline } from '@material-ui/icons';
import './TeamMember.scss';

class TeamMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <div className="TeamMemberWrapper">
        <div className="thumbnailStyle">
          <Avatar
            className="profile__img"
            alt="Profile"
            src="https://iffhs.de/wp-content/uploads/2017/12/lionel-messi.jpg"
          />
        </div>
        <div className="iconStyle">
          <div onClick={() => this.setState({ showModal: true })}>
            <PersonOutline />
          </div>
          <div onClick={() => this.setState({ showModal: true })}>
            <PersonOutline />
          </div>
          <div onClick={() => this.setState({ showModal: true })}>
            <Add />
          </div>
        </div>
        <AddMember
          show={this.state.showModal}
          onHide={() => {
            this.setState({ showModal: false });
          }}
        />
      </div>
    );
  }
}

export default TeamMember;
