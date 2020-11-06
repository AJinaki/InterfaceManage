<template>
	<div style="height: 100%;display: flex;flex-direction: column;background-color: #F3F7FA;">
		<div style="margin: 0 auto;margin-top: 120px;">
			<div class="loghead">
				<div style="font-size: 40px;color: white;">接口管理系统</div>
			</div>
			<div class="logForm">
				<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 24}" @submit="handleSubmit" style="margin-top: 35px;">
					<a-form-item>
						<a-input size="large" placeholder="请输入账号" v-decorator="[
									  'account',
									  { rules: [{ required: true, message: '账号不能为空！' }] },
									]">
							<a-icon slot="prefix" type="user" />
						</a-input>
					</a-form-item>
					<a-form-item>
						<a-input-password size="large" placeholder="请输入密码" v-decorator="[
									  'password',
									  { rules: [{ required: true, message: '密码不能为空！' }] },
									]">
							<a-icon slot="prefix" type="lock" />
						</a-input-password>
					</a-form-item>
					<a-form-item :wrapper-col="{ span: 12, offset: 5 }" style="margin-bottom: 0;">
						<a-button type="primary" html-type="submit" size="large" block :loading="isTBLoading">
							登录
						</a-button>
					</a-form-item>
				</a-form>
			</div>
		</div>
		<!-- <a class="advlink" href="/#/AdvLogin">管理员登录</a> -->
		<a class="advlink" @click="LogIn()">管理员登录</a>
	</div>
</template>

<script>
	import request from '../utils/request.js'
	export default {
		data() {
			return {
				isTBLoading: false,
				form: this.$form.createForm(this, {
					name: 'loginform'
				}),
			};
		},
		methods: {
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log('Received values of form: ', values);
						this.isTBLoading = true;
						request({
							url: '/3/user/login',
							method: 'post',
							data: {
								account: values.account,
								password: values.password
							}
						}).then(res => {
							console.log("返回值"+JSON.stringify(res))
							console.log(res.result)
							if(res.message==='登录成功'){
								// this.$store.commit("setErp", values.account);
								// this.$store.commit("setMode", res.result);
								//console.log("res:"+res)
								sessionStorage.setItem('role',JSON.stringify(res.data.roleList[0]));//存入sessionSotrage
								sessionStorage.setItem('sysList',JSON.stringify(res.data.sysList));//存入sessionSotrage
								this.$store.commit("setSysList", res.data.sysList);
								this.$router.push('Home');
							}else{
								this.$error({
										title: '错误',
										content: res.message,
										centered: true,
									});
							}
							// if (res.result != null && res.result != "") {
							// 	if (res.result == "service error") {
							// 		this.$message.error('Service出现了某些错误！请联系管理员');
							// 	} else if (res.result == "notexist") {
							// 		this.$error({
							// 			title: '错误',
							// 			content: '账号或密码错误',
							// 			centered: true,
							// 		});
							// 	} else {
									
							// 	}
							// } else {
							// 	this.$message.error('网络开了会儿小差，请稍后再试！');
							// }
							this.isTBLoading = false;
						}).catch(error => {
							this.isTBLoading = false;
							this.$message.error('出现了某些错误！请联系管理员');
							console.log(error.response);
						})
					}
				});
			},
			LogIn(e) {
				sessionStorage.setItem('role','admin');//存入sessionSotrage
				sessionStorage.setItem('sysList','1,2,3');//存入sessionSotrage
				this.$store.commit("setSysList", '1,2,3');
				this.$router.push('Home');
			}
		}
	}
</script>

<style scoped>
	
	.logForm {
		background-color: white;
		padding-top: 35px;
		padding-left: 50px;
		padding-right: 50px;
		padding-bottom: 50px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2)
	}

	.loghead {
		background-color: #EE4B56;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding-top: 30px;
		padding-bottom: 30px;
		padding-left: 70px;
		padding-right: 70px;
	}

	.advlink {
		color: #adadb5;
		font-weight: bold;
		margin-top: 20px;
		transition: all 0.3s;
	}

	.advlink:hover {
		color: #EE4B56;
	}
</style>
