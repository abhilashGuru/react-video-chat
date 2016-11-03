import React, { Component } from 'react';
import UserContainerLayout from './UserContainerLayout';
import { connect } from 'react-redux'
import * as actions from '../../duck';

class UserContainer extends Component {
  render() {
    let {users} = this.props;
    return (
      <UserContainerLayout users={users}></UserContainerLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);

