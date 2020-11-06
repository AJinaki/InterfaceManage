<template>
	<div class="statistical">
		<div class="addTitle">统计分析 </div>
		<a-divider />
		<div class="addForm">
			<div id="myChart"></div>
			<div id="myTable">
				<a-table :columns="columns" :data-source="data">
					<template v-slot:name="{ text }">
						<a>{{ text }}</a>
					</template>
					<template v-slot:customTitle>
						<span>
							 Name</span>
					</template>
					<template v-slot:tags="{ text: tags }">
						<span>
							<a-tag v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
								{{ tag.toUpperCase() }}
							</a-tag>
						</span>
					</template>
					<template v-slot:action="{ text, record }">
						<span>
							<a>Invite 一 {{ record.name }}</a>
							<a-divider type="vertical" />
							<a>Delete</a>
							<a-divider type="vertical" />
							<a class="ant-dropdown-link"> More actions
							</a>
						</span>
					</template>
				</a-table>
			</div>
		</div>
		
	</div>
</template>

<script>
	import echarts2 from 'echarts'
	import request from '../utils/request.js'
	// 引入echarts http://localhost:8081

	const columns = [{
			dataIndex: 'name',
			key: 'name',
			slots: {
				title: 'customTitle',
				customRender: 'name'
			},
		},
		{
			title: 'Quantity',
			dataIndex: 'Quantity',
			key: 'Quantity',
		}
	];

	const data = [{
			key: '1',
			name: '运行中系统个数',
			Quantity: 20,
			
		},
		{
			key: '2',
			name: '服务个数',
			Quantity: 16,
			
		},
		
	];


	export default {
		name: 'echarts',
		data() {
			return {
				data,
				columns,
			}
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			drawLine() {
				console.log("初始化machart")
				// 基于准备好的dom，初始化echarts实例
				let dom = document.getElementById('myChart');
				let myChart = echarts2.init(dom)
				// 绘制图表
				myChart.setOption({
					title: {
						text: '运行服务数量',
						subtext:'',
					},
					tooltip: {
						trigger: 'axis'
					},
					 legend: {
					        data:['运行','新增','删除','修改','调用']
					    },
						 toolbox: {
						        show: true,
						        feature: {
						            magicType: {show: true, type: ['stack', 'tiled']},
						            saveAsImage: {show: true}
						        }
						    },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ["2020-9-25", "2020-10-20", "2020-10-2", "2020-10-9", "2020-10-16", "2020-10-23"]
					},
					yAxis: {},
					 series: [{
					        name: '运行',
					        type: 'line',
					        smooth: true,
					        data: [11, 13, 12, 13, 13, 15, 15]
					    },
						{
					        name: '新增',
					        type: 'line',
					        smooth: true,
					        data: [0, 2, 0, 3, 0, 2, 0]
					    },
					    {
					        name: '删除',
					        type: 'line',
					        smooth: true,
					        data: [0, 0, 1, 2, 0, 0, 0]
					    },
					    {
					        name: '修改',
					        type: 'line',
					        smooth: true,
					        data: [2, 3, 4, 4, 5, 3, 4]
					    },
						{
						    name: '调用',
						    type: 'line',
						    smooth: true,
						    data: [10, 11, 12, 12, 13, 14, 15]
						}]
				});
			}
		}

	}
</script>

<style scoped>
	.addTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}

	.statistical {
		background-color: white;
		border-radius: 25px;
		margin: 30px;
		padding: 25px;
	}

	.addForm {
		width: 1000px;
		min-height: 500px;
	}
	
	#myChart{
		width: 600px;
		 height: 500px;
		 float: left;
		 margin: 50px 20px 100px 0px;
	}
	#myTable{
		float: right;
		width: 300px;
		 height: 200px;
		 margin: 50px 0px 100px 0px;
	}
</style>
