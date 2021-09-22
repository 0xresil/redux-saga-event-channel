
import { createReducer } from "@reduxjs/toolkit";
import { INCREMENT } from './actions'

const reducer = createReducer({ count: 0 }, {
  [INCREMENT] : (state = { count: 0 }, action) => {
    return { count: state.count + 1 };
  }
});

export default reducer;