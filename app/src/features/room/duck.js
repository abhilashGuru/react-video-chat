import { combineReducers } from 'redux';
import { createStructuredSelector } from 'reselect';
import { generateId } from '../../helpers/random';
import { chatService } from ''

// Actions
const ADD_ROOM = '/ROOM/ADD_ROOM';
const SET_ROOM = '/ROOM/SET_ROOM';
const UPDATE_ROOM = '/ROOM/UPDATE_ROOM';
const SET_LOCAL_USER = '/ROOM/SET_LOCAL_USER'
const ADD_JOINER = '/ROOM/ADD_JOINER';
const SET_ACTIVE_ROOM_BY_NAME = '/ROOM/SET_ACTIVE_ROOM_BY_NAME';
const SET_ROOM_LIST_VISIBILITY = '/ROOM/SET_ROOM_LIST_VISIBILITY';
const REMOVE_ROOM = '/ROOM/REMOVE_ROOM';
const SET_ROOM_STATUS = '/ROOM/SET_ROOM_STATUS';

export const ROOM_STATUS = {
  ConnectToServer: 0,
  AccessWebcamAndMicrophone: 2,
  Ready: 3
};

export const USER_STATUS = {
  Joining: 0,
  Exiting: 1,
  Ready: 3
};

export function setRoom(room) {
  return {
    type: SET_ROOM,
    room
  };
}

export function updateRoom(updateData) {
  return {
    type: UPDATE_ROOM,
    updateData
  }
}

export function joinRoom(name) {
  return (dispatch, getState) => {
    let room = createEmptyRoom({
      name: name,
      isHost: false
    });

    dispatch(setRoom(room));

    chatService
      .joinRoom(name)
      .on('connected', () => {
        let isHost = true;
        if (!created) {
          isHost = false;
        }
        let updateData = {
          isHost: isHost,
          status: ROOM_STATUS.AccessWebcamAndMicrophone
        }
      })
      .on('ready', () => {
        dispatch(updateRoom(room))
      });
  }
}

export function setActiveRoomByName(name) {
  return {
    type: SET_ACTIVE_ROOM_BY_NAME,
    name
  };
}

export function removeRoom(id) {
  return {
    type: REMOVE_ROOM,
    id
  };
}

export function setRoomListVisibility(value) {
  return {
    type: SET_ROOM_LIST_VISIBILITY,
    value
  };
}

function room(state = {}, action) {
  switch (action) {
    case SET_ROOM:
      return action.room;
    case UPDATE_ROOM:
      return Object.assign({}, state, action.updateData);
    default:
      return state;
  }
}


function rooms(state = [], action) {
  switch (action.type) {
    case ADD_ROOM:
      return [...state, action.room];
    case REMOVE_ROOM:
      return state.filter(room => room.id === action.id);
    default:
      return state;
  }
}

function activeRoom(state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_ROOM_BY_NAME:
      state.name;
    default:
      return state;
  }
}

function roomListVisibility(state = true, action) {
  switch (action.type) {
    case SET_ROOM_LIST_VISIBILITY:
      return action.value;
    default:
      return state;
  }
}

export default combineReducers({
  room
});

function createEmptyRoom(options) {
  let id = generateId();
  let room = {
    id,
    name: options.name,
    status: ROOM_STATUS.ConnectToServer,
    users: [],
    isHost: options.isHost
  };
  return room;
}