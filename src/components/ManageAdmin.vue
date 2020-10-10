<template>
	<div class="rootDiv">
		<div class="resultDiv">
			<a-table :columns="columns" :data-source="tableData" :loading="isTBLoading" @change="onTableChange">
				<a-tag slot="num" color="blue" slot-scope="text, record, index">
					{{ index + 1 + (paginationCurrent - 1) * 10 }}
				</a-tag>
				<div slot="action" slot-scope="text, record, index">
					<a-popconfirm title="确定删除这个管理员吗?" ok-text="确定" ok-type="danger" cancel-text="再想想" @confirm="deleteItem(index + (paginationCurrent - 1) * 10)">
						<a-button type="danger">删除</a-button>
					</a-popconfirm>
					<a-button type="primary" @click="editItem(index + (paginationCurrent - 1) * 10)" style="margin-left: 20px;">编辑</a-button>
				</div>
			</a-table>
		</div>
		<a-modal :visible="isUpdvisible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" style="adrDialog"
			:maskClosable="false" cancelText="再想想" okText="更新" okType="danger">
			<div class="updateTitle">更新</div>
			<a-divider />
			<div class="updateForm">
				<a-form :form="form">
					<a-form-item v-bind="formItemLayout" label="ERP" has-feedback>
						<a-input v-decorator="[ 'erp', 
							{ rules: [ { required: true, message: 'ERP号不能为空！', }, { len: 8, message: 'ERP号长度应为8位！' } ], },
						    ]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="密码" has-feedback>
						<a-input v-decorator="[ 'password', { rules: [ { required: true, message: '密码不能为空!', }, ], }, ]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="备注">
						<a-input v-model="remarks" />
					</a-form-item>
				</a-form>
			</div>
		</a-modal>
	</div>
</template>

<script>
	import request from '../utils/request.js'
	const columns = [{
			title: "序号",
			scopedSlots: {
				customRender: 'num'
			},
		},
		{
			title: 'ERP',
			dataIndex: 'eRP',
			key: 'eRP'
		},
		{
			title: '密码',
			dataIndex: 'pWD',
			key: 'pWD'
		},
		{
			title: '备注',
			dataIndex: 'remarks1',
			key: 'remarks1'
		},
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
				tableData: [],
				isTBLoading: true,
				isUpdvisible: false,
				id: 0,
				remarks: '',
				confirmLoading: false,
				columns,
				paginationCurrent: 1,
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
		methods: {
			onTableChange(pagination, filters, sorter) {
				this.paginationCurrent = pagination.current;
			},
			deleteItem(index) {
				//console.log('当前删除index:', index);
				var id = this.tableData[index].iD;
				request({
					url: '/AddressBackEnd/deleteAnAdmin',
					method: 'post',
					params: {
						id: id,
					}
				}).then(res => {
					console.log(res.result)
					if (res.result != null && res.result == "success") {
						this.$router.push("/Success");
					} else if (res.result == "fail") {
						this.$message.error('服务器出现了某些错误！请联系管理员');
					}
					this.isTBLoading = false;
				}).catch(error => {
					this.isTBLoading = false;
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			editItem(index) {
				this.isUpdvisible = true;
				this.id = this.tableData[index].iD;
				this.$nextTick(function(){//在下次 DOM 更新循环结束之后执行延迟回调
					this.form.setFieldsValue({
						erp: this.tableData[index].eRP,
						password: this.tableData[index].pWD
					})
				})
				this.remarks = this.tableData[index].remarks1;
			},
			handleOk(e) {
				console.log("ok => e:" + e);
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
			handleCancel(e) {
				console.log('Clicked cancel button');
				this.isUpdvisible = false;
			},
			postUpdate() {
				let values = this.form.getFieldsValue();
				request({
					url: '/AddressBackEnd/updateTheAdmin',
					method: 'post',
					/* data: {
						name
					}, */
					params: {
						id: this.id,
						erp: values.erp,
						password: values.password,
						remarks: this.remarks
					}
				}).then(res => {
					console.log(res.result)
					if (res.result != null && res.result == "success") {
						this.$router.push("/Success");
					} else if (res.result == "fail") {
						this.$message.error('服务器出现了某些错误！请联系管理员');
					}
					this.isUpdvisible = false;
				}).catch(error => {
					this.isUpdvisible = false;
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'updateAdmin'
			});
		},
		created() {
			request({
				url: '/AddressBackEnd/getAllAdmin',
				method: 'post',
				/* data: {
					name
				}, */
				params: {}
			}).then(res => {
				//console.log(res.result)
				if (res.result == null || res.result == "") {
					/* 查询结果为空 */
				}
				this.tableData = res.result;
				this.isTBLoading = false;
			}).catch(error => {
				this.isTBLoading = false;
				this.$message.error('出现了某些错误！请联系管理员');
				console.log(error.response);
			})
		}
	};
</script>

<style scoped>
	.addTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}

	.rootDiv {
		background-color: white;
		border-radius: 25px;
		margin: 30px;
		padding: 25px;
	}

	.updateTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}

	.updateForm {
		max-width: 300px;
	}
</style>
