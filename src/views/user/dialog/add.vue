<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogTableVisible"
    :modal-append-to-body="false"
    @opened="open"
    @close="close"
    width="700px"
    :close-on-click-modal="false"
  >
    <el-form :model="data.form" ref="formName" :rules="rules2">
      <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
        <el-input v-model="data.form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
        <el-input type="password" v-model="data.form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth" prop="truename">
        <el-input v-model="data.form.truename" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
        <el-input type="number" v-model="data.form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="地区：" :label-width="formLabelWidth">
        <cityPicker
          :cityPickerData.sync="data.cityPickerData"
          :cityChoose="['provice','city','area','street']"
        />
        {{data.cityPickerData}}
      </el-form-item>
      <el-form-item label="是否启用：" :label-width="formLabelWidth" prop="dd">
        <el-radio v-model="data.form.status" label="1" active-value="1">启用</el-radio>
        <el-radio v-model="data.form.status" label="2" active-value="1">禁用</el-radio>
      </el-form-item>
      <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
        <el-checkbox-group v-model="data.form.role">
          <el-checkbox
            v-for="(item,index) in data.queryRole"
            :key="index"
            :label="item.role"
          >{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取消</el-button>
      <el-button type="danger" @click="submitUser('formName')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { GetRole, addUser, userEdit } from "@/api/user.js";
import cityPicker from "@/components/cityPicker/index";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import EventBus from "@/utils/eventBus"; //引入事件车 中央事件
import { stripscript, checkRegEmial, checkRegPass } from "@/utils/reg"; //引入正则校验

export default {
  components: { cityPicker },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { root, emit, refs }) {
    //事件车函数 注册的方法
    EventBus.$on("showFn", data => {
      console.log(data);
    });

    const data = reactive({
      cityPickerData: {}, //城市选择返回的数据
      role: [],
      queryRole: [],
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: "",
        status: "1",
        role: []
      }
    });
    //ref
    const dialogTableVisible = ref(false); //窗口是否关闭
    const formLabelWidth = ref("90px");

    /**
     * 表单校验部分
     */

    // 校验用户名
    let checkEmail = (rule, value, callback) => {
      let ddvalue = data.form.username;
      if (!ddvalue) {
        return callback(new Error("用户名不能为空"));
      } else if (checkRegEmial(ddvalue)) {
        return callback(new Error("请输入合法的用户名"));
      } else {
        callback();
      }
    };
    // 校验密码
    let checkPassword = (rule, value, callback) => {
      //校验密码
      if (data.form.id && !value) {
        callback();
      }
      if ((data.form.id && value) || !data.form.id) {
        if (value) {
          data.form.password = stripscript(value);
          value = data.form.password;
        }
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (checkRegPass(value)) {
          return callback(new Error("密码为6-20位数字加字母组合"));
        } else {
          callback();
        }
      }
    };
    //定义表单校验规则
    const rules2 = {
      username: [
        { validator: checkEmail, trigger: "blur" } //校验邮箱
      ],
      password: [
        { validator: checkPassword, trigger: "blur" } //密码
      ],
      role: [
        { required: true, message: "角色不能为空", trigger: "blur" } //角色
      ]
    };

    /*
      获取用户角色的接口
    */
    const open = () => {
      GetRole().then(res => {
        data.queryRole = res.data.data;
      });
      let editData = props.editData;
      if (editData.id) {
        editData.role = editData.role.split(",");
      } else {
        data.form.id && delete data.form.id;
      }
      for (let key in editData) {
        data.form[key] = editData.id ? editData[key] : "";
      }
      data;
    };

    //watch
    watch(() => {
      dialogTableVisible.value = props.flag;
    });

    const close = () => {
      dialogTableVisible.value = false;
      emit("update:flag", false); // 利用sync反向修改flag的值
      emit("update:editData", {});
      resetFrom();
    };

    //重置表单
    const resetFrom = formName => {
      data.cityPickerData = {};
      refs.formName.resetFields();
    };

    //用户提交
    const submitUser = () => {
      refs.formName.validate(valid => {
        if (valid) {
          let requsetData = Object.assign({}, data.form);
          requsetData.role = requsetData.role.join(); //数组转字符串
          requsetData.region = JSON.stringify(data.cityPickerData);
          // console.log(requsetData);
          if (requsetData.id) {
            if (requsetData.password) {
              requsetData.password = requsetData.password;
            } else {
              delete requsetData.password;
            }
            userEditFn(requsetData);
          } else {
            userAddFn(requsetData);
          }
        } else {
          console.log("未通过");
          return false;
        }
      });
    };
    const userAddFn = params => {
      addUser(params).then(res => {
        if (res.data.resCode == 0) {
          root.$message.success("用户添加成功");
        }
        close();
        emit("referParentFn");
      });
    };
    const userEditFn = params => {
      userEdit(params).then(res => {
        console.log(res);
        if (res.data.resCode == 0) {
          root.$message.success("用户修改成功");
        }
        close();
        emit("referParentFn");
      });
    };

    return {
      data,
      dialogTableVisible,
      formLabelWidth,
      close,
      open,
      submitUser,
      resetFrom,
      rules2,
      userAddFn,
      userEditFn
    };
  }
};
</script>

<style lang="scss" scoped>
</style>


