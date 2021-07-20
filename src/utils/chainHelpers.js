import { Client } from "@hiveio/dhive";
import store from "../store";

const settings = store.getState().settings;
const user = store.getState().users;

export const requestCustomJson = async (json) => {
  const { username } = user.username;

  const client = new Client(settings.sidechain_rpc);

  if (user.smartLock) {
    try {
      const wif = localStorage.getItem(`smartlock-${username}`);
      const key = wif.length > 51 ? atob(wif) : wif;
      const privateKey = this.$HIVE.PrivateKey.fromString(key);

      const broadcast = await client.broadcast.json(
        {
          required_auths: [username],
          required_posting_auths: [],
          id: json.id,
          json: JSON.stringify(json.data),
        },
        privateKey
      );

      console.log(broadcast);

     

    } catch (e) {
      console.log(e.message);
    }
  }
  window.hive_keychain.requestCustomJson(
    username,
    json.id,
    json.key,
    JSON.stringify(json.data),
    json.message,
    (r) => {
      if (r.success) {
        console.log(r);

        if (json.eventName) {
          this.$eventBus.$emit(json.eventName, json.emitData || r.result);
        }

        
      }
    }
  );
};
