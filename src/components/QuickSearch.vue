<template>
	<div class="rootDiv">
		<div class="searchDiv">
			<transition>
				<img v-if="isshowLogo" src="../assets/banner.png" style="height: 80px;" />
			</transition>
			<a-input-search placeholder="请输入要查询的员工姓名" size="large" @search="onSearch" @change="onValueChange" style="margin-top: 20px;"
			 v-decorator="['searchcontent',{ rules: [{ required: true, message: '请输入要查询的员工姓名！' }] },]">
				<a-button slot="enterButton" type="primary" :loading="isBtnLoading">
					查询
				</a-button>
			</a-input-search>
			<a-alert v-if="isShowWarning" style="margin-top: 10px;" message="请输入要查询的员工姓名!" type="warning" :after-close="setInVisiable"
			 show-icon closable />
		</div>
		<div class="resultDiv" v-if="isResShow">
			<div v-if="!isResNull">
				<a-list :grid="{ gutter: 16, column: 3 }" :data-source="srhResult" >
					<a-list-item slot="renderItem" slot-scope="item, index">
						<a-card hoverable :bordered="false" @click="showModal(index)">
							<a-card-meta :title="item.name + '   ' + item.department" :description="item.position">
								<a-avatar slot="avatar" size="large" icon="user" />
							</a-card-meta>
						</a-card>
					</a-list-item>
					<div slot="footer" style="text-align: center;">
						<a-icon type="smile" style="font-size: 16px;margin-right: 5px;" />已经到底啦~
					</div>
				</a-list>
			</div>
			<a-empty v-else description="没有找到您搜索的通讯信息" />
		</div>
		<a-modal :visible="isInfvisible" style="adrDialog">
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
				<a-button type="primary" @click="onOKClick">
					关闭
				</a-button>
			</template>
		</a-modal>
	</div>
</template>

<script>
	import request from '../utils/request.js'
	export default {
		data() {
			return {
				isshowLogo: true,
				isBtnLoading: false,
				isShowWarning: false,
				isResShow: false,
				isResNull: true,
				isInfvisible: false,
				confirmLoading: false,
				anUserData: [],
				srhResult: []
			}
		},
		methods: {
			onSearch(value) {
				//console.log(value);
				if (value != null && value != "") {
					this.isBtnLoading = true;
					var name = value
					request({
						url: '/AddressBackEnd/getArsByName',
						method: 'post',
						/* data: {
							name
						}, */
						params: {
							name
						}
					}).then(res => {
						//console.log(res.result)
						if (res.result != null && res.result != "") {
							this.isshowLogo = false;
							this.isResNull = false;
							this.srhResult = res.result;
						} else {
							this.isshowLogo = true;
							this.isResNull = true;
						}
						this.isBtnLoading = false;
						this.isResShow = true;
					}).catch(error => {
						this.isBtnLoading = false;
						this.$message.error('出现了某些错误！请联系管理员');
						console.log(error.response);
					})
				} else {
					this.isShowWarning = true;
				}
			},
			onValueChange(e) {

			},
			setInVisiable() {
				this.isShowWarning = false;
			},
			showModal(index) {
				this.isInfvisible = true;
				this.anUserData = this.srhResult[index];
			},
			onOKClick(e) {
				this.isInfvisible = false;
			}
		},
	};
</script>

<style>
	.rootDiv {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.searchDiv {
		margin-top: 100px;
		width: 500px;
	}

	.quickSerBar {}

	.resultDiv {
		width: 95%;
		margin: 30px;
		padding: 30px;
		background-color: white;
		border-radius: 25px;
		text-align: left;
	}

	.updateTitle {
		font-size: 35px;
		text-align: left;
		margin-bottom: 20px;
		margin-left: 20px;
	}

	.v-enter,
	.v-leave-to {
		opacity: 0;
		transform: translateY(-80px);
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.5S ease
	}
</style>
