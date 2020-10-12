<template>
	<div style="height: 100%;display: flex;flex-direction: column;">
		<div class="logForm">
<<<<<<< HEAD
<<<<<<< HEAD
			永远永远<img src="../assets/banner.png" style="height: 80px;" />
=======
			<img src="../assets/banner.png" style="height: 80px;" />
>>>>>>> 435346d0be7a43688fe2a58f2469079897e7b260
			<a-b <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 24}" @submit="handleSubmit" style="margin-top: 50px;">
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
			<!-- <img src="../assets/banner.png" style="height: 90px;" />
			<img src="../assets/hello.png" style="height: 60px;margin-bottom: 15px;" />
			<a-button type="primary" @click="LogIn()" size="large" block>
				进入
			</a-button> -->
		</div>
		<a class="advlink" href="/#/AdvLogin">管理员登录</a>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
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
						//this.isTBLoading = true;
						this.$store.commit("setMode", "A");
						this.$router.push('Home');
						/* request({
							url: '/AddressBackEnd/checkLogin',
							method: 'post',
							params: {
								erp: values.account,
								password: values.password
							}
						}).then(res => {
							console.log(res.result)
							if (res.result != null && res.result != "") {
								if (res.result == "service error") {
									this.$message.error('Service出现了某些错误！请联系管理员');
								} else if (res.result == "notexist") {
									this.$error({
										title: '错误',
										content: '账号或密码错误',
										centered: true,
									});
								} else {
									this.$store.commit("setErp", values.account);
									this.$store.commit("setMode", res.result);
									this.$router.push('Home');
								}
							} else {
								this.$message.error('网络开了会儿小差，请稍后再试！');
							}
							this.isTBLoading = false;
						}).catch(error => {
							this.isTBLoading = false;
							this.$message.error('出现了某些错误！请联系管理员');
							console.log(error.response);
						}) */
					}
				});
			},
			/* LogIn(e) {
				this.$store.commit("setMode", "C");
				this.$router.push('Home');
			}, */
			LogIn(e) {
				this.$store.commit("setMode", "C");
				this.$router.push('Home');
			},
		}
	}
</script>

<style scoped>
	.logForm {
		position: relative;
		margin: 0 auto;
		margin-top: 170px;
		padding-top: 35px;
		padding-left: 50px;
		padding-right: 50px;
		padding-bottom: 50px;
		border-radius: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2)
	}

	.advlink {
		color: #adadb5;
		font-weight: bold;
		margin-top: 20px;
		transition: all 0.3s;
	}

	.advlink:hover {
		color: #1890ff;
	}
</style>
