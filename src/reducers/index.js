import { combineReducers } from "redux";
import users from "./users";
import settings from "./settings";
import token from "./token";
import collectibles from "./collectibles";
import profiles from "./profile";
import nfts from "./nfts";
import market from './market'

export default combineReducers({
  users,
  token,
  settings,
  collectibles,
  profiles,
  nfts,
  market
});
