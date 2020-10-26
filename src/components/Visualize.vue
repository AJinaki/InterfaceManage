<template>
	<div class="visdiv">
		<div class="vishead-full">
			<b style="font-size: 35px;">可视化链路全局图</b>
			<div class="vishead-btn" @click="refreshLink" style="margin-left: 120px;">
				<a-icon type="redo" style="font-size: 26px;" /><b>刷新</b>
			</div>
			<div class="vishead-btn" @click="initFullScreen">
				<a-icon type="fullscreen" style="font-size: 26px;" /><b>全屏</b>
			</div>
			<div class="vishead-btn" @click="">
				<a-icon type="question" style="font-size: 26px;" /><b>帮助</b>
			</div>
		</div>
		<div id="linkChart"></div>
		<transition name="bounce">
			<div v-if="isFullScreen" class="fullScreenDiv visdiv">
				<div class="vishead-full">
					<b style="font-size: 35px;">可视化链路全局图</b>
					<div class="vishead-btn" @click="refreshLink">
						<a-icon type="redo" style="font-size: 26px;" /><b>刷新</b>
					</div>
					<div class="vishead-btn" @click="exitFullScreen">
						<a-icon type="fullscreen-exit" style="font-size: 26px;" /><b>关闭</b></div>
				</div>
				<div id="linkChartFull"></div>
			</div>
		</transition>
		<transition name="fade">
			<div class="loadingDiv" v-if="isLoading">
				<a-spin :spinning="isLoading" style="margin-left: -200px;margin-top: -60px;">
				</a-spin>
			</div>
		</transition>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import systemIcon from '../assets/systemIcon.png'
	import pointer from '../assets/pointer.png'
	import request from '../utils/request.js'
	export default {
		data() {
			return {
				LinkNodesData: [],
				LineMapsData: [],
				isFullScreen: false,
				isLoading: true,
				screenWidth: document.body.clientWidth,
				screenHeight: document.body.clientHeight,
			}
		},
		methods: {
			initEchart(idName) {
				console.log(idName);
				let dom = document.getElementById(idName);
				this.myChart = echarts.init(dom);
				let option = {
					animationDurationUpdate: 1500,
					animationEasingUpdate: 'quinticInOut',
					tooltip: {

					},
					series: [{
						roam: true,
						focusNodeAdjacency: true,
						type: 'graph',
						//节点关系信息
						links: this.LineMapsData,
						//节点信息
						data: this.LinkNodesData,
						//展示方式 force力引导方式
						layout: 'force',
						force: {
							repulsion: 2500,
							edgeLength: [10, 50]
						},
						//节点样式
						symbol: `image://${pointer}` /* 'roundRect' */ /* `image://${imgSrc}` */ ,
						symbolSize: 40,
						edgeSymbolSize: [4, 10],
						roam: true,
						itemStyle: {
							color: '#0a3f8b',
							shadowColor: '#d2d2d2',
							shadowBlur: 20
						},
						label: {
							show: true,
							fontWeight: "normal",
							fontSize: 15,
							position: 'bottom'
						},
						//关系线
						edgeLabel: {
							normal: {
								formatter: "{c}",
								show: true,
								color: '#fff',
							}
						},
						//关系线头尾类型
						edgeSymbol: ['circle', 'arrow'],
						//关系线样式
						lineStyle: {
							color: '#3d4a64',
							width: 2,
							curveness: 0.3
						},
						//悬浮提示框样式
						tooltip: {
							/* formatter: '{b}', */
							formatter: function(node) { // 区分连线和节点，节点上额外显示其他数字
								if (node.data.name == null) {
									return '关系线';
								}
								let value = '';
								if (node.category != null && !node.category) {
									return "系统：" + node.data.name;
								} else {
									return "服务：" + node.data.name;
								}
							},
							backgroundColor: '#fff',
							extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);padding: 15px;border-radius: 15px',
							textStyle: {
								color: '#3d4a64'
							}
						},
						//样式目录，节点可以匹配
						categories: [{
							name: 'system',
							symbol: `image://${systemIcon}`,
							symbolSize: 65,
							itemStyle: {
								color: '#3d4a64'
							}
						}]
					}]
				};
				this.myChart.setOption(option);
				this.myChart.on('click', function(params) {
					console.log(params.data) //获取点击的头像的数据信息
				});
			},
			refreshLink() {
				this.isLoading = true;
				let that = this;
				setTimeout(function() {
					that.getLinkNodes();
				}, 500)
			},
			getLinkNodes() {
				request({
					url: '/5/getLinkNodes/B',
					method: 'get'
				}).then(res => {
					this.LinkNodesData = res;
					//console.log("LinkNodes"+JSON.stringify(res));
					this.getLineMaps();
				}).catch(error => {
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			getLineMaps() {
				request({
					url: '/5/getLineMaps/B',
					method: 'get'
				}).then(res => {
					this.LineMapsData = res;
					//console.log("LineMaps"+JSON.stringify(res));
					this.initEchart('linkChart');
					this.isLoading = false;
				}).catch(error => {
					this.$message.error('出现了某些错误！请联系管理员');
					console.log(error.response);
				})
			},
			initFullScreen() {
				this.isFullScreen = true;
				this.$nextTick(function() {
					this.initEchart('linkChartFull');
				})
			},
			exitFullScreen() {
				this.isFullScreen = false;
				this.$nextTick(function() {
					this.initEchart('linkChart');
				})
			}
		},
		mounted() {
			const that = this;
			window.onresize = () => {
				return (() => {
					window.screenWidth = document.body.clientWidth;
					window.screenHeight = document.body.clientHeight;
					that.screenWidth = window.screenWidth;
					that.screenHeight = window.screenHeight;
				})()
			}
			that.refreshLink();
		},
		watch: {
			screenWidth(val) {
				this.screenWidth = val
				//console.log("窗口宽度发生变化：" + val);
				this.myChart.resize();
			},
			screenHeight(val) {
				this.screenHeight = val
				//console.log("窗口高度发生变化：" + val);
				this.myChart.resize();
			},
		}
	}
</script>

<style>
	.visdiv {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.loadingDiv {
		width: 100%;
		height: 100%;
		position: fixed;
		justify-content: center;
		align-items: center;
		background-color: rgb(252 57 57 / 0.1);
		display: flex;
	}

	.vishead-full {
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

	.vishead-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 60px;
		transition: all 0.3s;
		border-radius: 13px;
		cursor: pointer;
		color: #bec9dc;
	}

	.vishead-btn:hover {
		color: #EE4B56;
		background-color: #FFF2F6;
	}

	#linkChart,
	#linkChartFull {
		width: 100%;
		flex: 1;
		/* border: 1px solid lightgray; */
		/* margin: 50px; */
	}

	.fullScreenDiv {
		background-color: #F3F7FA;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	/*
	 动画效果
	*/
	.fade-enter-active {
		transition: all .3s;
	}

	.fade-leave-active {
		transition: all .3s;
	}

	.fade-enter,
	.fade-leave {
		opacity: 0;
	}

	.bounce-enter-active {
		animation: bounce-in .4s;
	}

	.bounce-leave-active {
		animation: bounce-out .4s;
	}

	@keyframes bounce-in {
		0% {
			transform: scale(0);
			opacity: 0;
		}

		80% {
			transform: scale(1.05);
			opacity: 0.8;
		}

		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes bounce-out {
		0% {
			transform: scale(1);
			opacity: 1;
		}

		20% {
			transform: scale(0.95);
			opacity: 0.8;
		}

		100% {
			transform: scale(1.05);
			opacity: 0;
		}
	}
</style>
