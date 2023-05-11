import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_NOTIFICATION_PUSH
} from "@env";
import { onBackgroundMessage } from "firebase/messaging/sw";


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

export function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      getToken(messaging,{vapidKey:FIREBASE_NOTIFICATION_PUSH})
      .then((currentToken)=>{
        if(currentToken){
          console.log("Current token:",currentToken)
          onMessage(messaging, (payload) => {
            console.log("Payload", payload);
          });
        }else{
          console.log("No Instance Token available. Request permission to generate one.");
        }
      })
    }else{
      console.log("Unable to get permission to notify.");
    }
  });
}
requestPermission()

