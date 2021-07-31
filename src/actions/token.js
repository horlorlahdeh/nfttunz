import { MINT_TOKEN } from "./types";
import store from "../store";
import { setToastNotification, toFixedWithoutRounding } from "../utils/helpers";
import axios from '../utils/axios'


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
    JSON.stringify(jsonData.data),
    jsonData.message,
    (r) => {
      if (r.success) {
        console.log(r)
        setToastNotification(r.message, 'success')
      }
    }
  );
  dispatch({
    type: MINT_TOKEN,
    payload: "token stuffs",
  });
};

export const sellToken = (tokenPayload, price, nfts) => async dispatch => {
  try {
     const settings = await store.getState().settings;
     const username = await store.getState().users.username;
     const fee = toFixedWithoutRounding(
       settings.token_issuance_base_fee +
         settings.token_issuance_fee * tokenPayload.editions,
       3
     );

     const data = axios.post("https://hetestnet.dtools.dev/rpc/contracts/");
      
     const json = {
       contractName: "nftmarket",
       contractAction: "sell",
       contractPayload: {
         pricSsymbol: settings.currency,
         symbol: settings.nft_symbol,
         nfts,
         price: price.toString(),
         fee: settings.market_fee,
       },
     };
     const jsonData = {
       id: settings.sidechain_id,
       key: "Active",
       data: json,
       message: "Sell NFT",
       eventName: "nft-sell-successful",
     };
     window.hive_keychain.requestCustomJson(
       username,
       jsonData.id,
       jsonData.key,
       JSON.stringify(jsonData.data),
       jsonData.message,
       (r) => {
         if (r.success) {
           console.log(r);
           setToastNotification(r.message, "success");
         }
       }
     );
  } catch (err) {
    console.log(err.message)
  }
}
