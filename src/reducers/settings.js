import { SET_SETTINGS } from "../actions/types";

const intialState = {
    
}


const settingsReducer = (state = intialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_SETTINGS:
            return {
                ...state,
                ...payload
            }
    
        default:
            return state
    }
}
export default settingsReducer;