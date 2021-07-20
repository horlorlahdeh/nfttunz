import { MINT_TOKEN } from "./types";
import store from "../store";
import { setToastNotification, toFixedWithoutRounding } from "../utils/helpers";



export const createToken = (tokenPayload) => async (dispatch) => {
  const settings = await store.getState().settings;
  const username = await store.getState().users.username;
  const fee = toFixedWithoutRounding(
    settings.token_issuance_base_fee +
      settings.token_issuance_fee * tokenPayload.editions,
    3
  );
  const json = {
    contractName: "tokens",
    contractAction: "transfer",
    contractPayload: {
      symbol: settings.currency,
      to: settings.account,
      quantity: fee.toString(),
      memo: JSON.stringify(tokenPayload),
    },
  };
  console.log(json)

  const jsonData = {
    id: settings.sidechain_id,
    key: "Active",
    data: json,
    message: "Issue Token",
    eventName: "issue-tokens-successful",
  };
  
  window.hive_keychain.requestCustomJson(
    username,
    jsonData.id,
    jsonData.key,
    JSON.stringify(json.data),
    jsonData.message,
    (r) => {
      if (r.success) {
        console.log(r);
      }
    }
  );
  dispatch({
    type: MINT_TOKEN,
    payload: "token stuffs",
  });
};
