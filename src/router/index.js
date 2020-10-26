import Vue from 'vue'
import Router from 'vue-router'
import AdvLogin from '@/components/AdvLogin.vue'
import Success from '@/components/Success.vue'
import Home from '@/components/Home.vue'
import GeneralView from '@/components/QuickSearch.vue'
import AdvanceSearch from '@/components/AdvanceSearch.vue'
import AddAddress from "@/components/AddAddress.vue"
import ManageAdmin from "@/components/ManageAdmin.vue"
/* 五组功能路由 */
import Visualize from '@/components/Visualize.vue'

/* 三组功能路由 */
import LoginX from '@/components/Login.vue'
import AddUser from '@/components/userManage/AddUser.vue'
import ManageUser from '@/components/userManage/ManageUser.vue'
import AMRole from '@/components/userManage/AMRole.vue'

/* 二四组功能路由 */
import SystemList from '@/components/SysManage/SystemList.vue'
import SystemDetail from '@/components/SysManage/SystemDetail.vue'
import SystemAdd from '@/components/SysManage/SystemAdd.vue'
import SystemUpdate from '@/components/SysManage/SystemUpdate.vue'
import AllSystemList from '@/components/SysManage/AllSystemList.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
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
			redirect: '/GeneralView',
			children: [
				{
					path: '/GeneralView',
					name: 'GeneralView',
					component: GeneralView
				},
				{
					path: '/Visualize',
					name: 'Visualize',
					component: Visualize
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
					path: '/AddUser',
					name: 'AddUser',
					component: AddUser,
					meta: {
						requiresAuth: true
					}
				},
				{
					path: '/ManageUser',
					name: 'ManageUser',
					component: ManageUser,
					meta: {
						requiresAuth: true
					}
				},
				{
					path: '/AMRole',
					name: 'AMRole',
					component: AMRole,
					meta: {
						requiresAuth: true
					}
				},
				{
					path: '/SystemList',
					name: 'SystemList',
					component: SystemList
				},
				{
					path: '/SystemDetail',
					name: 'SystemDetail',
					component: SystemDetail
				},
				{
					path: '/SystemAdd',
					name: 'SystemAdd',
					component: SystemAdd
				},
				{
					path: '/SystemUpdate',
					name: 'SystemUpdate',
					component: SystemUpdate
				},
				{
					path: '/AllSystemList',
					name: 'AllSystemList',
					component: AllSystemList
				}
			]
		}
	]
})
