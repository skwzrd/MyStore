import { store } from '@risingstack/react-easy-state';
import moment from 'moment';

export const appStore = store({
  auth: false,
  lastLogin: "NA",
  lastActive: "NA",
  login(){
    appStore.auth = true
    appStore.lastLogin = moment().format('LLL')
  },
  logout(){
    appStore.auth = false
    appStore.lastActive = moment().format('LLL')
  }
});

