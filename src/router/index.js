import Vue from "vue"
import Router from 'vue-router'
import Login from "../components/Login.vue"
import RoomHome from "../components/RoomHome.vue"
import CreateRoom from '../components/CreateRoom.vue'
import Room from '../components/Room.vue'
import Invite from '../components/Invite.vue'
import AddRoom from '../components/AddRoom.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/roomhome/:id',
            name: 'RoomHome',
            component: RoomHome,
            props: true
        },
        {
            path: '/room/create',
            name: 'createroom',
            component: CreateRoom,
        },
        {
            path: '/room/:id',
            name: 'Room',
            component: Room,
            props: true,

            children: [
              {
                  path: 'invite', component: Invite
              }
          ]
          },
          {
            path: '/room/:id/invite',
            name: 'Invite',
            component: Invite,
            props: true,
          },
          {
            path: '/room/n/:token',
            name: 'AddRoom',
            component: AddRoom,
          },
    ]
})