<template>
	<a-layout style="height: 100%;background-color: #F3F7FA;">
		<a-layout-header style="background-color: #EE4B56;height: 60px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2)">
			<!-- <img class="bannerLogo" src="../assets/logo.png" />
			<img class="bannerLogo" src="../assets/banner.png" /> -->
			<h1 class="bannerTitle">接口管理系统</h1>
		</a-layout-header>
		<a-layout>
			<a-layout-sider style="background-color: white;color: white;height:100%">
				<div class="navbar">
					<div style="text-align: center;margin-bottom: 10px;"><img class="bannerLogo" src="../assets/logo.png" /></div>
					<router-link :to="navPath[0].path" tag="div">
						<div :class="navIndex === 1 ? 'navbar-item-active' : ''" class="navbar-item">
							<a-icon type="home" class="navbar-icon" />首页
						</div>
					</router-link>
					<router-link :to="navPath[1].path" tag="div">
						<div :class="navIndex === 2 ? 'navbar-item-active' : ''" class="navbar-item">
							<a-icon type="dot-chart" class="navbar-icon" />链路可视化
						</div>
					</router-link>
					<div class="navbar-item" @click="openGroupA">
						<a-icon type="pic-center" class="navbar-icon" />系统管理
						<a-icon type="right" :rotate=" showGroupA == true ? 90 : 0 " style="float: right;margin-right: 10px;margin-top: 3px;" />
					</div>
					<div v-if="showGroupA" class="navbar-group-item" :style="'height:' + showGroupA == true ? '500px' : '0'">
						<router-link :to="navPath[3].path" tag="div">
							<div :class="navIndex === 4 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="idcard" class="navbar-icon-group" />所有系统清单
							</div>
						</router-link>
						<router-link :to="navPath[2].path" tag="div">
							<div :class="navIndex === 3 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="user-add" class="navbar-icon-group" />管理系统
							</div>
						</router-link>
						<router-link :to="navPath[4].path" tag="div">
							<div :class="navIndex === 5 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="team" class="navbar-icon-group" />新增系统
							</div>
						</router-link>
						<router-link :to="navPath[5].path" tag="div">
							<div :class="navIndex === 6 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="idcard" class="navbar-icon-group" />所有服务清单
							</div>
						</router-link>
						<router-link :to="navPath[6].path" tag="div">
							<div :class="navIndex === 7 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="team" class="navbar-icon-group" />新增服务
							</div>
						</router-link>
					</div>
					<!-- <div class="navbar-item" @click="openGroupB">
						<a-icon type="pic-center" class="navbar-icon" />折叠面板B
						<a-icon type="right" :rotate=0 style="float: right;margin-right: 10px;margin-top: 3px;" />
					</div>
					<div v-if="showGroupB" class="navbar-group-item">
						<router-link v-if="advMode" :to="navPath[2].path" tag="div">
							<div :class="navIndex === 3 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="idcard" class="navbar-icon" />所有服务
							</div>
						</router-link>
						<router-link v-if="superMode" :to="navPath[3].path" tag="div">
							<div :class="navIndex === 4 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="team" class="navbar-icon" />管理管理员
							</div>
						</router-link>
						<router-link v-if="superMode" :to="navPath[4].path" tag="div">
							<div :class="navIndex === 5 ? 'navbar-item-active' : ''" class="navbar-item">
								<a-icon type="user-add" class="navbar-icon" />新增管理员
							</div>
						</router-link>
					</div> -->

					<div style="display: flex;justify-content: center;">
						<div v-if="advMode && !superMode" class="navbar-item-changepass" @click="changePassword">
							<a-icon type="lock" class="navbar-icon" style="margin-left: 0px;" />修改密码
						</div>
						<div class="navbar-item-logout" @click="confirmLogout">
							<a-icon type="logout" class="navbar-icon" style="margin-left: 0px;" />退出
						</div>
					</div>
					<a-modal :visible="isChpvisible" :maskClosable="true" :confirm-loading="confirmLoading" @ok="updatePass" @cancel="onCancel"
					 cancelText="再想想" okText="修改" okType="danger">
						<div class="updateTitle">修改密码</div>
						<a-divider />
						<div style="max-width: 300px;">
							<a-form :form="form">
								<a-form-item v-bind="formItemLayout" label="原密码" has-feedback>
									<a-input v-decorator="['orignpass', { rules: [ { required: true, message: '原密码不能为空!' } ] } ]" />
								</a-form-item>
								<a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
									<a-input v-decorator="['password', { rules: [ { required: true, message: '新密码不能为空!' },
									              { validator: validateToNextPassword } ] } ]" />
								</a-form-item>
								<a-form-item v-bind="formItemLayout" label="确认新密码" has-feedback>
									<a-input v-decorator="['confirmpass', { rules: [ { required: true, message: '请再输入一次新密码!' },
									              { validator: compareToFirstPassword, } ] } ]" />
								</a-form-item>
							</a-form>
						</div>
					</a-modal>
				</div>
			</a-layout-sider>
			<a-layout-content style="background-color: #F3F7FA;">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script>
	import request from '../utils/request.js'
	export default {
		data() {
			return {
				advMode: false,
				superMode: false,
				/*
				 *动态路由路径，字段与router/index.js里的name对应
				 */
				navPath: [{
						path: 'GeneralView'
					},
					{
						path: 'Visualize'
					},
					{
						path: 'SystemList'
					},
					{
						path: 'AllSystemList'
					},
					{
						path: 'SystemAdd'
					},
					{
						path: 'AllServiceList'
					},
					{
						path: 'ServiceAdd'
					}
				],
				navIndex: 1,
				isChpvisible: false,
				confirmLoading: false,
				formItemLayout: {
					labelCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 8
						},
					},
					wrapperCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 16
						},
					},
				},
				showGroupA: false,
				showGroupB: false,
			}
		},
		watch: {
			"$route"() {
				//console.log("this route path:" + this.$route.path);
				var path = this.$route.path.replace('/', '');
				this.navIndex = this.navPath.findIndex(item => item.path === path) + 1;
				//console.log('navIndex:', this.navIndex);
			}
		},
		methods: {
			confirmLogout() {
				var that = this;
				this.$confirm({
					title: '退出登录',
					content: '确认退出吗？',
					cancelText: '再想想',
					okText: '退出',
					okType: 'danger',
					centered: true,
					onOk() {
						return new Promise((resolve, reject) => {
							setTimeout(function() {
								/*
								 * 退出登录耗时操作
								 */
								//this.$store.commit("setMode", 'C');
								//this.$store.commit("setErp", values.account);
								resolve();
								that.$router.push('/');
							}, 1000);
						}).catch(() => console.log('Oops errors!'));
					},
					onCancel() {
						return new Promise((resolve, reject) => {
							resolve();
						}).catch(() => console.log('Oops errors!'));
					},
				});
			},
			changePassword() {
				this.isChpvisible = true;
			},
			compareToFirstPassword(rule, value, callback) {
				const form = this.form;
				if (value && value !== form.getFieldValue('password')) {
					callback('您两次输入的新密码不一致!');
				} else {
					callback();
				}
			},
			validateToNextPassword(rule, value, callback) {
				const form = this.form;
				if (value && this.confirmDirty) {
					form.validateFields(['confirmpass'], {
						force: true
					});
				}
				callback();
			},
			updatePass() {
				/*
				 *表单格式化验证
				 */
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						this.confirmLoading = true;
						setTimeout(() => {
							this.postUpdate();
							this.confirmLoading = false;
						}, 2000);
					}
				})
			},
			postUpdate() {
				let values = this.form.getFieldsValue();
				let erp = this.$store.state.erp;
				request({
					url: '/AddressBackEnd/changePassword',
					method: 'post',
					params: {
						erp: erp,
						orignpass: values.orignpass,
						password: values.password
					}
				}).then(res => {
					//console.log(res)
					if (res.result != null && res.result == "success") {
						this.$router.push("/Success");
					} else if (res.result == "orignPassError") {
						this.$error({
							title: '错误',
							content: '原密码不正确！',
							centered: true,
						});
					} else if (res.result == "fail") {
						this.$message.error('服务器出现了某些错误！请联系管理员');
					}
					this.isUpdvisible = false;
				}).catch(error => {
					this.isUpdvisible = false;
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			onCancel() {
				this.isChpvisible = false;
			},
			openGroupA() {
				console.log("openGroupA");
				this.showGroupA = !this.showGroupA;
			},
			openGroupB() {
				console.log("openGroupB");
				this.showGroupB = !this.showGroupB;
			}
		},
		beforeCreate() {
			/*
			 *创建一个名为{name}的表单
			 */
			this.form = this.$form.createForm(this, {
				name: 'changePass'
			});
		},
		created() {
			console.log("mode: " + this.$store.state.mode);
			//console.log("erp:" + this.$store.state.erp);
			/*
			 *权限控制高权限访问链接可见性
			 */
			if (this.$store.state.mode == "A") {
				this.advMode = true;
				this.superMode = true;
			} else if (this.$store.state.mode == "B") {
				this.advMode = true;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.bannerLogo {
		width: 100px;
	}

	.bannerTitle {
		color: white;
		float: left;
		height: 60px;
		line-height: 60px;
		text-align: left;
		font-size: x-large;
		font-weight: bold;
	}

	.navbar {
		display: flex;
		flex-direction: column;
		padding: 15px;
		text-align: left;
	}

	.navbar-group {}

	.navbar-group-item {
		margin-left: 20px;
	}

	.navbar-icon-group {
		margin-left: 20px;
		margin-right: 5px;
	}

	.navbar-item {
		margin-top: 6px;
		margin-bottom: 6px;
		padding-top: 12px;
		padding-bottom: 12px;
		border-radius: 13px;
		color: #54576A;
		font-weight: bold;
		transition: all 0.3s;
	}

	.navbar-item-active {
		color: white;
		background-color: #EE4B56;
	}

	.navbar-item:hover {
		cursor: pointer;
		color: #EE4B56;
		background-color: #FFF2F6;
	}

	.navbar-item-changepass {
		position: fixed;
		bottom: 45px;
		width: 120px;
		text-align: center;
		margin-top: 13px;
		margin-bottom: 25px;
		padding-top: 6px;
		padding-bottom: 6px;
		border-radius: 13px;
		color: #1890FF;
		transition: all 0.3s;
	}

	.navbar-item-changepass:hover {
		cursor: pointer;
		color: white;
		background-color: #1890ff;
	}

	.navbar-item-logout {
		position: fixed;
		bottom: 0;
		width: 120px;
		text-align: center;
		margin-top: 13px;
		margin-bottom: 25px;
		padding-top: 6px;
		padding-bottom: 6px;
		border-radius: 13px;
		color: white;
		background-color: #FC6C5C;
		font-weight: bold;
		transition: all 0.3s;
	}

	.navbar-item-logout:hover {
		cursor: pointer;
		color: white;
		background-color: #FB9181;
	}

	.navbar-icon {
		font-size: 16px;
		margin-left: 30px;
		margin-right: 5px;
	}

	.updateTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}
</style>
