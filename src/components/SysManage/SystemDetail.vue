<template>
	<div class="rootDiv">
		<div class="resultDiv">
			<div class="show">
				<table class="ant-table-body">
					<thead class="ant-table-thead" >
						<tr>
							<th class="" colspan="4"><span>详细信息显示</span>
								<a-button type="primary" @click="backServiceList()" style="margin-left: 6px;">返回系统列表</a-button>

							</th>
						</tr>
					</thead>

					<tbody class="ant-table-tbody">
						<tr>
							<!-- <td class="titlestyle">系统自增序号</td>
							<td>{{imsSystem.sysId}}</td> -->
							<td class="titlestyle">系统类别</td>
							<td class="detailstyle">{{imsSystem.sysCategory}}</td>
              <td class="titlestyle">一级系统简称</td>
              <td class="detailstyle">{{imsSystem.primarySysAbb}}</td>
						</tr>
						<tr>
							<td class="titlestyle">应用系统名称(一级)</td>
							<td class="detailstyle">{{imsSystem.primaryAppSysName}}</td>
              <td class="titlestyle">能力域</td>
              <td class="detailstyle">{{imsSystem.domain}}</td>
						</tr>
						<tr>
							<td class="titlestyle">系统层级</td>
							<td class="detailstyle">{{imsSystem.sysClass}}</td>
							<td class="titlestyle">系统级别</td>
							<td class="detailstyle">{{imsSystem.sysLevel}}</td>

						</tr>
						<tr>
							<td class="titlestyle">一级系统唯一标识</td>
							<td class="detailstyle">{{imsSystem.primarySysId}}</td>
							<td class="titlestyle">应用系统名称(二级)</td>
							<td class="detailstyle">{{imsSystem.secondaryAppSysName}}</td>

						</tr>
						<tr>
							<td class="titlestyle">二级系统简称</td>
							<td class="detailstyle">{{imsSystem.secondarySysAbb}}</td>
							<td class="titlestyle">二级系统唯一标识</td>
							<td class="detailstyle">{{imsSystem.secondarySysId}}</td>

						</tr>
						<tr>
							<td class="titlestyle">渠道码</td>
							<td class="detailstyle">{{imsSystem.channelCode}}</td>
							<td class="titlestyle">运行状态</td>
							<td class="detailstyle">{{imsSystem.runStatus}}</td>

						</tr>
						<tr>
							<td class="titlestyle">归属机构</td>
							<td class="detailstyle">{{imsSystem.affiliation}}</td>
							<td class="titlestyle">系统主管单位</td>
							<td class="detailstyle">{{imsSystem.sysSupervisor}}</td>

						</tr>
						<tr>
							<td class="titlestyle">运维组别</td>
							<td class="detailstyle">{{imsSystem.opsGroup}}</td>
							<td class="titlestyle">厂商</td>
							<td class="detailstyle">{{imsSystem.serviceProvider}}</td>

						</tr>
						<tr>
							<td class="titlestyle">系统功能简述</td>
							<td class="detailstyle">{{imsSystem.sysFuncDes}}</td>
							<td class="titlestyle">上线时间</td>
							<td class="detailstyle">{{imsSystem.onlineTime}}</td>

						</tr>
						<tr>
							<td class="titlestyle">项目组织实时单位</td>
							<td class="detailstyle">{{imsSystem.implDep}}</td>
							<td class="titlestyle">使用范围</td>
							<td class="detailstyle">{{imsSystem.useRange}}</td>

						</tr>
						<tr>
							<td class="titlestyle">服务对象</td>
							<td class="detailstyle">{{imsSystem.serviceUser}}</td>
							<td class="titlestyle">服务时间</td>
							<td class="detailstyle">{{imsSystem.serviceTime}}</td>

						</tr>
						<tr>
							<td class="titlestyle">备注</td>
							<td class="detailstyle">{{imsSystem.remark1}}</td>
							<td class="titlestyle">系统开发语言</td>
							<td class="detailstyle">{{imsSystem.devLanguage}}</td>

						</tr>
						<tr>
							<td class="titlestyle">重要系统分级</td>
							<td class="detailstyle">{{imsSystem.sysImportance}}</td>
              <td class="titlestyle">监控级别</td>
              <td class="detailstyle">{{imsSystem.montiorLevel}}</td>
						</tr>
						<tr>
							<td class="titlestyle">展现工具</td>
							<td class="detailstyle">{{imsSystemSecond.showTool}}</td>
							<td class="titlestyle">外联机构</td>
							<td class="detailstyle">{{imsSystem.outreach}}</td>

						</tr>
						<tr>
							<td class="titlestyle">是否服务提供方</td>
							<td class="detailstyle">{{imsSystem.ifServiceProvider}}</td>
							<td class="titlestyle">是否服务消费方</td>
							<td class="detailstyle">{{imsSystem.ifServiceConsumer}}</td>

						</tr>
						<!-- <tr>
							<td class="titlestyle">备用1</td>
							<td>{{imsSystem.spare1}}</td>
							<td class="titlestyle">备用2</td>
							<td>{{imsSystem.spare2}}</td>

						</tr>
						<tr>
							<td class="titlestyle">备用3</td>
							<td>{{imsSystem.spare3}}</td>
							<td></td>
							<td></td>
						</tr> -->

			<!-- 		</tbody>
				</table>

				<table class="">
					<thead class="ant-table-thead">
						<tr>
							<th class="" colspan="4"><span>详细信息显示</span>
								<a-button type="primary" @click="backServiceList()" style="margin-left: 6px;">返回系统列表</a-button>

							</th>
						</tr>
					</thead>
					<tbody class="ant-table-tbody"> -->
						<!-- <tr style="color:green;background: #eee;">
							<td class="titlestyle">序号</td>
							<td>{{imsSystemSecond.id}}</td>
							<td class="titlestyle">二级系统唯一标识</td>
							<td>{{imsSystemSecond.secondarySysId}}</td>

						</tr> -->
						<tr>
							<td class="titlestyle">运维人员A</td>
							<td class="detailstyle">{{imsSystemSecond.opsA}}</td>
							<td class="titlestyle">运维人员B</td>
							<td class="detailstyle">{{imsSystemSecond.opsB}}</td>

						</tr>
						<tr>
							<td class="titlestyle">研发人员</td>
							<td class="detailstyle">{{imsSystemSecond.devPerson}}</td>
							<td class="titlestyle">领域架构师</td>
							<td class="detailstyle" >{{imsSystemSecond.architect}}</td>

						</tr>
						<tr>
							<td class="titlestyle">系统主管单位人员</td>
							<td class="detailstyle">{{imsSystemSecond.sysSupervisorPerson}}</td>
							<td class="titlestyle">系统主管单位人员联系方式</td>
							<td class="detailstyle">{{imsSystemSecond.sysSupervisorTel}}</td>

						</tr>
						<tr>
							<td class="titlestyle">厂商人员</td>
							<td class="detailstyle">{{imsSystemSecond.serviceProviderPerson}}</td>
							<td class="titlestyle">厂商人员联系方式</td>
							<td class="detailstyle">{{imsSystemSecond.serviceProviderTel}}</td>

						</tr>
						<tr>
							<td class="titlestyle">TPS</td>
							<td class="detailstyle">{{imsSystemSecond.tps}}</td>
							<td class="titlestyle">交易响应时间(单位：毫秒)</td>
							<td class="detailstyle">{{imsSystemSecond.qps}}</td>

						</tr>
						<tr>
							<td class="titlestyle">是否有LICENSE硬件绑定</td>
							<td class="detailstyle">{{imsSystemSecond.licenseStatus}}</td>
							<td class="titlestyle">是否有加密狗</td>
							<td class="detailstyle">{{imsSystemSecond.dongleStatus}}</td>

						</tr>
						<tr>
							<td class="titlestyle">是否绑定CPU\磁盘ID号码</td>
							<td class="detailstyle">{{imsSystemSecond.cpuDiskStatus}}</td>
							<td class="titlestyle">是否插有密钥卡</td>
							<td class="detailstyle">{{imsSystemSecond.keycardStatus}}</td>

						</tr>
						<tr>
							<td class="titlestyle">是否有防篡改</td>
							<td class="detailstyle">{{imsSystemSecond.tamperProofStatus}}</td>
							<td class="titlestyle">是否有F5</td>
							<td class="detailstyle">{{imsSystemSecond.f5Status}}</td>

						</tr>
						<tr>
							<td class="titlestyle">是否已接入批量管理平台</td>
							<td class="detailstyle">{{imsSystemSecond.bmStatus}}</td>
							<td class="titlestyle">是否已接入应用自动发布平台</td>
							<td class="detailstyle">{{imsSystemSecond.autoPublishStatus}}</td>

						</tr>
						<tr>
							<td class="titlestyle">前端技术框架</td>
							<td class="detailstyle">{{imsSystemSecond.frontFrame}}</td>
							<td class="titlestyle">后端技术框架</td>
							<td class="detailstyle">{{imsSystemSecond.backFrame}}</td>

						</tr>
						<tr>
							<td class="titlestyle">数据库</td>
							<td class="detailstyle">{{imsSystemSecond.dataBaseType}}</td>
							<td class="titlestyle">中间件</td>
							<td class="detailstyle">{{imsSystemSecond.middleware}}</td>

						</tr>
						<tr>
							<td class="titlestyle">分析工具</td>
							<td class="detailstyle">{{imsSystemSecond.analysisTool}}</td>
							<td class="titlestyle">其他产品工具</td>
							<td class="detailstyle">{{imsSystemSecond.otherTool}}</td>
							<!-- <td class="titlestyle">备用1</td>
							<td>{{imsSystemSecond.spare1}}</td> -->
						</tr>
						<!-- <tr>
							<td class="titlestyle">备用2</td>
							<td>{{imsSystemSecond.spare2}}</td>
							<td class="titlestyle">备用3</td>
							<td>{{imsSystemSecond.spare3}}</td>
						</tr> -->

					</tbody>
				</table>
			</div>


		</div>

	</div>
</template>
<script>
	import request from '../../utils/request.js';
	export default {
		data() {
			return {
				imsSystem: null,

			};
		},
		methods: {
			backServiceList() {
				this.$router.push({
					name: 'SystemList',
					params: {}
				});
			}
		},
		beforeCreate() {

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
				this.imsSystem = res.imsSystem;
				this.imsSystemSecond = res.imsSystemSecond;
			}).catch(error => {
				this.$message.error('出现了某些错误！请联系管理员');
				console.log(error.response);
			})
		}
	};
</script>
<style scoped>
  .show{
    margin: 30px;
  }
  .titlestyle{
    width: 100px;
		font-weight: 700;  /*字体加粗*/
		font-size: 15px; /*字体大小*/
		color: #000000; /*字体颜色*/
    background-color: #d9e2ed;
    text-align: left;
	}
  .detailstyle{
    width: 200px;
    color:#000000;
  }
  .ant-table-body{
    width: 100%;
  }
  .ant-table-tbody{
    margin: 30px;
  }

</style>
