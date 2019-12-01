let BACKEND_URL_LIVE = 'http://172.16.3.17:3000/'
let BACKEND_URL_DEV = 'http://localhost:3000/'
let isDEV = false
export default {
  APP_NAME: 'SpotMe',
  BACKEND_URL: isDEV ? BACKEND_URL_DEV : BACKEND_URL_LIVE
}