import Vue from 'vue'
import Router from 'vue-router'
import Success from '@/components/Success.vue'
import Home from '@/components/Home.vue'
import GeneralView from '@/components/GeneralView.vue'
/* 五组功能路由 */
import Visualize from '@/components/Visualize.vue'

/* 一组功能路由 */
import AllElementList from '@/components/EleManage/AllElementList.vue'
import ElementAdd from '@/components/EleManage/ElementAdd.vue'

/* 三组功能路由 */
import LoginX from '@/components/Login.vue'
import AddUser from '@/components/userManage/AddUser.vue'
import ManageUser from '@/components/userManage/ManageUser.vue'
import AMRole from '@/components/userManage/AMRole.vue'

/* 二四组功能路由 */
import ManageSystemList from '@/components/SysManage/ManageSystemList.vue'
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
					path: '/ManageSystemList',
					name: 'ManageSystemList',
					component: ManageSystemList
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
				},
				{
					path: '/AllElementList',
					name: 'AllElementList',
					component: AllElementList
				},
				{
					path: '/ElementAdd',
					name: 'ElementAdd',
					component: ElementAdd
				}
			]
		}
	]
})
