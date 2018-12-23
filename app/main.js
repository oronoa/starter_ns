import Vue from 'nativescript-vue'
import routes from '~/router'
import store from '~/store'
import sideDrawer from '~/components/sideDrawer'
import drawerContent from '~/components/drawerContent'
import firebase from "nativescript-plugin-firebase"

console.log('vvvv',firebase)
firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  showNotifications: true,
  onPushTokenReceivedCallback: function(token) {
    console.log("Firebase push token: " + token);
  },
  onMessageReceivedCallback: function(message) {
    console.log(`Title: ${message.title}`);
    console.log(`Body: ${message.body}`);
    // if your server passed a custom property called 'foo', then do this:
    console.log(`Value of 'foo': ${message.data.foo}`);
  }
}).then(function (instance) {
    console.log("firebase.init done",  instance);
    //instance.subscribeToTopic("news").then(() => console.log("Subscribed to topic"));
    console.log('999')
}).catch(error => console.log(`firebase.init error: ${error}`));;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes

new Vue({
  store,
  render (h) {
    return h(
      sideDrawer,
      [
        h(drawerContent, { slot: 'drawerContent' }),
        h(routes.Home, { slot: 'mainContent' })
      ]
    )
  }
}).$start()
