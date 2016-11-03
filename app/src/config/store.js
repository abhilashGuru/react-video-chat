import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import room from '../features/room/duck';

const store = createStore(
  room,
  {
    availableRooms: [],
    room: null,
    user: null,
    isHost: null,
    messages: []
  },
  applyMiddleware(
    thunk,
    createLogger()
  )
);

export default store;