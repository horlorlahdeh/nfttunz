import { combineReducers } from "redux";
import users from "./users";
import settings from "./settings";
import token from "./token"
import collectibles from './collectibles'

export default combineReducers({ users, token, settings, collectibles });
