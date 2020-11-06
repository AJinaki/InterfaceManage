<template>
  <div class="addDiv">
    <div v-if="!this.addStatus" class="addTitle">添加新的用户</div>
    <div v-else class="addTitle">编辑用户</div>
    <a-divider />
    <div class="addForm">
      <a-form :form="form" @submit="onSubmit">
        <a-form-item v-bind="formItemLayout" label="账号" has-feedback>
          <a-input
            v-decorator="[
					          'account',
					          {
					            rules: [
					              {
					                required: true,
					                message: '姓名不能为空！',
					              }
					            ],
					          },
					        ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
            v-decorator="[
					          'password',
					          {
					            rules: [
					              {
					                required: true,
					                message: '密码不能为空!',
					              }
					            ],
					          },
					        ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="用户类型" has-feedback>
          <a-select
            default-value="0"
            v-decorator="[
					          'userType',
					          {
					            rules: [
					              {
					                required: true,
					                message: '用户类型必须选择!'
					              }
					            ],
							  },]"
          >
            <a-select-option value="0">领导</a-select-option>
            <a-select-option value="1">架构师</a-select-option>
            <a-select-option value="2">项目经理</a-select-option>
            <a-select-option value="admin">超级管理员</a-select-option>
            <a-select-option value="3">测试人员</a-select-option>
            <a-select-option value="4">开发人员</a-select-option>
            <a-select-option value="5">运维人员</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item v-bind="formItemLayout" label="备注">
					<a-input v-model="remarks" />
        </a-form-item>-->
        <!-- <a-form-item> -->
        <!-- <a-button type="danger" html-type="reset" size="large" style="width: 100px;">
					重置
        </a-button>-->
        <a-button
          v-if="!addStatus"
          type="primary"
          @click="submit"
          html-type="submit"
          size="large"
          style="width: 100px;margin-left: 40px;"
        >添加</a-button>
        <a-button
          v-else
          type="primary"
          @click="submit"
          html-type="submit"
          size="large"
          style="width: 100px;margin-left: 40px;"
        >编辑</a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
      confirmDirty: false,
      remarks: "",
      addStatus:false,
      formItemLayout: {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 4
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 20
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "addAdmin"
    });
  },
  methods: {
    handleChange() {},
    submit() {},
    // submit(){
    // 		request({
    // 	url: '/3/user/register',
    // 	method: 'post',
    // 	// /* data: {
    // 	// 	name
    // 	// }, */
    // 	params: {
    // 		account:''
    // 	}
    // }).then(res => {
    // 	console.log(res)
    // 	if (res != null || res != "") {

    // 		this.tableData = res;
    // 	}
    // }).catch(error => {
    // 	this.$message.error('出现了某些错误！请联系管理员');
    // 	console.log(error.response);
    // })
    // },
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          var remarks = this.remarks;
          console.log("Received values of form: ", values);
          request({
            url: this.addStatus?"/3/user/update":"/3/user/register",
            method: "post",
            data: {
			  userId:this.userId,
              account: values.account,
              password: values.password,
              userType: values.userType
            }
            // params: {
            // 	account: values.account,
            // 	password: values.password,
            // 	userType: values.userType
            // }
          })
            .then(res => {
              console.log(res.result);
              if (res.result == null || res.result == "") {
                /* 查询结果为空 */
              }
              this.isSpinning = false;
              this.$router.push("/Success");
            })
            .catch(error => {
              this.isTBLoading = false;
              this.$message.error("出现了某些错误！请联系管理员");
              console.log(error.response);
            });
        }
      });
    }
    /* compareToFirstPassword(rule, value, callback) {
			  const form = this.form;
			  if (value && value !== form.getFieldValue('password')) {
			    callback('两次输入的密码不一致!');
			  } else {
			    callback();
			  }
			},
			validateToNextPassword(rule, value, callback) {
			  const form = this.form;
			  if (value && this.confirmDirty) {
			    form.validateFields(['confirmpass'], {
			      force: true
			    });
			  }
			  callback();
			} */
  },
  mounted() {
    if (this.$route.query.account) {
	  this.addStatus = true;
	  this.userId= this.$route.query.userId,
      this.form.setFieldsValue({
        account: this.$route.query.account,
        password: this.$route.query.password,
        userType: this.$route.query.userType
      });
      // this.form=this.$route.query
      // account=this.$route.query.account
    }
    console.log(this.$route.query);
  },
  created() {}
};
</script>

<style scoped>
.addTitle {
  font-size: 35px;
  text-align: center;
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
  margin: 0 auto;
}
created() {
}
</style>
