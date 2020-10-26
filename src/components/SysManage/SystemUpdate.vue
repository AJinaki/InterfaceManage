<template>
	<div class="addDiv">
		<div class="addTitle">编辑系统服务</div>
		<a-divider />
		<div class="addForm">
			<a-form :form="form" style="width:900px" @submit="onSubmit">
				<!-- <a-form-item v-show="false" v-bind="formItemLayout" label="系统自增序号" has-feedback>
					<a-input disabled v-decorator="[
							  'sysId',
							  {
								initialValue:this.mydata.sysId,
								rules: [
								  {
									required: true,
									message: '系统自增序号不能为空！',
								  }
								],
							  },
							]" />
				</a-form-item> -->
				<a-form-item v-bind="formItemLayout" label="系统类别" has-feedback>
					<a-input v-decorator="[
							  'sysCategory',
							  {
								  initialValue:this.mydata.sysCategory,
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
								  initialValue:this.mydata.primaryAppSysName,
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
								    initialValue:this.mydata.primarySysAbb,
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
								    initialValue:this.mydata.sysClass,
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
								     initialValue:this.mydata.domain,
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
								     initialValue:this.mydata.primarySysId,
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
								    initialValue:this.mydata.secondaryAppSysName,
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
								    initialValue:this.mydata.secondarySysAbb,
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
								  	    initialValue:this.mydata.secondarySysId,
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
									   initialValue:this.mydata.channelCode,
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
								  	  	    initialValue:this.mydata.runStatus,
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
								   initialValue:this.mydata.affiliation,
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
								     initialValue:this.mydata.sysSupervisor,
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
								    initialValue:this.mydata.opsGroup,
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
								  	    initialValue:this.mydata.serviceProvider,
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
								      initialValue:this.mydata.sysFuncDes,
								rules: [
								  {
									required: true,
									message: '系统功能简述不能为空！',
								  }
								],
							  },
							]" />
				</a-form-item>
				<!-- <a-form-item v-bind="formItemLayout" label="上线时间" has-feedback>
					<a-input v-decorator="[
							  'onlineTime',
							  {
								       initialValue:this.mydata.onlineTime,
								rules: [
								  {
									required: true,
									message: '上线时间不能为空！',
								  }
								],
							  },
							]" />
				</a-form-item> -->
        <a-form-item v-bind="formItemLayout" label="上线时间" has-feedback>
                    <a-form-item>
                      <a-date-picker  style="width: 100%" v-decorator="[
                        'onlineTime',
                        {
                          initialValue:this.mydata.onlineTime,
                        }
                        ]"  :showToday="false" />
                    </a-form-item>
                  </a-form-item>

				<a-form-item v-bind="formItemLayout" label="项目组织实时单位" has-feedback>
					<a-input v-decorator="[
							  'implDep',
							  {
								  initialValue:this.mydata.implDep,
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
								    initialValue:this.mydata.useRange,
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
								   initialValue:this.mydata.serviceUser,
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
								   initialValue:this.mydata.serviceTime,
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
								   initialValue:this.mydata.remark1,
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
								   initialValue:this.mydata.devLanguage,
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
								     initialValue:this.mydata.sysImportance,
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
								    initialValue:this.mydata.sysLevel,
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
								      initialValue:this.mydata.montiorLevel,
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
								  initialValue:this.mydata.outreach,
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
					<a-input v-decorator="[
							  'ifServiceProvider',
							  {
								    initialValue:this.mydata.ifServiceProvider,
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
								    initialValue:this.mydata.ifServiceConsumer,
								rules: [
								  {
									required: true,
									message: '是否服务消费方不能为空！',
								  }
								],
							  },
							]" />
				</a-form-item> -->
				<!-- <a-form-item v-show="false" v-bind="formItemLayout" label="序号" has-feedback>
					<a-input v-decorator="[
						'id',
						{
							initialValue:this.mydata2.id,
							rules: [
								{
								required: true,
								message: '序号不能为空！',
								}
							],
						},
					]" />
				</a-form-item> -->
				<!-- <a-form-item v-show="true" v-bind="formItemLayout" label="二级系统唯一标识" has-feedback>
					<a-input v-decorator="[
						'secondarySysId',
					  {
						initialValue:this.mydata2.secondarySysId,
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
				    initialValue:this.mydata2.opsA,
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
				    initialValue:this.mydata2.opsB,
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
				  initialValue:this.mydata2.devPerson,
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
				  initialValue:this.mydata2.architect,
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
				   initialValue:this.mydata2.sysSupervisorPerson,
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
				   initialValue:this.mydata2.sysSupervisorTel,
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
				   initialValue:this.mydata2.serviceProviderPerson,
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
				   initialValue:this.mydata2.serviceProviderTel,
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
				    initialValue:this.mydata2.tps,
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
				  initialValue:this.mydata2.qps,
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
            initialValue:this.mydata2.licenseStatus,
            rules: [
              {
                required: true, message: '请选择是否有LICENSE硬件绑定!'
              }]
            },]"
           >
        <a-select-option value="是">是</a-select-option>
        <a-select-option value="否">否</a-select-option>
      </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否有加密狗" has-feedback>

         <a-select v-decorator="[
            'dongleStatus',
             {
               initialValue:this.mydata2.dongleStatus,
               rules: [
                 {
                   required: true, message: '是否有加密狗不能为空!'
                 }]
               },]"
              >
           <a-select-option value="是">是</a-select-option>
           <a-select-option value="否">否</a-select-option>
         </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否绑定CPU磁盘ID号码" has-feedback>
      <a-select v-decorator="[
         'cpuDiskStatus',
          {
            initialValue:this.mydata2.cpuDiskStatus,
            rules: [
              {
                required: true, message: '是否绑定CPU磁盘ID号码不能为空!'
              }]
            },]"
           >
        <a-select-option value="是">是</a-select-option>
        <a-select-option value="否">否</a-select-option>
      </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否插有密钥卡" has-feedback>
      <a-select v-decorator="[
         'keycardStatus',
          {
            initialValue:this.mydata2.keycardStatus,
            rules: [
              {
                required: true, message: '是否插有密钥卡不能为空!'
              }]
            },]"
           >
        <a-select-option value="是">是</a-select-option>
        <a-select-option value="否">否</a-select-option>
      </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否有防篡改" has-feedback>
        <a-select v-decorator="[
           'tamperProofStatus',
            {
              initialValue:this.mydata2.tamperProofStatus,
              rules: [
                {
                  required: true, message: '是否有防篡改不能为空!'
                }]
              },]"
             >
          <a-select-option value="是">是</a-select-option>
          <a-select-option value="否">否</a-select-option>
        </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否有F5" has-feedback>

        <a-select v-decorator="[
           'f5Status',
            {
              initialValue:this.mydata2.f5Status,
              rules: [
                {
                  required: true, message: '是否有F5不能为空!'
                }]
              },]"
             >
          <a-select-option value="是">是</a-select-option>
          <a-select-option value="否">否</a-select-option>
        </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否已接入批量管理平台" has-feedback>
      <a-select v-decorator="[
         'bmStatus',
          {
            initialValue:this.mydata2.bmStatus,
            rules: [
              {
                required: true, message: '是否已接入批量管理平台不能为空!'
              }]
            },]"
           >
        <a-select-option value="是">是</a-select-option>
        <a-select-option value="否">否</a-select-option>
      </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="是否已接入应用自动发布平台" has-feedback>

      <a-select v-decorator="[
         'autoPublishStatus',
          {
            initialValue:this.mydata2.autoPublishStatus,
            rules: [
              {
                required: true, message: '是否已接入应用自动发布平台不能为空!'
              }]
            },]"
           >
        <a-select-option value="是">是</a-select-option>
        <a-select-option value="否">否</a-select-option>
      </a-select>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="前端技术框架" has-feedback>
					<a-input v-decorator="[
			  'frontFrame',
			  {
				   initialValue:this.mydata2.frontFrame,
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
				   initialValue:this.mydata2.backFrame,
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
				   initialValue:this.mydata2.dataBaseType,
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
				   initialValue:this.mydata2.middleware,
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
				    initialValue:this.mydata2.showTool,
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
				   initialValue:this.mydata2.analysisTool,
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
				   initialValue:this.mydata2.otherTool,
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
				   initialValue:this.mydata2.spare1,
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
				  initialValue:this.mydata2.spare2,
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
				   initialValue:this.mydata2.spare3,
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
					修改
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
        onlineTime:undefined,
				mydata: null,
				mydata2: null,
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
				name: 'SystemUpdate'
			});
		},
		methods: {
			onSubmit(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						//this.mydata.sysId = values.sysId;
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
						this.mydata.ifServiceProvider = values.ifServiceProvider;
						this.mydata.ifServiceConsumer = values.ifServiceConsumer;
						this.mydata.spare1 = values.spare1;
						this.mydata.spare2 = values.spare2;
						this.mydata.spare3 = values.spare3;


						//this.mydata2.id = values.id;
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
						this.mydata2.spare1 = values.spare1two;
						this.mydata2.spare2 = values.spare2two;
						this.mydata2.spare3 = values.spare3two;



						request({
							url: '/2/updateSystem',
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
								url: '/2/updateSystemChildTable',
								method: 'post',
								/* data: {
									name
								}, */
								params: this.mydata2
							}).then(res => {
								console.log(res)
								this.isSpinning = false;
								this.$message.success('修改信息成功！');
								this.$router.push("/Success");
							}).catch(error => {
								this.isTBLoading = false;
								this.$message.success('修改信息成功！');
								console.log(error.response);
							})
						}).catch(error => {
							this.isTBLoading = false;
							this.$message.success('修改信息成功！');
							console.log(error.response);
						})




					}
				});
			}
		},
		created() {
			let sysId = this.$route.params.sysId;
			request({
				url: '/2/findSystemById',
				method: 'get',
				params: {
					"sys_id": sysId
				}
			}).then(res => {
				this.mydata = res.imsSystem;
				this.mydata2 = res.imsSystemSecond;
			}).catch(error => {
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

	.addDiv {
		background-color: white;
		border-radius: 25px;
		margin: 30px;
		padding: 25px;
	}

	.addForm {
		max-width: 400px;
	}
</style>
