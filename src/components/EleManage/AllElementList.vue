<template>
	<div class="rootDiv" style="width: auto;overflow-x: scroll;">
		<!-- 导入导出及查询功能 -->
		<div class="searchDiv" style="text-align: right;width: 100%; ">
			<a-form :form="form" style="display: inline-block;">
				<a-form-item v-bind="formItemLayout" style="width:150px;display: inline-block;">
					<a-button type="primary" @click="showDrawer" style="width:120px;display: inline-block;margin-right: 20px;" size="large">
						导入/导出
					</a-button>
				</a-form-item>
				<a-drawer title="导入导出" placement="right" :width="720" :closable="false" :visible="drawerVisibe" @close="onClose">
					<p>导入</p>
					<a-form-item v-bind="formItemLayout" style="width:250px;display: inline-block;">
						<input type="file" id="fileExport" @change="handleFileChange" ref="inputer">
					</a-form-item>
					<!-- <p>导入子表</p>
					<a-form-item v-bind="formItemLayout" style="width:250px;display: inline-block;">
						<input type="file" id="fileExport2" @change="handleFileChange2" ref="inputer2">
					</a-form-item> -->
					<p>导出</p>
					<a-form-item v-bind="formItemLayout" style="width:120px;display: inline-block;margin-right: 20px;">
						<download-excel style="display: inline-block;" class="export-excel-wrapper" :data="json_data" :fields="json_fields"
						 name="系统信息导出.xls">
							<a-button type="primary" size="large">导出至EXCEL</a-button>
						</download-excel>
					</a-form-item>
					<!-- <p>导出子表</p>
					<a-form-item v-bind="formItemLayout" style="width:120px;display: inline-block;margin-right: 20px;">
						<download-excel style="display: inline-block;" class="export-excel-wrapper" :data="json_data2" :fields="json_fields2"
						 name="系统信息子表导出.xls">
							<a-button type="primary" size="large">导出子表EXCEL</a-button>
						</download-excel>
					</a-form-item> -->
					<div :style="{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        zIndex: 1,
                      }">

						<a-button :style="{ marginRight: '8px' }" @click="onClose">
							Cancel
						</a-button>

					</div>
				</a-drawer>
				<!-- 查询条件 -->
				<a-form-item v-bind="formItemLayout" style="width:200px;display: inline-block;">
					<a-input v-model="sdata.serviceCode" placeholder="服务元素代码" size="large" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="width:200px;display: inline-block;">
					<a-input v-model="sdata.serviceCnName" placeholder="服务中文名称" size="large" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="width:150px;display: inline-block;">
					<a-input v-model="sdata.serviceEnName" placeholder="服务英文名称" size="large" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="width:150px;display: inline-block;">
					<a-input v-model="sdata.systemId" placeholder="所属系统" size="large" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" style="display: inline-block;">
					<a-button type="primary" @click="searchDataSubmit()" style="width: 100px;margin-left: 6px;" size="large">搜索</a-button>
				</a-form-item>
			</a-form>
		</div>

		<!-- 表格呈现 -->
		<div class="resultDiv" style="width: auto;overflow-x: auto;">
			<a-table :columns="columns" :data-source="tableData" :loading="isTBLoading" @change="onTableChange" style="margin: 0;padding: 0;word-break: break-all;"
			 :scroll="{ x: 4750 }" bordered>
				<a-tag slot="num" color="blue" slot-scope="text, record, index">
					{{ index + 1 + (paginationCurrent - 1) * 10 }}
				</a-tag>
				<div slot="actioninparam" slot-scope="text, record, index">
					<a-button @click="showInputParams(record,index)" style="margin-left: 6px;">查看</a-button>
				</div>
				<div slot="actionoutparam" slot-scope="text, record, index">
					<a-button @click="showOutputParams(record,index)" style="margin-left: 6px;">查看</a-button>
					<!-- <a-button @click="showInterface(index + (paginationCurrent - 1) * 10)" style="margin-left: 6px;">输出参数</a-button> -->
				</div>
				<!-- code1 -->
				<template v-for="col in ['serviceCode', 'systemId', 'serviceCnName','serviceEnName']" :slot="col" slot-scope="text, record,index">
					<div :key="col">
						<a-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record.key, col)" />
						<template v-else>
							{{ text }}
						</template>
					</div>
				</template>
				<!-- code2 -->
				<template slot="operation" slot-scope="text, record,index">
					<div class="editable-row-operations">
						<span v-if="record.editable">
							<a @click="() => save(record.key)">Save</a>
							<a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
								<a>Cancel</a>
							</a-popconfirm>
						</span>
						<span v-else>
							<a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
						</span>
					</div>
				</template>



			</a-table>
		</div>
		<!-- 
		提示消息 -->
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
								  'serviceCode',
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
								  'serviceCnName',
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
								  'funcDesc',
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
								  'serviceKeyword',
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
								  'serviceVersion',
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
								  'registerDate',
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
								  'relyServiceList',
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
								  'consumeServiceList',
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
								  'realizeMethod',
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
								  'serviceProtocol',
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
								  'ifconsumeServiceList',
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
		<!-- 结束 -->
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
	const columns2 = [{
			title: '参数英文名',
			dataIndex: 'enName',
			key: 'enName',
			align: 'center',
			scopedSlots: {
				customRender: 'enName'
			},
			width: 135
		}, {
			title: '参数中文名',
			dataIndex: 'cnName',
			key: 'cnName',
			align: 'center',
			scopedSlots: {
				customRender: 'cnName'
			},
			width: 135
		}, {
			title: '格式长度',
			dataIndex: 'formatLength',
			key: 'formatLength',
			align: 'center',
			scopedSlots: {
				customRender: 'formatLength'
			},
			width: 135
		}, {
			title: '数据类型',
			dataIndex: 'dataType',
			key: 'dataType',
			align: 'center',
			scopedSlots: {
				customRender: 'dataType'
			},
			width: 135
		}, {
			title: '是否必输项',
			dataIndex: 'ifMust',
			key: 'ifMust',
			align: 'center',
			scopedSlots: {
				customRender: 'ifMust'
			},
			width: 135
		}, {
			title: '数据项编号',
			dataIndex: 'dataItemNo',
			key: 'dataItemNo',
			align: 'center',
			scopedSlots: {
				customRender: 'dataItemNo'
			},
			width: 135
		},



	];
	const columns = [{
			title: "编号",
			scopedSlots: {
				customRender: 'num'
			},
			align: 'center',
			fixed: 'left',
			width: 50
		},
		{
			title: '服务代码',
			dataIndex: 'serviceCode',
			key: 'serviceCode',
			align: 'center',
			fixed: 'left',
			scopedSlots: {
				customRender: 'serviceCode'
			},
			width: 135
		},
		{
			title: '服务中文名',
			dataIndex: 'serviceCnName',
			key: 'serviceCnName',
			align: 'center',
			fixed: 'left',
			scopedSlots: {
				customRender: 'serviceCnName'
			},
			width: 200
		},
		{
			title: '服务英文名',
			dataIndex: 'serviceEnName',
			key: 'serviceEnName',
			align: 'center',
			scopedSlots: {
				customRender: 'serviceEnName'
			},
			width: 200
		},
		{
			title: '所属系统',
			dataIndex: 'systemId',
			key: 'systemId',
			align: 'center',
			scopedSlots: {
				customRender: 'systemId'
			},
			width: 120
		},
		{
			title: '服务类别',
			dataIndex: 'serviceType',
			key: 'serviceType',
			align: 'center',
			width: 150
		},
		{
			title: '服务是否账务',
			dataIndex: 'ifAccounting',
			key: 'ifAccounting',
			align: 'center',
			width: 150
		},
		{
			title: '服务功能描述',
			dataIndex: 'funcDesc',
			key: 'funcDesc',
			align: 'center',
			width: 200

		},
		{
			title: '服务关键字',
			dataIndex: 'serviceKeyword',
			key: 'serviceKeyword',
			align: 'center',
			width: 150
		},
		{
			title: '版本号',
			dataIndex: 'serviceVersion',
			key: 'serviceVersion',
			align: 'center',
			width: 150
		},
		{
			title: '注册日期',
			dataIndex: 'registerDate',
			key: 'registerDate',
			align: 'center',
			width: 150
		},
		{
			title: '依赖的服务列表',
			dataIndex: 'relyServiceList',
			key: 'relyServiceList',
			align: 'center',
			width: 200
		},
		{
			title: '服务消费方服务',
			dataIndex: 'consumeServiceList',
			key: 'consumeServiceList',
			align: 'center',
			width: 200
		},
		{
			title: '实现方式',
			dataIndex: 'realizeMethod',
			key: 'realizeMethod',
			align: 'center',
			width: 150
		},
		{
			title: '服务协议',
			dataIndex: 'serviceProtocol',
			key: 'serviceProtocol',
			align: 'center',
			width: 150
		},
		{
			title: '响应时间',
			dataIndex: 'responseTime',
			key: 'responseTime',
			align: 'center',
			width: 150
		},
		{
			title: '最大负载',
			dataIndex: 'maxLoad',
			key: 'maxLoad',
			align: 'center',
			width: 150
		},
		{
			title: '报文大小',
			dataIndex: 'messageSize',
			key: 'messageSize',
			align: 'center',
			width: 150
		},
		{
			title: '服务启动日期',
			dataIndex: 'startDate',
			key: 'startDate',
			align: 'center',
			width: 150
		},
		{
			title: '服务停用日期',
			dataIndex: 'endDate',
			key: 'endDate',
			align: 'center',
			width: 150
		},
		{
			title: '安全要求',
			dataIndex: 'safetyRequirements',
			key: 'safetyRequirements',
			align: 'center',
			width: 150
		},
		{
			title: '服务消费方系统',
			dataIndex: 'serviceConsumerList',
			key: 'serviceConsumerList',
			align: 'center',
			width: 200
		},
		{
			title: '服务自行安全认证',
			dataIndex: 'selfSafetyCertificate',
			key: 'selfSafetyCertificate',
			align: 'center',
			width: 150
		},
		{
			title: '服务窗口时间',
			dataIndex: 'windowTime',
			key: 'windowTime',
			align: 'center',
			width: 150
		},
		{
			title: '是否支持重试',
			dataIndex: 'ifRetry',
			key: 'ifRetry',
			align: 'center',
			width: 150
		},
		{
			title: '是否支持恢复',
			dataIndex: 'ifRestore',
			key: 'ifRestore',
			align: 'center',
			width: 150
		},
		{
			title: '服务请求地址',
			dataIndex: 'serviceUrl',
			key: 'serviceUrl',
			align: 'center',
			width: 150
		},
		{
			title: '数据传输类型',
			dataIndex: 'dataTransmissionType',
			key: 'dataTransmissionType',
			align: 'center',
			width: 150
		},
		{
			title: '请求方式',
			dataIndex: 'requestMethod',
			key: 'requestMethod',
			align: 'center',
			width: 120
		},


		// {
		// 	title: '外联机构',
		// 	dataIndex: 'outreach',
		// 	key: 'outreach'
		// },
		// {
		// 	title: '服务提供方',
		// 	dataIndex: 'ifconsumeServiceList',
		// 	key: 'ifconsumeServiceList',
		// 	align: 'center'
		// 	,width:150
		// },
		// {
		// 	title: '服务消费方',
		// 	dataIndex: 'ifServiceConsumer',
		// 	key: 'ifServiceConsumer',
		// 	align: 'center'
		// 	,width:150
		// },
		// {
		// 	title: '备用1',
		// 	dataIndex: 'spare1',
		// 	key: 'spare1'
		// },
		// {
		// 	title: '备用2',
		// 	dataIndex: 'spare2',
		// 	key: 'spare2'
		// },
		// {
		// 	title: '备用3',
		// 	dataIndex: 'spare3',
		// 	key: 'spare3'
		// },
		{
			title: '输入参数',
			// width: 200,
			fixed: 'right',
			scopedSlots: {
				customRender: 'actioninparam'
			},

		},
		{
			title: '输出参数',
			// width: 200,
			fixed: 'right',
			scopedSlots: {
				customRender: 'actionoutparam'
			},


		},
		{
			title: '操作',
			dataIndex: 'operation',
			scopedSlots: {
				customRender: 'operation'
			},
			fixed: 'right',
		},
	];
	// const data = [];
	export default {

		data() {
			this.cacheData = [];

			return { //execl导出设置
				json_fields: {
					'系统序号': 'sysId',
					'系统类别': 'sysCategory',
					'一级系统名称': 'serviceCode',
					'一级系统简称': 'primarySysAbb',
					'系统层级': 'sysClass',
					'能力域': 'domain',
					'一级系统唯一标识': 'primarySysId',
					'应用系统名称(二级)': 'serviceCnName',
					'二级系统简称': 'secondarySysAbb',
					'二级系统唯一标识': 'secondarySysId',
					'渠道码': 'funcDesc',
					'运行状态': 'serviceKeyword',
					'归属机构': 'serviceVersion',
					'系统主管单位': 'registerDate',
					'运维组别': 'relyServiceList',
					'厂商': 'consumeServiceList',
					'系统功能简述': 'sysFuncDes',
					'上线时间': 'onlineTime',
					'项目组织实时单位': 'implDep',
					'使用范围': 'useRange',
					'服务对象': 'serviceUser',
					'服务时间': 'serviceTime',
					'备注': 'remark1',
					'系统开发语言': 'devLanguage',
					'重要系统分级': 'realizeMethod',
					'系统级别': 'serviceProtocol',
					'监控级别': 'montiorLevel',
					'外联机构': 'outreach',
					'是否服务提供方': 'ifconsumeServiceList',
					'是否服务消费方': 'ifServiceConsumer',
					'备用1': 'spare1',
					'备用2': 'spare2',
					'备用3': 'spare3'
				},
				json_fields2: {
					'序号': 'id',
					'二级系统唯一标识': 'secondarySysId',
					'运维人员A': 'opsA',
					'运维人员B': 'opsB',
					'研发人员': 'devPerson',
					'领域架构师': 'architect',
					'系统主管单位人员': 'registerDatePerson',
					'联系方式': 'registerDateTel',
					'厂商人员': 'consumeServiceListPerson',
					'联系方式2': 'consumeServiceListTel',
					'TPS': 'tps',
					'交易响应时间': 'qps',
					'是否有LICENSE硬件绑定': 'licenseStatus',
					'是否有加密狗': 'dongleStatus',
					'是否绑定CPU磁盘ID号码': 'cpuDiskStatus',
					'是否插有密钥卡': 'keycardStatus',
					'是否有防篡改': 'tamperProofStatus',
					'是否有F5': 'f5Status',
					'是否已接入批量管理平台': 'bmStatus',
					'是否已接入应用自动发布平台': 'autoPublishStatus',
					'前端技术框架': 'frontFrame',
					'后端技术框架': 'backFrame',
					'数据库': 'dataBaseType',
					'中间件': 'middleware',
					'展现工具': 'showTool',
					'分析工具': 'analysisTool',
					'其他产品工具': 'otherTool',
					'备用1': 'spare1',
					'备用2': 'spare2',
					'备用3': 'spare3',
				},
				dialogVisible: false,
				json_data: [],
				json_data2: [],
				fileList: [],
				uploading: false,
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
					serviceCode: '',
					serviceCnName: '',
					serviceEnName: '',
					systemId: ''
				},
				isTBLoading: true,
				isUpdvisible: false,
				isDelVisible: false,
				drawerVisibe: false,
				id: 0,
				remarks: '',
				confirmLoading: false,
				columns2,
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
				},
				// tableData,

				editingKey: '',
			};
		},
		inject: ['reload'],
		methods: {
			//参数查看
			showInputParams(record, index) {
				// this.dialogVisible = true;
			},
			showOutputParams(record, index) {
				// this.dialogVisible = true;
			},
			//编辑
			handleChange(value, key, column) {
				const newData = [...this.tableData];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					target[column] = value;
					this.tableData = newData;
				}
			},
			edit(key) {
				const newData = [...this.tableData];
				const target = newData.filter(item => key === item.key)[0];
				this.editingKey = key;
				if (target) {
					target.editable = true;
					this.tableData = newData;
				}
			},
			save(key) {
				const newData = [...this.tableData];
				const newCacheData = [...this.cacheData];
				const target = newData.filter(item => key === item.key)[0];
				const targetCache = newCacheData.filter(item => key === item.key)[0];
				if (target && targetCache) {
					delete target.editable;
					this.tableData = newData;
					Object.assign(targetCache, target);
					this.cacheData = newCacheData;
				}
				this.editingKey = '';
			},
			cancel(key) {
				const newData = [...this.tableData];
				const target = newData.filter(item => key === item.key)[0];
				this.editingKey = '';
				if (target) {
					Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
					delete target.editable;
					this.tableData = newData;
				}
			},
			//编辑模块结束

			onTableChange(pagination, filters, sorter) {
				this.paginationCurrent = pagination.current;
			},
			handleFileChange(e) {
				let that = this;
				this.$message.success("主表已经成功导入");
				let inputDOM = this.$refs.inputer;
				this.file = inputDOM.files[0]; // 通过DOM取文件数据
				let size = Math.floor(this.file.size / 1024); //计算文件的大小　
				this.formData = new FormData(); //new一个formData事件
				this.formData.append("file", this.file); //将file属性添加到formData里
				//此时formData就是我们要向后台传的参数了

				request({
					url: "/2/uploadFile",
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
				location.reload();
			},
			handleFileChange2(e) {
				let that = this;
				this.$message.success("数据库子表已经成功导入");
				let inputDOM = this.$refs.inputer2;
				this.file = inputDOM.files[0]; // 通过DOM取文件数据
				let size = Math.floor(this.file.size / 1024); //计算文件的大小　
				this.formData = new FormData(); //new一个formData事件
				this.formData.append("file", this.file); //将file属性添加到formData里
				//此时formData就是我们要向后台传的参数了

				request({
					url: "/2/uploadFileChild",
					data: that.formData, //在此处上传文件
					method: "post",
					headers: {
						'Content-Type': 'multipart/form-data' //值得注意的是，这个地方一定要把请求头更改一下
					}
				}).then(function(res) {
					this.$message.success("导入子表成功数据：" + res.data.length);
					this.$router.push("/Success");

					console.log(res, "此处应该是请求成功的回调")
				}).catch(function(req) {
					console.log(req, "请求失败的回调，Execl文件格式是否合法")
				})
				location.reload();

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
				debugger
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
				// this.$router.push({
				// 	name: 'SystemDetail',
				// 	params: {
				// 		sysId: sysId
				// 	}
				// });
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
					url: '/1/findElement',
					method: 'get',
					/* data: {
						name
					}, */
					params: this.sdata
				}).then(res => {

					this.tableData = res;
					console.log(this.tableData);
					this.json_data = this.tableData;
					this.mydata = this.tableData[0];
					this.isTBLoading = false;
					this.cacheData = this.tableData.map(item => ({ ...item
					}));
				}).catch(error => {
					this.isTBLoading = false;
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			searchDataSubmit() {
				request({
					url: '/1/findElement',
					method: 'get',
					/* data: {
						name
					}, */
					params: this.sdata
				}).then(res => {
					this.tableData = res;
					this.cacheData = this.tableData.map(item => ({ ...item
					}));
				}).catch(error => {
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			showDrawer() {
				this.drawerVisibe = true;
			},
			onClose() {
				this.drawerVisibe = false;
			},

		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'updateAdmin'
			});
		},
		created() {
			if (this.$route.params.systemId != null) {
				this.sdata.systemId = this.$route.params.systemId;
				this.loadData();
			} else
				this.loadData();
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

	.editable-row-operations a {
		margin-right: 8px;

	}

	.dialog {
		position: absolute;
		left: 300px;
		top: 300px;
		width: 668px;
		height: 240px;
		z-index: 1000;
		background-color: #6d6161;
	}
</style>
