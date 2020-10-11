import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAb8w9QEFoKZx9UElFnvcZok-BTuKKPNcs',
  authDomain: 'examensarbete-7cd20.firebaseapp.com',
  databaseURL: 'https://examensarbete-7cd20.firebaseio.com',
  projectId: 'examensarbete-7cd20',
  storageBucket: 'examensarbete-7cd20.appspot.com',
  messagingSenderId: '101630825726',
  appId: '1:101630825726:web:0ccab082ff3c912eef01af',
  measurementId: 'G-LH1VF6112G',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
