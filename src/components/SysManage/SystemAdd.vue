<template>
	<div class="addDiv">
		<div class="addTitle">添加新的系统</div>
		<a-divider />
		<div class="addForm">
			<a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="onSubmit">
				<a-form-item v-show="false" v-bind="formItemLayout" label="系统自增序号" has-feedback>
					<a-input v-decorator="[
							  'sysId',
							  {
								initialValue:0,
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
				<a-form-item v-bind="formItemLayout" label="应用系统名称(一级)" has-feedback>
					<a-input v-decorator="[
							  'primaryAppSysName',
							  {
								rules: [
								  {
									required: true,
									message: '应用系统名称(一级)不能为空！',
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
				<a-form-item v-bind="formItemLayout" label="系统上线时间" has-feedback>
				            <a-form-item>
				              <a-date-picker style="width: 100%" v-decorator="[
                        'onlineTime',
                         {
                           rules: [
                             {
                           	required: true,
                           	message: '系统上线时间不能为空！',
                             }
                           ],
                         },
                        ]"/>
				            </a-form-item>
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
				<!-- <a-form-item v-bind="formItemLayout" label="是否服务提供方" has-feedback>
					<a-select v-decorator="[
					   'ifServiceProvider',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否服务提供方!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否服务消费方" has-feedback>
					<a-select v-decorator="[
					   'ifServiceConsumer',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否服务消费方!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
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
				</a-form-item> -->

				<a-form-item v-show="false" v-bind="formItemLayout" label="序号" has-feedback>
					<a-input v-decorator="[
			  'id',
			  {
				initialValue:"0",
				rules: [
				  {

					required: true,
					message: '序号不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<!-- <a-form-item v-show="false" v-bind="formItemLayout" label="二级系统唯一标识" has-feedback>
					<a-input v-decorator="[
			  'secondarySysId',
			  {
				  initialValue:"0",
				rules: [
				  {
					required: true,
					message: '二级系统唯一标识不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item> -->
				<a-form-item v-bind="formItemLayout" label="运维人员A" has-feedback>
					<a-input v-decorator="[
			  'opsA',
			  {
				rules: [
				  {
					required: true,
					message: '运维人员A不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="运维人员B" has-feedback>
					<a-input v-decorator="[
			  'opsB',
			  {
				rules: [
				  {
					required: true,
					message: '运维人员B不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="研发人员" has-feedback>
					<a-input v-decorator="[
			  'devPerson',
			  {
				rules: [
				  {
					required: true,
					message: '研发人员不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="领域架构师" has-feedback>
					<a-input v-decorator="[
			  'architect',
			  {
				rules: [
				  {
					required: true,
					message: '领域架构师不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="系统主管单位人员" has-feedback>
					<a-input v-decorator="[
			  'sysSupervisorPerson',
			  {
				rules: [
				  {
					required: true,
					message: '系统主管单位人员不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="系统主管单位人员联系方式" has-feedback>
					<a-input v-decorator="[
			  'sysSupervisorTel',
			  {
				rules: [
				  {
					required: true,
					message: '系统主管单位人员联系方式不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="厂商人员" has-feedback>
					<a-input v-decorator="[
			  'serviceProviderPerson',
			  {
				rules: [
				  {
					required: true,
					message: '厂商人员不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="厂商人员联系方式" has-feedback>
					<a-input v-decorator="[
			  'serviceProviderTel',
			  {
				rules: [
				  {
					required: true,
					message: '厂商人员联系方式不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="TPS" has-feedback>
					<a-input v-decorator="[
			  'tps',
			  {
				rules: [
				  {
					required: true,
					message: 'TPS不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="交易响应时间" has-feedback>
					<a-input v-decorator="[
			  'qps',
			  {
				rules: [
				  {
					required: true,
					message: '交易响应时间不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否有LICENSE硬件绑定" has-feedback>
           <a-select v-decorator="[
             'licenseStatus',
              {
                rules: [
                  {
                    required: true, message: '请选择是否有LICENSE硬件绑定!'
                  }]
                },]"
               placeholder="请选择" >
            <a-select-option value="是">是</a-select-option>
            <a-select-option value="否">否</a-select-option>
          </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否有加密狗" has-feedback>
					<a-select v-decorator="[
					   'dongleStatus',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否有加密狗!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否绑定CPU磁盘ID号码" has-feedback>
					<a-select v-decorator="[
					   'cpuDiskStatus',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否绑定CPU磁盘ID号码!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否插有密钥卡" has-feedback>
					<a-select v-decorator="[
					   'keycardStatus',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是插有密钥卡!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否有防篡改" has-feedback>
					<a-select v-decorator="[
					   'tamperProofStatus',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否防篡改!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否有F5" has-feedback>
					<a-select v-decorator="[
					   'f5Status',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否有F5!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否已接入批量管理平台" has-feedback>
					<a-select v-decorator="[
					   'bmStatus',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否已接入批量管理平台!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否已接入应用自动发布平台" has-feedback>
					<a-select v-decorator="[
					   'autoPublishStatus',
					    {
					      rules: [
					        {
					          required: true, message: '请选择是否已接入应用自动发布平台!'
					        }]
					      },]"
					     placeholder="请选择" >
					  <a-select-option value="是">是</a-select-option>
					  <a-select-option value="否">否</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="前端技术框架" has-feedback>
					<a-input v-decorator="[
			  'frontFrame',
			  {
				rules: [
				  {
					required: true,
					message: '前端技术框架不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="后端技术框架" has-feedback>
					<a-input v-decorator="[
			  'backFrame',
			  {
				rules: [
				  {
					required: true,
					message: '后端技术框架不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="数据库" has-feedback>
					<a-input v-decorator="[
			  'dataBaseType',
			  {
				rules: [
				  {
					required: true,
					message: '数据库不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="中间件" has-feedback>
					<a-input v-decorator="[
			  'middleware',
			  {
				rules: [
				  {
					required: true,
					message: '中间件不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="展现工具" has-feedback>
					<a-input v-decorator="[
			  'showTool',
			  {
				rules: [
				  {
					required: true,
					message: '展现工具不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="分析工具" has-feedback>
					<a-input v-decorator="[
			  'analysisTool',
			  {
				rules: [
				  {
					required: true,
					message: '分析工具不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="其他产品工具" has-feedback>
					<a-input v-decorator="[
			  'otherTool',
			  {
				rules: [
				  {
					required: true,
					message: '其他产品工具不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<!-- <a-form-item v-bind="formItemLayout" label="备用1" has-feedback>
					<a-input v-decorator="[
			  'spare1two',
			  {
				rules: [
				  {
					required: false,
					message: '备用1不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="备用2" has-feedback>
					<a-input v-decorator="[
			  'spare2two',
			  {
				rules: [
				  {
					required: false,
					message: '备用2不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="备用3" has-feedback>
					<a-input v-decorator="[
			  'spare3two',
			  {
				rules: [
				  {
					required: false,
					message: '备用3不能为空！',
				  }
				],
			  },
			]" />
				</a-form-item> -->



				<a-button type="danger" html-type="reset" size="large" style="width: 100px;">
					重置
				</a-button>
				<a-button type="primary" html-type="submit" size="large" style="width: 100px;margin-left: 40px;">
					添加
				</a-button>
			</a-form>

		</div>
	</div>
</template>

<script>
	import request from '../../utils/request.js';
	export default {
		data() {
			return {
				mydata: {
					sysId: '',
					sysCategory: '',
					primaryAppSysName: '',
					primarySysAbb: '',
					sysClass: '',
					domain: '',
					primarySysId: '',
					secondaryAppSysName: '',
					secondarySysAbb: '',
					secondarySysId: '',
					channelCode: '',
					runStatus: '',
					affiliation: '',
					sysSupervisor: '',
					opsGroup: '',
					serviceProvider: '',
					sysFuncDes: '',
					onlineTime: '',
					implDep: '',
					useRange: '',
					serviceUser: '',
					serviceTime: '',
					remark1: '',
					devLanguage: '',
					sysImportance: '',
					sysLevel: '',
					montiorLevel: '',
					outreach: '',
					ifServiceProvider: '',
					ifServiceConsumer: '',
					spare1: '',
					spare2: '',
					spare3: '',


				},
				mydata2: {
					id: '',
					secondarySysId: '',
					opsA: '',
					opsB: '',
					devPerson: '',
					architect: '',
					sysSupervisorPerson: '',
					sysSupervisorTel: '',
					serviceProviderPerson: '',
					serviceProviderTel: '',
					tps: '',
					qps: '',
					licenseStatus: '',
					dongleStatus: '',
					cpuDiskStatus: '',
					keycardStatus: '',
					tamperProofStatus: '',
					f5Status: '',
					bmStatus: '',
					autoPublishStatus: '',
					frontFrame: '',
					backFrame: '',
					dataBaseType: '',
					middleware: '',
					showTool: '',
					analysisTool: '',
					otherTool: '',
					spare1: '',
					spare2: '',
					spare3: '',
				},
				confirmDirty: false,
				remarks: '',
				formItemLayout: {
					labelCol: {
						xs: {
							span: 10
						},
						sm: {
							span: 4
						},
					},
					wrapperCol: {
						xs: {
							span: 10
						},
						sm: {
							span: 10
						},
					},
				}
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'SystemAdd'
			});
		},
		methods: {
			onSubmit(e) {
				let that=this;
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						this.mydata.sysId = values.sysId;
						this.mydata.sysCategory = values.sysCategory;
						this.mydata.primaryAppSysName = values.primaryAppSysName;
						this.mydata.primarySysAbb = values.primarySysAbb;
						this.mydata.sysClass = values.sysClass;
						this.mydata.domain = values.domain;
						this.mydata.primarySysId = values.primarySysId;
						this.mydata.secondaryAppSysName = values.secondaryAppSysName;
						this.mydata.secondarySysAbb = values.secondarySysAbb;
						this.mydata.secondarySysId = values.secondarySysId;
						this.mydata.channelCode = values.channelCode;
						this.mydata.runStatus = values.runStatus;
						this.mydata.affiliation = values.affiliation;
						this.mydata.sysSupervisor = values.sysSupervisor;
						this.mydata.opsGroup = values.opsGroup;
						this.mydata.serviceProvider = values.serviceProvider;
						this.mydata.sysFuncDes = values.sysFuncDes;
						this.mydata.onlineTime = values.onlineTime;
						this.mydata.implDep = values.implDep;
						this.mydata.useRange = values.useRange;
						this.mydata.serviceUser = values.serviceUser;
						this.mydata.serviceTime = values.serviceTime;
						this.mydata.remark1 = values.remark1;
						this.mydata.devLanguage = values.devLanguage;
						this.mydata.sysImportance = values.sysImportance;
						this.mydata.sysLevel = values.sysLevel;
						this.mydata.montiorLevel = values.montiorLevel;
						this.mydata.outreach = values.outreach;
						// this.mydata.ifServiceProvider = values.ifServiceProvider;
						// this.mydata.ifServiceConsumer = values.ifServiceConsumer;
						// this.mydata.spare1 = values.spare1;
						// this.mydata.spare2 = values.spare2;
						// this.mydata.spare3 = values.spare3;


						this.mydata2.id = values.id;
						this.mydata2.secondarySysId = values.secondarySysId;
						this.mydata2.opsA = values.opsA;
						this.mydata2.opsB = values.opsB;
						this.mydata2.devPerson = values.devPerson;
						this.mydata2.architect = values.architect;
						this.mydata2.sysSupervisorPerson = values.sysSupervisorPerson;
						this.mydata2.sysSupervisorTel = values.sysSupervisorTel;
						this.mydata2.serviceProviderPerson = values.serviceProviderPerson;
						this.mydata2.serviceProviderTel = values.serviceProviderTel;
						this.mydata2.tps = values.tps;
						this.mydata2.qps = values.qps;
						this.mydata2.licenseStatus = values.licenseStatus;
						this.mydata2.dongleStatus = values.dongleStatus;
						this.mydata2.cpuDiskStatus = values.cpuDiskStatus;
						this.mydata2.keycardStatus = values.keycardStatus;
						this.mydata2.tamperProofStatus = values.tamperProofStatus;
						this.mydata2.f5Status = values.f5Status;
						this.mydata2.bmStatus = values.bmStatus;
						this.mydata2.autoPublishStatus = values.autoPublishStatus;
						this.mydata2.frontFrame = values.frontFrame;
						this.mydata2.backFrame = values.backFrame;
						this.mydata2.dataBaseType = values.dataBaseType;
						this.mydata2.middleware = values.middleware;
						this.mydata2.showTool = values.showTool;
						this.mydata2.analysisTool = values.analysisTool;
						this.mydata2.otherTool = values.otherTool;
						// this.mydata2.spare1 = values.spare1two;
						// this.mydata2.spare2 = values.spare2two;
						// this.mydata2.spare3 = values.spare3two;


						request({
							url: '/2/addSystem',
							method: 'post',
							/* data: {
								name
							}, */
							params: this.mydata
						}).then(res => {
							/* this.isSpinning = false;
							this.$message.Success('添加信息成功，请等待审核！');
							this.$router.push("/Success"); */
							request({
								url: '/2/addSystemChildTable',
								method: 'post',
								/* data: {
									name
								}, */
								params: this.mydata2
							}).then(res => {
								console.log(res);
								//alert("添加成功123");
								that.isSpinning = false;
								that.$message.success('添加信息成功，请等待审核！');
								that.$router.push("/Success");
							}).catch(error => {
								that.isTBLoading = false;
								that.$message.success('添加信息成功，请等待审核！');
								console.log(error.response);
							})
						}).catch(error => {
							this.isTBLoading = false;
							this.$message.Success('添加信息成功，请等待审核！');
							console.log(error.response);
						})




					}
				});
			}
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

	.addForm {
		min-width: 200px;
	}
</style>
