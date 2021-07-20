import { combineReducers } from "redux";
import users from "./users";
import settings from "./settings";
import token from "./token"

export default combineReducers({ users, token, settings });
