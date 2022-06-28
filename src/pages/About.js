import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.png";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Esha Ranade</div>
            <div className="brief_description">
              Hi! I am Esha Ranade, a rising junior studying Computer Science at the Massachusetts Institute of Technology.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
