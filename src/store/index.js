import Vue from 'vue'
import Vuex from 'vuex'
//import { getToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		host: 'localhost', // localhost www.kinmok.top
		erp: '',
		mode: 'C'
		//token: getToken()
	},
	mutations: {
		setMode(state, mode) {
			state.mode = mode;
		},
		setErp(state, erp) {
			state.erp = erp;
		}
	  /* resetToken (state) {
	    state.token = ''
	  },
	  setToken (state, value) {
	    state.token = value
	  } */
	}
})

export default store
