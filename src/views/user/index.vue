<template>
  <div class="user">
    <el-row>
      <el-col :span="20">
        <div class="labelWarp">
          <label>关键字</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <selectVue :config="data.selectConfig" />
                <!-- <el-select v-model="data.selectValue">
                  <el-option
                    v-for="(item,index) in data.option"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>-->
              </el-col>
              <el-col :span="4">
                <el-input v-model="data.inputVlue"></el-input>
              </el-col>
              <el-col :span="16">
                <el-button type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="diaoValue = true">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:30px">
      <tableVue :config="data.tableConfig" :tableRow.sync="data.tableRow" ref="tableFn">
        <template v-slot:status="slotData">
          <el-switch
            v-model="slotData.data.status"
            active-value="1"
            inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
        <template v-slot:tableFooterLeft>
          <el-button size="small" type="danger" @click="removeAll">批量删除</el-button>
        </template>
        <template v-slot:operate="slotData">
          <el-button size="small" type="danger" @click="del(slotData.data)">删除</el-button>
          <el-button size="small" type="success">编辑</el-button>
        </template>
      </tableVue>
    </div>
    <addUser :flag="diaoValue" @close="fn" />
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";
import tableVue from "@c/table/index.vue";
import selectVue from "@c/select/index.vue";
import addUser from "./dialog/add";
import { delUser } from "@/api/user";
import { global } from "@/utils/global_3.x.js"; //导入全局函数 删除提示函数
export default {
  components: { selectVue, tableVue, addUser },
  setup(props, { root, refs }) {
    const { confirm } = global(); //导出global里面定义的函数
    const diaoValue = ref(false); //控制弹出框是否显示
    const data = reactive({
      tableRow: {}, //删除选中的id
      selectConfig: {
        //下拉框组件传参的内容
        init: ["name", "phone"]
      },
      tableConfig: {
        //表格组件传参的内容
        selection: true, //表格前面是否有多选框
        requestDataList: {
          url: "getUserList",
          method: "post",
          data: {
            pageNumber: 1,
            pageSize: 10
          }
        },
        tHead: [
          {
            prop: "username",
            label: "用户名"
          },
          {
            prop: "truename",
            label: "真实姓名"
          },
          {
            prop: "phone",
            label: "手机号"
          },
          {
            prop: "region",
            label: "地区"
          },
          {
            prop: "role",
            label: "角色"
          },
          {
            label: "用户是否启用",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operate"
          }
        ]
      },
      inputVlue: ""
    });

    const del = params => {
      data.tableRow.rowId = [params.id];
      confirm({
        content: "是否确认删除当前选中的用户！！",
        fn: confirmFn
      });
    };
    //批量删除函数
    const removeAll = () => {
      if (!data.tableRow.rowId || data.tableRow.rowId.length == 0) {
        root.$message.error("请选择需要删除的用户！！！");
        return false;
      }
      confirm({
        content: "是否确认删除当前选中的用户！！",
        fn: confirmFn
      });
    };

    const confirmFn = () => {
      delUser({ id: data.tableRow.rowId }).then(res => {
        if (res.data.resCode == 0) {
          root.$message.success("删除成功");
          refs.tableFn.callbackUserTable(); //回调子组件的方法
        } else {
          root.$message.error("删除失败");
        }
      });
    };

    //关闭弹窗函数
    const fn = () => {
      diaoValue.value = false;
    };
    return {
      data,
      del,
      diaoValue,
      fn,
      removeAll,
      confirmFn
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.user {
  .labelWarp {
    @include labelWarp(left, 60, 40);
  }
}
</style>


