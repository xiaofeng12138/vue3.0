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
    <el-form :model="data.form" ref="formName">
      <el-form-item label="用户名：" :label-width="formLabelWidth">
        <el-input v-model="data.form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth">
        <el-input type="password" v-model="data.form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth">
        <el-input v-model="data.form.truename" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" :label-width="formLabelWidth">
        <el-input type="number" v-model="data.form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="地区：" :label-width="formLabelWidth">
        <cityPicker
          :cityPickerData.sync="data.cityPickerData"
          :cityChoose="['provice','city','area','street']"
        />
        {{data.cityPickerData}}
      </el-form-item>
      <el-form-item label="是否启用：" :label-width="formLabelWidth">
        <el-radio v-model="data.form.status" label="1" active-value="1">启用</el-radio>
        <el-radio v-model="data.form.status" label="2" active-value="1">禁用</el-radio>
      </el-form-item>
      <el-form-item label="角色：" :label-width="formLabelWidth">
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
      <el-button type="danger" @click="submitUser">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { GetRole, addUser } from "@/api/user.js";
import cityPicker from "@/components/cityPicker/index";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  components: { cityPicker },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    catagory: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { root, emit, refs }) {
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

    /*
      获取用户角色的接口
    */
    const open = () => {
      GetRole().then(res => {
        data.queryRole = res.data.data;
      });
    };

    //watch
    watch(() => {
      dialogTableVisible.value = props.flag;
    });

    const close = () => {
      dialogTableVisible.value = false;
      emit("close", false);
      resetFrom();
    };

    //重置表单
    const resetFrom = () => {
      data.cityPickerData = {};
      data.form = {
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: "",
        status: "1",
        role: []
      };
    };

    //用户提交
    const submitUser = () => {
      let requsetData = {
        username: data.form.username,
        truename: data.form.truename,
        password: data.form.password,
        phone: data.form.phone,
        region: data.cityPickerData,
        status: data.form.status,
        role: data.form.role
      };
      if (!data.form.username) {
        root.$message.error("用户名不能为空");
        return false;
      }
      if (!data.form.password) {
        root.$message.error("密码不能为空");
        return false;
      }
      if (data.form.role.length == 0) {
        root.$message.error("角色不能为空");
        return false;
      }

      let resData = JSON.parse(JSON.stringify(requsetData));
      resData.role = resData.role.join();
      addUser(resData).then(res => {
        if (res.code == 0) {
          root.$message.success("用户添加成功");
        }
        close();
      });
    };

    return {
      data,
      dialogTableVisible,
      formLabelWidth,
      close,
      open,
      submitUser,
      resetFrom
    };
  }
};
</script>

<style lang="scss" scoped>
</style>


