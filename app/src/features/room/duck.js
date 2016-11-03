import { combineReducers } from 'redux';
import { createStructuredSelector } from 'reselect';
import { generateId } from '../../helpers/random';
import getChatService from '../../services/chatService';

let chatService = getChatService();

// Actions
const SET_ROOM = '/ROOM/SET_ROOM';
const UPDATE_ROOM = '/ROOM/UPDATE_ROOM';
const ADD_USER = '/ROOM/ADD_USER';
const UPDATE_USER = '/ROOM/UPDATE_USER';

export const ROOM_STATUS = {
  Initialize: 0,
  ConnectToServer: 1,
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
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

export function updateUser(updateData) {
  return {
    type: UPDATE_USER,
    updateData
  };
}

export function joinRoom(name) {
  return (dispatch, getState) => {

    let room = createEmptyRoom({
      name: name,
      isHost: false,
      status: ROOM_STATUS.Initialize
    });

    dispatch(setRoom(room));

    chatService
      .on('ready', () => {
        chatService.joinRoom(name);
      })
      .on('connected', (data) => {
        let {isHost} = data;
        let updateData = {
          isHost: isHost,
          status: ROOM_STATUS.AccessWebcamAndMicrophone
        }

        dispatch(updateRoom(updateData));

        chatService.getLocalStream().then(stream => {
          let user = createUser({
            isHost: isHost,
            stream: stream,
            status: USER_STATUS.Ready,
            peerId: data.peerId
          });

          dispatch(addUser(user));
        });
      })
      .on('newJoiner', userData => {
        let user = createUser({
          peerId: userData.peerId,
          status: USER_STATUS.Joining,
          isHost: false
        });
        dispatch(addUser(user));
      })
      .on('newJoinerReady', stream => {
        dispatch(updateUser({
          stream: stream
        }));
      })

    chatService.init();


  }
}


function room(state = {}, action) {
  switch (action.type) {
    case SET_ROOM:
      return action.room;
    case UPDATE_ROOM:
      return Object.assign({}, state, action.updateData);
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return state.map(user => {
        return Object.assign({}, user, action.updateData);
      });
    default:
      return state;
  }
}


export default combineReducers({
  room,
  users
});

function createEmptyRoom(options) {
  let id = generateId();
  let room = {
    id,
    name: options.name,
    status: ROOM_STATUS.Initialize,
    isHost: options.isHost
  };
  return room;
}

function createUser(options) {
  return {
    id: generateId(),
    stream: options.stream,
    isHost: options.isHost,
    status: options.status,
    peerId: options.peerId
  };
}