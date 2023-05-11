import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { FIREBASE_NOTIFICATION_PUSH } from "@env";

// Add the public key generated from the console here.
export const pushPermission = async () => {
    console.log("Requesting permission...");
    const data = await Notification.requestPermission();
    if(data === 'granted'){
        console.log("Notification permission granted.");
        pushToken()
    }else{
        console.log("Unable to get permission to notify.");
    }
};
export const pushToken = async () => {
  const messaging = getMessaging();
  const token = await getToken(messaging, {
    vapidKey: FIREBASE_NOTIFICATION_PUSH,
  });
  console.log(token, 'Token');
};
export const reciveMessage = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Payload", payload);
  });
};
