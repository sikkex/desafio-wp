import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
  apiKey: "AIzaSyCDCJTrrmNveXG9KEoKINlNWch1HmF5m3g",
  authDomain: "teste-wp-80e7a.firebaseapp.com",
  databaseURL: "https://teste-wp-80e7a.firebaseio.com",
  projectId: "teste-wp-80e7a",
  storageBucket: "teste-wp-80e7a.appspot.com",
  messagingSenderId: "964875024589",
  appId: "1:964875024589:web:a16160712d8056fd01d184",
  measurementId: "G-ZZL15D7K2M"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export default firebase;