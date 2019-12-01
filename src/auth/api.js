import $ from 'jquery'
import AUTH from 'auth'
import config from 'config.js'
export default {
  mounted(){
  },
  methods: {
    APIRequest(link, parameter, callback){
      let backEndURL = config.BACKEND_URL + link
      let token = (AUTH.token.data !== null) ? '?token=' + AUTH.token.data : ''
      let urlWithToken = backEndURL + token
      $.ajax({
        url: urlWithToken,
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        data: parameter
      }).then(response => {
        callback(response)
      })
    }
  }
}