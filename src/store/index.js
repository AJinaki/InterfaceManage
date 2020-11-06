import Vue from 'vue'
import Vuex from 'vuex'
//import { getToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		host: 'localhost', // localhost www.kinmok.top
		erp: '',
		mode: 'C',
		sysList: '-1',
		//token: getToken()
	},
	mutations: {
		setMode(state, mode) {
			state.mode = mode;
		},
		setErp(state, erp) {
			state.erp = erp;
		},
		setSysList(state, sysList) {
			state.sysList = sysList;
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
