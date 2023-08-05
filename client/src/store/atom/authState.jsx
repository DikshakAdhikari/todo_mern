import {atom} from 'recoil'

export const authState = atom({
    key: 'userState',
    default: {
        token: null,
        username:null
    }
  });