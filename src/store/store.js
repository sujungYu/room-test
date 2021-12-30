import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    
    state: {
        siguser: null,
        roomId: null,
        roomTitle: '',
        roomMembers: [],
        userRooms: [],
        Token: null,
        useToken: false,
        TokenId: null,

    },
    mutations: {
        initData(state) {
            state.roomMembers = []
            state.userRooms = []
        },
        setlogin(state, payload) {
            state.siguser = JSON.stringify(payload)
            router.push({name:'RoomHome', params: {id:payload.id}})
        },
        setRoomId(state, payload) {
            state.roomId = payload
        },
        setTitle(state, payload) {
            state.roomTitle = payload
        },
        setMembers(state, payload) {
            for(let i=0; i<payload.length; i++) {
                state.roomMembers.push(JSON.parse(JSON.stringify(payload))[i].user.sigid)
            }
        },
        setUserRoom(state, payload) {
            state.userRooms.push({roomname: JSON.parse(JSON.stringify(payload))[0].roominfo.roomname, id: JSON.parse(JSON.stringify(payload))[0].id})
            // console.log(state.userRooms);
            // for(let i=0; i<payload.length; i++) {
            //     state.userRooms.push(JSON.parse(JSON.stringify(payload))[i].roomname)
            // }
        },
        setToken(state, payload) {
            state.Token = payload
        },
        useToken(state, payload) {
            state.useToken = payload
        },
        TokenId(state, payload) {
            state.TokenId = payload
        }

    },
    actions: {
        login({commit}, payload) {
            return axios.post(`${'http://localhost:8000'}/login`, {
                sigid: payload.username,
                sigpw: payload.password,
                login: payload.setlogin
            }).then((res) => {
                commit('setlogin', {sigid: res.data.sigid, sigpw: res.data.sigpw, setlogin:res.data.login, id: res.data.id})
                localStorage.setItem("user", JSON.stringify({sigid: res.data.sigid, id: res.data.id}))
            })
        },
        member({ commit }, payload) {
             axios.post(`${'http://localhost:8000'}/room/${payload.roomId}/user`, 
            {
                user: JSON.parse(localStorage.getItem("user")),
                room_leader: payload.manager
            }, 
            {
                headers: { "Content-Type": `application/json`}
            }).then((res) => {
                console.log(res);
                commit('setRoomId',payload.roomId)
            }).catch((error) => {
                console.log(error)
            })
        },
        setRoomName({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`${'http://localhost:8000'}/room/${payload}`)
                .then((res) => {
                    commit('setTitle', res.data.roominfo.roomname)
                    commit('setRoomId',payload)
                    console.log(res);
                    resolve(res)
                }).catch((error) => {
                    reject(error)
            })
            })
        },
        setRoomUser({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`${'http://localhost:8000'}/user?roomId=${payload}`)
                .then((res) => {
                    commit('setMembers', res.data)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
            })
            })
        },
        checkRoom({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`${'http://localhost:8000'}/user?user=${payload}`)
                .then((res) => {
                    for(let i=0; i<res.data.length; i++) {
                        res.data[i] = res.data[i].roomId
                    }
                    dispatch('setRoom', res.data)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
            })
            })
        },
        setRoom({ commit }, payload) {
            return new Promise((resolve, reject) => {
                for(let i=0; i<payload.length; i++) {
                    axios.get(`${'http://localhost:8000'}/room?id=${payload[i]}`)
                    .then((res) => {
                        commit('setUserRoom', res.data)
                        resolve(res)
                    }).catch((error) => {
                        reject(error)
                    })
                }

            })
        },
                
        inviteToken({ commit }, payload) {
            axios.patch(`${'http://localhost:8000'}/room/${this.getters.RoomId}`, {token: payload})
           .then((res) => {
               commit('setToken', payload)
               console.log(res);
           }).catch((error) => {
               console.log(error)
               commit('useToken', false)
           })
       },
       checkToken({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${'http://localhost:8000'}/room?token=${payload}`)
            .then((res) => {
                console.log(res.data);
                if(res.data[0]) {
                    commit('useToken', true)
                    commit('TokenId', res.data[0].id)
                }else {
                    commit('useToken', false)
                }
                resolve(res);
            }).catch((error) => {
                reject(error)
            })
        })
    },

    },
    getters: {
        RoomId(state) {
            return state.roomId
        },
        roomTitle(state) {
            return state.roomTitle
        },
        roomMembers(state) {
            return state.roomMembers
        },
        useToken(state) {
            return state.useToken
        },
        TokenId(state) {
            return state.TokenId
        },

    }
})