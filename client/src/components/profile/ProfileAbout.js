import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
  render() {
      const {profile} = this.props;

      // Get first name
      const firstName = profile.user.name.trim().split(' ')[0];
      const displayName = firstName + '\'s';

      // Skills List
      const skills = profile.skills.map((skill,index) => (
          <div key={index} className="p-3">
            <i className="fa fa-check"/> {skill}
          </div>
      ))
    return (
      <div>
          <div className="row">
            <div className="col-md-12">
            
              <div className="card card-body bg-light mb-3">
              { 
                  isEmpty(profile.bio) ? null : 
                  ( 
                    <div>
                        <h3 className="text-center text-info">{`${displayName} Bio`}</h3>
                        <p className="lead">{profile.bio}</p>
                    </div>
                  )
                  
              }
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
    profile : PropTypes.object.isRequired
}

export default ProfileAbout;