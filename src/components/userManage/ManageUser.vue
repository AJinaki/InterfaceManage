<template>
	<div class="rootDiv">
		<div class="headdiv">
			<b style="font-size: 35px">用户管理</b>
		</div>
		<div class="headdiv1">
			<a-button type="primary" html-type="reset" size="large" style="width: 100px" @click="addUser"> 
					新增用户
			</a-button>
		</div>
		<div class="resultDiv">
			<a-table :columns="columns" :data-source="tableData" :loading="isTBLoading" @change="onTableChange" >
				<a-tag slot="num" color="blue" slot-scope="text, record, index">
					{{ index + 1 + (paginationCurrent - 1) * 10 }}
				</a-tag>
				<div slot="action" slot-scope="text, record, index">
					<a-popconfirm title="确定删除这个用户吗?" ok-text="确定" ok-type="danger" cancel-text="再想想" @confirm="deleteItem(index + (paginationCurrent - 1) * 10)">
						<a-button type="danger">删除</a-button>
					</a-popconfirm>
					<a-button type="primary" @click="editItem(index + (paginationCurrent - 1) * 10)" style="margin-left: 20px;">编辑</a-button>
				</div>
			</a-table>
		</div>
		<a-modal :visible="isUpdvisible" :maskClosable="false" :confirm-loading="confirmLoading" @ok="updateOk" @cancel="handleCancel"
		 cancelText="再想想" okText="更新" okType="danger">
			<div class="updateTitle">更新</div>
			<a-divider />
			<div class="updateForm">
				<a-form :form="form" @submit="onSubmit" :style="{width:'300px'}">
					<a-form-item v-bind="formItemLayout" label="姓名" has-feedback>
						<a-input v-decorator="[
						          'name',
						          {
						            rules: [
						              {
						                required: true,
						                message: '账号不能为空！',
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
					<a-form-item v-bind="formItemLayout" label="用户类型" has-feedback>
						<a-select default-value="lucy" @change="handleChange">
							<a-select-option value="0">
								领导
							</a-select-option>
							<a-select-option value="1">
								架构师
							</a-select-option>
							<a-select-option value="2" >
								项目经理
							</a-select-option>
							<a-select-option value="admin">
								超级管理员
							</a-select-option>
							<a-select-option value="3">
								测试人员
							</a-select-option>
							<a-select-option value="4">
								开发人员
							</a-select-option>
							<a-select-option value="5">
								运维人员
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-form>
			</div>
		</a-modal>
		<!-- <a-modal :visible="isAddvisible" :maskClosable="false" :confirm-loading="confirmLoading" @ok="updateOk" @cancel="handleCancel"
		 cancelText="再想想" okText="新增" okType="danger">
			<div class="updateTitle">新增</div>
			<a-divider />
			<div class="updateForm">
				<a-form :form="form" @submit="onSubmit">
					<a-form-item v-bind="formItemLayout" label="姓名" has-feedback>
						<a-input v-decorator="[
						          'name',
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
					<a-form-item v-bind="formItemLayout" label="用户类型" has-feedback>
						<a-select default-value="lucy" style="width: 120px" @change="handleChange">
							<a-select-option value="0">
								领导
							</a-select-option>
							<a-select-option value="1">
								架构师
							</a-select-option>
							<a-select-option value="2" >
								项目经理
							</a-select-option>
							<a-select-option value="admin">
								超级管理员
							</a-select-option>
							<a-select-option value="3">
								测试人员
							</a-select-option>
							<a-select-option value="4">
								开发人员
							</a-select-option>
							<a-select-option value="5">
								运维人员
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-form>
			</div>
		</a-modal> -->
	</div>
</template>

<script>
	import request from '../../utils/request.js'
	const columns = [
		{
			title: "序号",
			width: 70,
			scopedSlots: {
				customRender: 'num'
			}
		},
		{
			title: '姓名',
			dataIndex: 'account',
			key: 'account'
		},
		{
			title: '密码',
			dataIndex: 'password',
			key: 'password'
		},
		{
			title: '用户级别',
			dataIndex: 'userType',
			key: 'userType',
		},
		// {
		// 	title: '负责系统',
		// 	key: 'system_list',
		// 	dataIndex: 'system_list'
		// },
		{
			title: '操作',
			width: 200,
			scopedSlots: {
				customRender: 'action'
			},
		}
	];
	export default {
		data() {
			return {
				isBtnLoading: false,
				isTBLoading: false,
				tableData: [],
				columns,
				advancemode: false,
				isInfvisible: false,
				isUpdvisible: false,
				isAddvisible: false,
				anUserData: [],
				confirmLoading: false,
				paginationCurrent: 1,
				formItemLayout: {
					labelCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 5
						},
					},
					wrapperCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 21
						},
					},
				}
			};
		},
		methods: {
			addUser(){
			this.$router.push('/AddUser')
		},
			onSubmit(){},
			handleChange(){},
			filterOption(input, option) {
				return (
					option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
				);
			},
			onTableChange(pagination, filters, sorter) {
				this.paginationCurrent = pagination.current;
			},
			handleOk(e) {
				this.confirmLoading = true;
				/* setTimeout(() => {
				}, 2000); */
				this.isInfvisible = false;
				this.confirmLoading = false;
			},
			handleCancel(e) {
				this.isInfvisible = false;
				this.isUpdvisible = false;
			},
			deleteItem(index) {
				let id = this.tableData[index].userId;
				//console.log("delete id:" + id);
				request({
					url: '/3/user/delete/'+id,
					method: 'post',
					// params: {
					// 	id: id
					// }
				}).then(res => {
					//console.log(res.result)

					if (res.data=== "删除成功") {
						this.$router.push("/Success");
					}else{
					this.$message.error(res.message);
						
					}
				}).catch(error => {

					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			editItem(index) {
				this.$router.push({path:'/AddUser',query:this.tableData[index]})
				console.log(this.tableData[index])
				// this.isUpdvisible = true;
				// this.id = this.tableData[index].uID;
				// this.$nextTick(function() { //在下次 DOM 更新循环结束之后执行延迟回调
				// 	this.form.setFieldsValue({
				// 		name: this.tableData[index].name,
				// 		hj: this.tableData[index].branch,
				// 		department: this.tableData[index].department,
				// 		mobileTel: this.tableData[index].mobileTel,
				// 		email: this.tableData[index].email
				// 	})
				// 	// this.updateFormOthers.kind = this.tableData[index].kind.toString();
				// })
				// // this.updateFormOthers.position = this.tableData[index].position;
				// this.updateFormOthers.team = this.tableData[index].team || '';
				// this.updateFormOthers.officeTel = this.tableData[index].officeTel;
				// this.updateFormOthers.backupTel = this.tableData[index].backupTel;
			},
			addItem(index) {
				this.isAddvisible = true;
				this.id = this.tableData[index].uID;
				this.$nextTick(function() { //在下次 DOM 更新循环结束之后执行延迟回调
					this.form.setFieldsValue({
						name: this.tableData[index].name,
						hj: this.tableData[index].branch,
						department: this.tableData[index].department,
						mobileTel: this.tableData[index].mobileTel,
						email: this.tableData[index].email
					})
					// this.updateFormOthers.kind = this.tableData[index].kind.toString();
				})
				// this.updateFormOthers.position = this.tableData[index].position;
				this.updateFormOthers.team = this.tableData[index].team || '';
				this.updateFormOthers.officeTel = this.tableData[index].officeTel;
				this.updateFormOthers.backupTel = this.tableData[index].backupTel;
			},
			updateOk() {
				//console.log("now kind:", this.updateFormOthers.kind);
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						this.confirmLoading = true;
						let id = this.id;
						let values = this.form.getFieldsValue();
						let others = this.updateFormOthers;
						request({
							url: '/AddressBackEnd/updateTheAddress',
							method: 'post',
							/* data: {
								name
							}, */
							params: {
								id: id,
								name: values.name,
								hj: values.hj,
								position: others.position,
								department: values.department,
								team: others.team,
								officeTel: others.officeTel,
								mobileTel: values.mobileTel,
								backupTel: others.backupTel,
								email: values.email,
								kind: values.kind,
							}
						}).then(res => {
							console.log(res)
							this.confirmLoading = false;
							var that = this;
							if (res.result != null && res.result == "success") {
								this.$success({
									title: '成功',
									content: '通讯信息更新成功！',
									okText: '好的',
									centered: true,
									onOk() {
										that.isUpdvisible = false;
										return false;
									}
								})
							} else {
								this.$error({
									title: '失败',
									content: '出现了一些错误！',
									okText: '知晓',
									centered: true,
									onOk() {
										return new Promise((resolve, reject) => {
											resolve();
										}).catch(() => console.log('Oops errors!'));
									}
								})
							}
						}).catch(error => {
							this.$message.error('出现了某些错误！请联系管理员');
							console.log(error.response);
						})
					}
				})
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'updateAddress'
			});
		},
		
		created() {
			//console.log("mode: " + this.$store.state.mode);
			if (this.$store.state.mode != "C") {
				this.advancemode = true;
			}
			request({
				url: '/3/user/findAll/0',
				method: 'get',
				/* data: {
					name
				}, */
				params: {}
			}).then(res => {
				console.log(res)
				if (res != null || res != "") {
					res.forEach(element => {
						switch(element.userType){
							case '0':
								element.userType='领导';
								break;
							case '1':
								element.userType='架构师';
								break;
							case '2':
								element.userType='项目经理';
								break;
							case 'admin':
								element.userType='超级管理员';
								break;
							case '3':
								element.userType='测试人员';
								break;
							case '4':
								element.userType='开发人员';
								break;
							case '5':
								element.userType='运维人员';
								break;

						}
					});
					this.tableData = res;
				}
			}).catch(error => {
				this.$message.error('出现了某些错误！请联系管理员');
				console.log(error.response);
			})
		}
	};
</script>

<style scoped>
	.rootDiv{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.ant-row .ant-form-item{
		width:300px;
	}
	.headdiv {
		background-color: white;
		height: 80px;
		margin-left: 30px;
		margin-right: 30px;
		padding: 10px;
		border-bottom-left-radius: 25px;
		border-bottom-right-radius: 25px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.headdiv1{
		display:block;
		text-align:left!important;
		margin-left:80px;
		width:100%;
	}
	.resultDiv {
		background-color: white;
		border-radius: 25px;
		margin: 30px;
		padding: 25px;
	}
	
	.addTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}
	
	.updateTitle {
		font-size: 35px;
		text-align: center;
		margin-bottom: 20px;
		margin-left: 20px;
	}
	
	.updateForm {
		max-width: 300px;
	}
</style>
