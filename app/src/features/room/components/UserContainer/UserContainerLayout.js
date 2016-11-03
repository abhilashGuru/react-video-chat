import React, { Component } from 'react';
import UserItem from './UserItem/UserItem';

export default class UserContainerLayout extends Component {
  render() {
    let {users} = this.props;
    return (
      <div className="user-container">
        { users.map(user =>
          <UserItem user={user} key={user.id}></UserItem>
        )}
      </div>
    );
  }
}