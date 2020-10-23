<template>
	<div class="">
		<div class="advSerhDiv">
			<a-row type="flex" justify="space-around">
				<a-col :span="4">
					<a-select show-search placeholder="选择行级" option-filter-prop="children" style="width: 200px" :filter-option="filterOption"
					 @change="onHJChange" size="large">
						<a-select-option v-for="(item,i) in HJData" :key="i" :value="item.hJ">
							{{ item.hJNAME }}
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="4">
					<a-select show-search placeholder="选择部门" option-filter-prop="children" style="width: 200px" :filter-option="filterOption"
					 @change="onDEPChange" size="large">
						<a-select-option v-for="(item,i) in DEPData" :key="i" :value="item">
							{{ item }}
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="4">
					<a-select show-search placeholder="选择团队" option-filter-prop="children" style="width: 200px" :filter-option="filterOption"
					 @change="onTeamChange" size="large">
						<a-select-option v-for="(item,i) in TEAMData" :key="i" :value="item">
							{{ item }}
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="12">
					<a-input-search placeholder="请输入要查询的员工姓名(可以为空)" size="large" @search="onSearch">
						<a-button slot="enterButton" type="primary" :loading="isBtnLoading">
							查询
						</a-button>
					</a-input-search>
				</a-col>
			</a-row>
		</div>
		<div class="advSerhDiv">
			<a-table :columns="columns" :data-source="tableData" rowKey="uID" :loading="isTBLoading" :customRow="customRow" @change="onTableChange">
				<a-tag slot="num" color="blue" slot-scope="text, record, index">
					{{ index + 1 + (paginationCurrent - 1) * 10 }}
				</a-tag>
				<div v-if="advancemode" slot="action" slot-scope="text, record, index">
					<a-popconfirm title="确定删除这条通讯信息吗?" ok-text="确定" ok-type="danger" cancel-text="再想想" @confirm="deleteItem(index + (paginationCurrent - 1) * 10)">
						<a-button type="danger">删除</a-button>
					</a-popconfirm>
					<a-button type="primary" @click="editItem(index + (paginationCurrent - 1) * 10)" style="margin-left: 20px;">编辑</a-button>
				</div>
				<div v-else slot="action">
					<a-tag color="#e2e2e2">
						没有权限
					</a-tag>
				</div>
			</a-table>
		</div>
		<a-modal :visible="isInfvisible" :maskClosable="true">
			<div>
				<div class="updateTitle">{{ anUserData.name }}</div>
				<a-divider />
				<p>所属：{{ anUserData.branch }}</p>
				<p>职务：{{ anUserData.position }}</p>
				<p>部门：{{ anUserData.department }}</p>
				<p>团队：{{ anUserData.team }}</p>
				<p>办公室电话：{{ anUserData.officeTel }}</p>
				<p>移动电话：{{ anUserData.mobileTel }}</p>
				<p>备用电话：{{ anUserData.backuptel }}</p>
				<p>邮箱：{{ anUserData.email }}</p>
			</div>
			<template slot="footer">
				<a-button type="primary" @click="handleOk">
					关闭
				</a-button>
			</template>
		</a-modal>
		<a-modal :visible="isUpdvisible" :maskClosable="false" :confirm-loading="confirmLoading" @ok="updateOk" @cancel="handleCancel"
		 cancelText="再想想" okText="更新" okType="danger">
			<div class="updateTitle">更新</div>
			<a-divider />
			<div class="updateForm">
				<a-form :form="form">
					<a-form-item v-bind="formItemLayout" label="姓名" hasFeedback>
						<a-input v-decorator="['name', { rules: [{ required: true, message: '姓名不能为空！', }]}]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="行级所属" has-feedback>
						<a-select show-search placeholder="选择行级" option-filter-prop="children" :filter-option="filterOption"
						 v-decorator="[ 'hj', { rules: [ { required: true, message: '请选择该人员所属的行级单位!' } ] } ]">
							<a-select-option v-for="(item,i) in HJData" :key="i" :value="item.hJ">
								{{ item.hJNAME }}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="职务" has-feedback>
						<a-input v-model="updateFormOthers.position" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="部门" has-feedback>
						<a-input v-decorator="[ 'department', { rules: [ { required: true, message: '部门不能为空!', } ], }, ]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="所属团队" hasFeedback>
						<a-input v-model="updateFormOthers.team" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="办公电话" has-feedback>
						<a-input v-model="updateFormOthers.officeTel" />
						</a-input>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="移动电话" hasFeedback>
						<a-input v-decorator="[ 'mobileTel', { rules: [ { required: true, message: '移动电话不能为空!' } ] } ]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="备用电话" has-feedback>
						<a-input v-model="updateFormOthers.backupTel" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="电子邮箱" hasFeedback>
						<a-input v-decorator="['email',{rules: [
								  {
								    type: 'email',
								    message: '请输入符合邮箱格式的地址!',
								  },{ required: true, message: '电子邮箱不能为空!' }] }
					        ]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="编制类型" has-feedback>
						<a-select v-decorator="[ 'kind', { rules: [{ required: true, message: '编制类型不能为空!' }],initialValue: updateFormOthers.kind }, ]">
							<a-select-option value="1">
								行编
							</a-select-option>
							<a-select-option value="0">
								厂商/外包
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-form>
			</div>
		</a-modal>
	</div>
</template>

<script>
	import request from '../utils/request.js'
	const columns = [
		{
			title: "序号",
			width: 70,
			scopedSlots: {
				customRender: 'num'
			}
		},
		{
			title: '所属',
			dataIndex: 'branch',
			key: 'branch'
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '职务',
			dataIndex: 'position',
			key: 'position'
		},
		{
			title: '部门',
			dataIndex: 'department',
			key: 'department'
		},
		{
			title: '所属团队',
			key: 'team',
			dataIndex: 'team'
		},
		{
			title: '办公电话',
			key: 'officeTel',
			dataIndex: 'officeTel'
		},
		{
			title: '移动电话',
			key: 'mobileTel',
			dataIndex: 'mobileTel'
		},
		{
			title: '电子邮箱',
			key: 'email',
			dataIndex: 'email'
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
				isBtnLoading: false,
				isTBLoading: false,
				valueHJ: 'All',
				valueDEP: '全部',
				valueTeam: '全部',
				tableData: [],
				HJData: [],
				DEPData: [],
				TEAMData: [],
				columns,
				advancemode: false,
				isInfvisible: false,
				isUpdvisible: false,
				anUserData: [],
				confirmLoading: false,
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
				},
				updateFormOthers: {
					position: '',
					team: '',
					officeTel: '',
					backupTel: '',
					kind: '0'
				}
			};
		},
		methods: {
			onHJChange(value) {
				this.valueHJ = value;
				//console.log("HJ:" + value);
			},
			onDEPChange(value) {
				this.valueDEP = value;
				//console.log("DEP:" + value);
			},
			onTeamChange(value) {
				this.valueTeam = value;
				//console.log("TEAM:" + value);
			},
			filterOption(input, option) {
				return (
					option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
				);
			},
			onSearch(value) {
				//console.log(value);
				this.isBtnLoading = true;
				this.isTBLoading = true;
				var NAME = value;
				var HJ = this.valueHJ;
				var DEP = this.valueDEP;
				var TEAM = this.valueTeam;
				request({
					url: '/AddressBackEnd/getArsByHDTN',
					method: 'post',
					/* data: {
						name
					}, */
					params: {
						HJ,
						DEP,
						TEAM,
						NAME
					}
				}).then(res => {
					//console.log(res.result)
					if (res.result == null || res.result == "") {
						/* 查询结果为空 */
					}
					this.tableData = res.result;
					this.isBtnLoading = false;
					this.isTBLoading = false;
				}).catch(error => {
					this.isBtnLoading = false;
					this.isTBLoading = false;
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			onTableChange(pagination, filters, sorter) {
				this.paginationCurrent = pagination.current;
			},
			customRow(record, index) {
				return {
					on: {
						click: (event) => {
							//console.log('event:', event);
							if (event.target.nodeName == 'TD') {
								this.isInfvisible = true;
								this.anUserData = this.tableData[index + (this.paginationCurrent - 1) * 10]
							}
						}
					}
				}
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
				let id = this.tableData[index].uID;
				//console.log("delete id:" + id);
				request({
					url: '/AddressBackEnd/deleteAnAddress',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {
					//console.log(res.result)
					if (res.result != null && res.result == "success") {
						this.$router.push("/Success");
					}
				}).catch(error => {
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			editItem(index) {
				this.isUpdvisible = true;
				this.id = this.tableData[index].uID;
				this.$nextTick(function() { //在下次 DOM 更新循环结束之后执行延迟回调
					this.form.setFieldsValue({
						name: this.tableData[index].name,
						hj: this.tableData[index].branch,
						department: this.tableData[index].department,
						mobileTel: this.tableData[index].mobileTel,
						email: this.tableData[index].email
					})
					this.updateFormOthers.kind = this.tableData[index].kind.toString();
				})
				this.updateFormOthers.position = this.tableData[index].position;
				this.updateFormOthers.team = this.tableData[index].team;
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
				url: '/3/AddressBackEnd/getAllHJAndDEPAndTeam',
				method: 'post',
				/* data: {
					name
				}, */
				params: {}
			}).then(res => {
				//console.log(res.result)
				if (res.result != null || res.result != "") {
					this.HJData = res.result.HJ;
					this.DEPData = res.result.DEP;
					this.TEAMData = res.result.TEAM;
				}
			}).catch(error => {
				this.$message.error('出现了某些错误！请联系管理员');
				console.log(error.response);
			})
		}
	};
</script>

<style scoped>
	.advSerhDiv {
		background-color: white;
		margin: 30px;
		border-radius: 25px;
		padding: 20px;
		text-align: left;
	}

	.adrDialog {
		width: 400px;
		height: 550px;
	}

	.updateTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}

	.updateForm {
		/* max-width: 300px; */
	}
</style>
