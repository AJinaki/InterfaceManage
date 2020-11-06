<template>
	<div class="addDiv">
		<div class="addTitle">添加新的管理员</div>
		<a-divider />
		<div class="addForm">
			<a-form :form="form" @submit="onSubmit">
				<a-form-item v-bind="formItemLayout" label="ERP" has-feedback>
					<a-input v-decorator="[
					          'erp',
					          {
					            rules: [
					              {
					                required: true,
					                message: 'ERP号不能为空！',
					              },{len: 8, message: 'ERP号长度应为8位！'}
					            ],
					          },
					        ]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="密码" has-feedback>
					<a-input v-decorator="[
					          'password',
					          {
					            rules: [
					              {
					                required: true,
					                message: '密码不能为空!',
					              }
					            ],
					          },
					        ]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="备注">
					<a-input v-model="remarks" />
				</a-form-item>
				<a-button type="danger" html-type="reset" size="large" style="width: 100px;">
					重置
				</a-button>
				<a-button type="primary" html-type="submit" size="large" style="width: 100px;margin-left: 40px;">
					添加
				</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script>
	import request from '../utils/request.js'
	export default {
		data() {
			return {
				confirmDirty: false,
				remarks: '',
				formItemLayout: {
					labelCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 4
						},
					},
					wrapperCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 20
						},
					},
				}
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'addAdmin'
			});
		},
		methods: {
			onSubmit(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						var remarks = this.remarks;
						console.log('Received values of form: ', values);
						request({
							url: '/AddressBackEnd/insertAdmin',
							method: 'post',
							/* data: {
								name
							}, */
							params: {
								erp: values.erp,
								password: values.password,
								remarks: remarks
							}
						}).then(res => {
							console.log(res.result)
							if (res.result == null || res.result == "") {
								/* 查询结果为空 */
							}
							this.isSpinning = false;
							this.$router.push("/Success");
						}).catch(error => {
							this.isTBLoading = false;
							this.$message.error('出现了某些错误！请联系管理员');
							console.log(error.response);
						})
					}
				});
			},
			/* compareToFirstPassword(rule, value, callback) {
			  const form = this.form;
			  if (value && value !== form.getFieldValue('password')) {
			    callback('两次输入的密码不一致!');
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
			} */
		},
	};
</script>

<style scoped>
	.addTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}

	.addDiv {
		background-color: white;
		border-radius: 25px;
		margin: 30px;
		padding: 25px;
	}
	
	.addForm{
		max-width: 400px;
	}
</style>
