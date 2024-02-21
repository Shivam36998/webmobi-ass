import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-RKkej_eUuezgH1OhuUHGwqzbFMDQOyU",
    authDomain: "image-uploader-4c3e4.firebaseapp.com",
    projectId: "image-uploader-4c3e4",
    storageBucket: "image-uploader-4c3e4.appspot.com",
    messagingSenderId: "613202479485",
    appId: "1:613202479485:web:ed21431c10f7ef4654a414"
};

const app = initializeApp(firebaseConfig);
export const imagedb = getStorage(app);