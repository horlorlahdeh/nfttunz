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

export const sellToken = (tokenPayload, price, nft) => async dispatch => {
  try {
    const nfts =[]
    nfts.push(nft.toString());
     const settings = await store.getState().settings;
     const username = await store.getState().users.username;
     const fee = toFixedWithoutRounding(
       settings.token_issuance_base_fee +
         settings.token_issuance_fee * tokenPayload.editions,
       3
     );
     const json = {
       contractName: "nftmarket",
       contractAction: "sell",
       contractPayload: {
         priceSymbol: settings.currency,
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
export const buyToken = (tokenPayload, price, nft) => async dispatch => {
  try {
    const nfts =[]
    nfts.push(nft.toString());
     const settings = await store.getState().settings;
     const username = await store.getState().users.username;
     const fee = toFixedWithoutRounding(
       settings.token_issuance_base_fee +
         settings.token_issuance_fee * tokenPayload.editions,
       3
     );
     const json = {
       contractName: 'nftmarket',
       contractAction: 'buy',
       contractPayload: {
         symbol: settings.nft_symbol,
         nfts,
         marketAccount: 'nfttunz',
         expPrice: price.toString(),
         expPriceSymbol: settings.currency
       },
     };
     console.log(json);
     const jsonData = {
       id: settings.sidechain_id,
       key: "Active",
       data: json,
       message: "Buy NFT",
       eventName: "nft-buy-successful",
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

export const changePrice = (tokenPayload, price, nft) => async (dispatch) => {
  try {
    const nfts = [];
    nfts.push(nft.toString());
    const settings = await store.getState().settings;
    const username = await store.getState().users.username;
    const json = {
      contractName: 'nftmarket',
      contractAction: 'changePrice',
      contractPayload: {
        symbol: settings.nft_symbol,
        nfts,
        price: price.toString(),
      },
    };
    const jsonData = {
      id: settings.sidechain_id,
      key: 'Active',
      data: json,
      message: 'Change Price NFT',
      eventName: 'nft-change-price-successful',
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
          setToastNotification(r.message, 'success');
        }
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

export const cancelSell = ( nft) => async (dispatch) => {
  try {
    const nfts = [];
    nfts.push(nft.toString());
    const settings = await store.getState().settings;
    const username = await store.getState().users.username;
    const json = {
      contractName: 'nftmarket',
      contractAction: 'cancel',
      contractPayload: {
        symbol: settings.nft_symbol,
        nfts
      },
    };
    const jsonData = {
      id: settings.sidechain_id,
      key: 'Active',
      data: json,
      message: 'Change Price NFT',
      eventName: 'nft-change-price-successful',
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
          setToastNotification(r.message, 'success');
        }
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};