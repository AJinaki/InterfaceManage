<template>
	<div class="addDiv">
		<div class="loadingDiv">
		    <a-spin :spinning="isSpinning" tip="提交中...." />
		</div>
		<div class="addTitle">添加新的通讯信息</div>
		<a-divider />
		<div class="addForm">
			<a-form :form="form" @submit="onSubmit">
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
				<!-- <a-form-item v-bind="formItemLayout" label="行级所属" has-feedback>
					<a-input v-decorator="[ 'hj', { rules: [ { required: true, message: '请填写该人员所属的行级单位，如总行!' } ] } ]" />
				</a-form-item> -->
				<a-form-item v-bind="formItemLayout" label="职务" has-feedback>
					<a-input v-model="addFormOthers.position" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="部门" has-feedback>
					<a-input v-decorator="[ 'department', { rules: [ { required: true, message: '部门不能为空!', } ], }, ]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="所属团队" hasFeedback>
					<a-input v-model="addFormOthers.team" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="办公电话" has-feedback>
					<a-input v-model="addFormOthers.officeTel"/>
					</a-input>
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="移动电话" hasFeedback>
					<a-input v-decorator="[ 'mobileTel', { rules: [ { required: true, message: '移动电话不能为空!' } ] } ]" />
				</a-form-item>
				<a-form-item v-bind="formItemLayout" label="备用电话" has-feedback>
					<a-input v-model="addFormOthers.backupTel"/>
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
					<a-select v-decorator="[ 'kind', { rules: [{ required: true, message: '编制类型不能为空!' }] }, ]" >
						<a-select-option value="1">
							行编
						</a-select-option>
						<a-select-option value="0">
							厂商/外包
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-button type="danger" html-type="reset" size="large" style="width: 100px">
					重置
				</a-button>
				<a-button type="primary" html-type="submit" size="large" style="width: 100px;margin-left: 40px;">
					添加
				</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script>
	import request from '../utils/request.js'
	export default {
		data() {
			return {
				confirmDirty: false,
				isSpinning: false,
				addFormOthers: {
					position: '',
					team: '',
					officeTel: '',
					backupTel: ''
				},
				formItemLayout: {
					labelCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 8
						},
					},
					wrapperCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 16
						},
					},
				},
				HJData: [],
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'addAddress'
			});
		},
		methods: {
			onSubmit(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						this.isSpinning = true;
						var others = this.addFormOthers;
						request({
							url: '/AddressBackEnd/insertAddress',
							method: 'post',
							/* data: {
								name
							}, */
							params: {
								name : values.name,
								hj : values.hj,
								position : others.position,
								department : values.department,
								team : others.team,
								officeTel : others.officeTel,
								mobileTel : values.mobileTel,
								backupTel : others.backupTel,
								email : values.email,
								kind : values.kind,
							}
						}).then(res => {
							console.log(res.result)
							if (res.result == null || res.result == "") {
								/* 查询结果为空 */
							}
							this.isSpinning = false;
							this.$router.push("/Success");
						}).catch(error => {
							this.isTBLoading = false;
							this.$message.error('出现了某些错误！请联系管理员');
							console.log(error.response);
						})
					}
				});
			},
			filterOption(input, option) {
				return (
					option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
				);
			},
		},
		created() {
			//console.log("mode: " + this.$store.state.mode);
			if (this.$store.state.mode != "C") {
				this.advancemode = true;
			}
			request({
				url: '/AddressBackEnd/getAllHJAndDEPAndTeam',
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
	.loadingDiv{
		
	}
	
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
	
	.addForm{
		max-width: 450px;
	}
</style>
