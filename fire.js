import firebase from 'firebase';
import config from './fire-config';

const fire = firebase.initializeApp(config);

export default fire;