import Vue from 'vue'
import Router from 'vue-router'
import LoginX from '@/components/Login.vue'
import AdvLogin from '@/components/AdvLogin.vue'
import Success from '@/components/Success.vue'
import Home from '@/components/Home.vue'
import QuickSearch from '@/components/QuickSearch.vue'
import AdvanceSearch from '@/components/AdvanceSearch.vue'
import AddAddress from "@/components/AddAddress.vue"
import ManageAdmin from "@/components/ManageAdmin.vue"
import AddAdmin from '@/components/AddAdmin.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '',
			name: 'Login',
			component: LoginX
		},
		{
			path: '/AdvLogin',
			name: 'AdvLogin',
			component: AdvLogin
		},
		{
			path: '/Success',
			name: 'Success',
			component: Success
		},
		{
			path: '/Home',
			name: 'Home',
			component: Home,
			redirect: '/QuickSearch',
			children: [{
					path: '/QuickSearch',
					name: 'QuickSearch',
					component: QuickSearch
				},
				{
					path: '/AdvanceSearch',
					name: 'AdvanceSearch',
					component: AdvanceSearch
				},
				{
					path: '/AddAddress',
					name: 'AddAddress',
					component: AddAddress,
					meta: {
						requiresAuth: true
					}
				},
				{
					path: '/ManageAdmin',
					name: 'ManageAdmin',
					component: ManageAdmin,
					meta: {
						requiresAuth: true
					}
				},
				{
					path: '/AddAdmin',
					name: 'AddAdmin',
					component: AddAdmin,
					meta: {
						requiresAuth: true
					}
				}
			]
		}
	]
})
