import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


class Navbar extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        
    }

  render(){
      const { isAuthenticated , user } = this.props.auth;

      const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item" style={{marginTop : '5px'}}>
                <NavLink className="nav-link" to="/feed">Post Feed</NavLink>
            </li>
            <li className="nav-item" style={{marginTop : '5px'}}>
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <button className="btn text-secondary" onClick={this.handleLogout}>
                <img src={user.gravatar} alt={user.name} title="You must have a Gravatar connected to your email to dispay an image" style={{width : '35px', marginRight : '10px', borderRadius : '100px'}}/>
                Logout</button>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Sign Up</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
        </ul>
    )

        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">DevConnector</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="profiles">Developers
                                </NavLink>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
                
                
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);