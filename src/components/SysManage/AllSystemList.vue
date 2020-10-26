<template>
	<div class="rootDiv" style="width: auto;overflow-x: scroll;">
		<div class="searchDiv" style="text-align: right;width: 100%; ">
			<a-form :form="form" style="display: inline-block;">
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="width:150px;display: inline-block;">
					<a-input v-model="sdata.primary_App_Sys_Name" placeholder="一级系统名称" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="width:150px;display: inline-block;">
					<a-input v-model="sdata.secondary_App_Sys_Name" placeholder="应用系统名称二级" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="width:150px;display: inline-block;">
					<a-input v-model="sdata.channel_Code" placeholder="渠道码" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="width:150px;display: inline-block;">
					<a-input v-model="sdata.affiliation" placeholder="归属机构" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="display: inline-block;">
					<a-button type="primary" @click="searchDataSubmit()" style="margin-left: 6px;">搜索</a-button>
				</a-form-item>
			</a-form>
		</div>
		<div class="resultDiv" style="width: auto;overflow-x: auto;">
			<a-table :columns="columns" :data-source="tableData" :loading="isTBLoading" @change="onTableChange" style="margin: 0;padding: 0;"
			 :scroll="{ x: 2500 }">
				<a-tag slot="num" color="blue" slot-scope="text, record, index">
					{{ index + 1 + (paginationCurrent - 1) * 10 }}
				</a-tag>
				<div slot="action" slot-scope="text, record, index">
					<a-button @click="showDetail(index + (paginationCurrent - 1) * 10)" style="margin-left: 6px;">详情</a-button>
					<a-dropdown style="margin-left: 0;">
						<a-menu slot="overlay">
							<a-menu-item key="1" @click="showInterface(index + (paginationCurrent - 1) * 10)">
								接口
							</a-menu-item>
							<a-menu-item key="2" @click="editItem(index + (paginationCurrent - 1) * 10)">
								编辑
							</a-menu-item>
							<a-menu-item key="3" style="color: red;" @click="DeletAlert(index)">
								删除
							</a-menu-item>
						</a-menu>
						<a-button> 操作
							<a-icon type="down" />
						</a-button>
					</a-dropdown>
				</div>
			</a-table>
		</div>
		<a-modal title="Title" :visible="isDelVisible" :confirm-loading="confirmLoading" @ok="deleteItem(index + (paginationCurrent - 1) * 10)"
		 @cancel="handleCancel">
			<p>是否删除</p>
		</a-modal>
		<a-modal :visible="isUpdvisible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" style="adrDialog"
		 :maskClosable="false" cancelText="再想想" okText="更新" okType="danger" width="1020px">
			<div class="updateTitle">更新</div>
			<a-divider />
			<div class="updateForm" style="height: 400px;overflow-y: scroll;width: 100%;max-width: 1020px;text-align: center;">
				<a-form :form="form">
					<a-form-item v-bind="formItemLayout" label="系统自增序号" has-feedback>
						<a-input v-decorator="[
								  'sysId',
								  {
									rules: [
									  {
										required: true,
										message: '系统自增序号不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="系统类别" has-feedback>
						<a-input v-decorator="[
								  'sysCategory',
								  {
									rules: [
									  {
										required: true,
										message: '系统类别不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="一级系统名称" has-feedback>
						<a-input v-decorator="[
								  'primaryAppSysName',
								  {
									rules: [
									  {
										required: true,
										message: '一级系统名称不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="一级系统简称" has-feedback>
						<a-input v-decorator="[
								  'primarySysAbb',
								  {
									rules: [
									  {
										required: true,
										message: '一级系统简称不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="系统层级" has-feedback>
						<a-input v-decorator="[
								  'sysClass',
								  {
									rules: [
									  {
										required: true,
										message: '系统层级不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="能力域" has-feedback>
						<a-input v-decorator="[
								  'domain',
								  {
									rules: [
									  {
										required: true,
										message: '能力域不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="一级系统唯一标识" has-feedback>
						<a-input v-decorator="[
								  'primarySysId',
								  {
									rules: [
									  {
										required: true,
										message: '一级系统唯一标识不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="应用系统名称(二级)" has-feedback>
						<a-input v-decorator="[
								  'secondaryAppSysName',
								  {
									rules: [
									  {
										required: true,
										message: '应用系统名称(二级)不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="二级系统简称" has-feedback>
						<a-input v-decorator="[
								  'secondarySysAbb',
								  {
									rules: [
									  {
										required: true,
										message: '二级系统简称不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="二级系统唯一标识" has-feedback>
						<a-input v-decorator="[
								  'secondarySysId',
								  {
									rules: [
									  {
										required: true,
										message: '二级系统唯一标识不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="渠道码" has-feedback>
						<a-input v-decorator="[
								  'channelCode',
								  {
									rules: [
									  {
										required: true,
										message: '渠道码不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="运行状态" has-feedback>
						<a-input v-decorator="[
								  'runStatus',
								  {
									rules: [
									  {
										required: true,
										message: '运行状态不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="归属机构" has-feedback>
						<a-input v-decorator="[
								  'affiliation',
								  {
									rules: [
									  {
										required: true,
										message: '归属机构不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="系统主管单位" has-feedback>
						<a-input v-decorator="[
								  'sysSupervisor',
								  {
									rules: [
									  {
										required: true,
										message: '系统主管单位不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="运维组别" has-feedback>
						<a-input v-decorator="[
								  'opsGroup',
								  {
									rules: [
									  {
										required: true,
										message: '运维组别不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="厂商" has-feedback>
						<a-input v-decorator="[
								  'serviceProvider',
								  {
									rules: [
									  {
										required: true,
										message: '厂商不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="系统功能简述" has-feedback>
						<a-input v-decorator="[
								  'sysFuncDes',
								  {
									rules: [
									  {
										required: true,
										message: '系统功能简述不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="上线时间" has-feedback>
						<a-input v-decorator="[
								  'onlineTime',
								  {
									rules: [
									  {
										required: true,
										message: '上线时间不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="项目组织实时单位" has-feedback>
						<a-input v-decorator="[
								  'implDep',
								  {
									rules: [
									  {
										required: true,
										message: '项目组织实时单位不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="使用范围" has-feedback>
						<a-input v-decorator="[
								  'useRange',
								  {
									rules: [
									  {
										required: true,
										message: '使用范围不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="服务对象" has-feedback>
						<a-input v-decorator="[
								  'serviceUser',
								  {
									rules: [
									  {
										required: true,
										message: '服务对象不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="服务时间" has-feedback>
						<a-input v-decorator="[
								  'serviceTime',
								  {
									rules: [
									  {
										required: true,
										message: '服务时间不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="备注" has-feedback>
						<a-input v-decorator="[
								  'remark1',
								  {
									rules: [
									  {
										required: true,
										message: '备注不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="系统开发语言" has-feedback>
						<a-input v-decorator="[
								  'devLanguage',
								  {
									rules: [
									  {
										required: true,
										message: '系统开发语言不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="重要系统分级" has-feedback>
						<a-input v-decorator="[
								  'sysImportance',
								  {
									rules: [
									  {
										required: true,
										message: '重要系统分级不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="系统级别" has-feedback>
						<a-input v-decorator="[
								  'sysLevel',
								  {
									rules: [
									  {
										required: true,
										message: '系统级别不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="监控级别" has-feedback>
						<a-input v-decorator="[
								  'montiorLevel',
								  {
									rules: [
									  {
										required: true,
										message: '监控级别不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="外联机构" has-feedback>
						<a-input v-decorator="[
								  'outreach',
								  {
									rules: [
									  {
										required: true,
										message: '外联机构不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="是否服务提供方" has-feedback>
						<a-input v-decorator="[
								  'ifServiceProvider',
								  {
									rules: [
									  {
										required: true,
										message: '是否服务提供方不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="是否服务消费方" has-feedback>
						<a-input v-decorator="[
								  'ifServiceConsumer',
								  {
									rules: [
									  {
										required: true,
										message: '是否服务消费方不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="备用1" has-feedback>
						<a-input v-decorator="[
								  'spare1',
								  {
									rules: [
									  {
										required: true,
										message: '备用1不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="备用2" has-feedback>
						<a-input v-decorator="[
								  'spare2',
								  {
									rules: [
									  {
										required: true,
										message: '备用2不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="备用3" has-feedback>
						<a-input v-decorator="[
								  'spare3',
								  {
									rules: [
									  {
										required: true,
										message: '备用3不能为空！',
									  }
									],
								  },
								]" />
					</a-form-item>
				</a-form>
			</div>
		</a-modal>
	</div>
</template>
<script>
	import request from '../../utils/request.js';

	const formItemLayout = {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 6
		},
	};
	const formTailLayout = {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 11,
			offset: 1
		},
	};
	const columns = [{
			title: "编号",
			scopedSlots: {
				customRender: 'num'
			},
			align: 'center',
			fixed: 'left'
		},
		{
			title: '应用系统名称(一级)',
			dataIndex: 'primaryAppSysName',
			key: 'primaryAppSysName',
			align: 'center',
			fixed: 'left'
		},
		{
			title: '应用系统名称(二级)',
			dataIndex: 'secondaryAppSysName',
			key: 'secondaryAppSysName',
			align: 'center',
			fixed: 'left'
		},

		{
			title: '系统类别',
			dataIndex: 'sysCategory',
			key: 'sysCategory',
			align: 'center'
		},
		{
			title: '系统层级',
			dataIndex: 'sysClass',
			key: 'sysClass',

			align: 'center'
		},
		{
			title: '渠道码',
			dataIndex: 'channelCode',
			key: 'channelCode',
			align: 'center'

		},
		{
			title: '运行状态',
			dataIndex: 'runStatus',
			key: 'runStatus',
			align: 'center'
		},
		{
			title: '归属机构',
			dataIndex: 'affiliation',
			key: 'affiliation',
			align: 'center'
		},
		{
			title: '系统主管单位',
			dataIndex: 'sysSupervisor',
			key: 'sysSupervisor',
			align: 'center'
		},
		{
			title: '运维组别',
			dataIndex: 'opsGroup',
			key: 'opsGroup',
			align: 'center'
		},
		{
			title: '厂商',
			dataIndex: 'serviceProvider',
			key: 'serviceProvider',
			align: 'center'
		},
		{
			title: '重要系统分级',
			dataIndex: 'sysImportance',
			key: 'sysImportance',
			align: 'center'
		},
		{
			title: '系统级别',
			dataIndex: 'sysLevel',
			key: 'sysLevel',
			align: 'center'
		},
		{
			title: '服务提供方',
			dataIndex: 'ifServiceProvider',
			key: 'ifServiceProvider',
			align: 'center'
		},
		{
			title: '服务消费方',
			dataIndex: 'ifServiceConsumer',
			key: 'ifServiceConsumer',
			align: 'center'
		},
		{
			ttitle: '操作',
			width: 200,
			fixed: 'right',
			scopedSlots: {
				customRender: 'action'
			},

		}
	];
	export default {

		data() {
			return { //execl导出设置
				json_fields: {
					'系统序号': 'sysId',
					'系统类别': 'sysCategory',
					'一级系统名称': 'primaryAppSysName',
					'一级系统简称': 'primarySysAbb',
					'系统层级': 'sysClass',
					'能力域': 'domain',
					'一级系统唯一标识': 'primarySysId',
					'应用系统名称(二级)': 'secondaryAppSysName',
					'二级系统简称': 'secondarySysAbb',
					'二级系统唯一标识': 'secondarySysId',
					'渠道码': 'channelCode',
					'运行状态': 'runStatus',
					'归属机构': 'affiliation',
					'系统主管单位': 'sysSupervisor',
					'运维组别': 'opsGroup',
					'厂商': 'serviceProvider',
					'系统功能简述': 'sysFuncDes',
					'上线时间': 'onlineTime',
					'项目组织实时单位': 'implDep',
					'使用范围': 'useRange',
					'服务对象': 'serviceUser',
					'服务时间': 'serviceTime',
					'备注': 'remark1',
					'系统开发语言': 'devLanguage',
					'重要系统分级': 'sysImportance',
					'系统级别': 'sysLevel',
					'监控级别': 'montiorLevel',
					'外联机构': 'outreach',
					'是否服务提供方': 'ifServiceProvider',
					'是否服务消费方': 'ifServiceConsumer',
					'备用1': 'spare1',
					'备用2': 'spare2',
					'备用3': 'spare3'
				},
				json_data: [],
				json_meta: [
					[{
						" key ": " charset ",
						" value ": " utf- 8 "
					}]
				],
				tableData: [],
				formData: [], //文件上传
				mydata: {},
				sdata: {
					primary_App_Sys_Name: null,
					secondary_App_Sys_Name: null,
					channel_Code: null,
					affiliation: null
				},
				isTBLoading: true,
				isUpdvisible: false,
				isDelVisible: false,
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
		inject: ['reload'],
		methods: {

			onTableChange(pagination, filters, sorter) {
				this.paginationCurrent = pagination.current;
			},
			handleFileChange(e) {
				let that = this;
				this.$message.success("数据库已经成功导入，审核通过以后才能显示");
				let inputDOM = this.$refs.inputer;
				this.file = inputDOM.files[0]; // 通过DOM取文件数据
				let size = Math.floor(this.file.size / 1024); //计算文件的大小　
				this.formData = new FormData(); //new一个formData事件
				this.formData.append("file", this.file); //将file属性添加到formData里
				//此时formData就是我们要向后台传的参数了
				request({
					url: "/uploadFile",
					data: that.formData, //在此处上传文件
					method: "post",
					headers: {
						'Content-Type': 'multipart/form-data' //值得注意的是，这个地方一定要把请求头更改一下
					}
				}).then(function(res) {
					this.$message.success("导入成功数据：" + res.data.length);
					this.$router.push("/Success");
					console.log(res, "此处应该是请求成功的回调")
				}).catch(function(req) {
					console.log(req, "请求失败的回调，Execl文件格式是否合法")
				})
			},
			deleteItem(index) {
				//console.log('当前删除index:', index);
				var sysId = this.tableData[index].sysId;
				request({
					url: '/2/deleteSystem',
					method: 'get',
					params: {
						sysId: sysId,
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
			DeletAlert(index) {
				let that = this;
				this.$confirm({
					title: '你确定删除吗?',
					onOk() {
						console.log(index);
						that.deleteItem(index);
						that.reload();
					},
					onCancel() {},
				});
			},
			editItem(index) {

				var that = this;
				let sysId = this.tableData[index].sysId;
				this.$router.push({
					name: 'SystemUpdate',
					params: {
						sysId: sysId
					}
				});
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
			showDetail(index) {
				var that = this;
				let sysId = this.tableData[index].sysId;
				this.$router.push({
					name: 'SystemDetail',
					params: {
						sysId: sysId
					}
				});
			},
			showInterface(index) {
				alert("此功能未实现,没有接口表");
				/* var that = this;
				let sysId = this.tableData[index].sysId;
				this.$router.push({
					name: 'SystemfaceList',
					params: {
						sysId: sysId
					}
				}); */
			},
			postUpdate() {
				let that = this;
				let values = this.form.getFieldsValue();
				request({
					url: '/2/updateSystem',
					method: 'post',
					/* data: {
						name
					}, */
					params: this.mydata
				}).then(res => {
					console.log(res.result)
					if (res.result != null && res.result == "success") {
						this.$router.push("/Success");
						that.loadData();
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
			loadData() {
				request({
					url: '/2/findAllSystem',
					method: 'get',
					/* data: {
						name
					}, */
					params: this.sdata
				}).then(res => {
					this.tableData = res;
					//console.log(this.tableData);
					this.json_data = this.tableData;
					this.mydata = this.tableData[0];
					this.isTBLoading = false;
				}).catch(error => {
					this.isTBLoading = false;
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			searchDataSubmit() {
				request({
					url: '/2/combSearch',
					method: 'get',
					/* data: {
						name
					}, */
					params: this.sdata
				}).then(res => {
					this.tableData = res;
				}).catch(error => {
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
			this.loadData();
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

	.ant-modal {
		width: 1024px;
	}

	.ant-modal-content {
		width: 1000px;
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
