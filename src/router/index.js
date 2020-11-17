import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Success = ()=>import('@/components/Success.vue')
const Home = ()=>import( '@/components/Home.vue')
const GeneralView = ()=>import( '@/components/GeneralView.vue')
/* 五组功能路由 */
const Visualize = ()=>import( '@/components/Visualize.vue')

/* 一组功能路由 */
const AllElementList = ()=>import( '@/components/EleManage/AllElementList.vue')
const ElementAdd = ()=>import( '@/components/EleManage/ElementAdd.vue')

/* 三组功能路由 */
const LoginX = ()=>import( '@/components/Login.vue')
const AddUser = ()=>import( '@/components/userManage/AddUser.vue')
const ManageUser = ()=>import( '@/components/userManage/ManageUser.vue')
const AMRole = ()=>import( '@/components/userManage/AMRole.vue')

/* 二四组功能路由 */
const ManageSystemList = ()=>import( '@/components/SysManage/ManageSystemList.vue')
const SystemDetail = ()=>import( '@/components/SysManage/SystemDetail.vue')
const SystemAdd = ()=>import( '@/components/SysManage/SystemAdd.vue')
const SystemUpdate = ()=>import( '@/components/SysManage/SystemUpdate.vue')
const AllSystemList = ()=>import( '@/components/SysManage/AllSystemList.vue')

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
