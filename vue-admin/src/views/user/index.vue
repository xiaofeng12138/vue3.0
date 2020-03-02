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
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:30px">
      <tableVue :config="data.tableConfig">
        <template v-slot:status="slotData">
          <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
        <template v-slot:operate="slotData">
          <el-button size="small" type="danger" @click="del(slotData.data)">删除</el-button>
          <el-button size="small" type="success">编辑</el-button>
        </template>
      </tableVue>
    </div>
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
export default {
  components: { selectVue, tableVue },
  setup(props, { root }) {
    const data = reactive({
      selectConfig: {
        //下拉框组件传参的内容
        init: ["name", "phone"]
      },
      tableConfig: {
        //表格组件传参的内容
        selection: true, //表格前面是否有多选框
        requestDataList: {
          url: "getList",
          method: "post",
          data: {
            pageNumber: 1,
            pageSize: 10
          }
        },
        tHead: [
          {
            prop: "email",
            label: "邮箱"
          },
          {
            prop: "title",
            label: "真实姓名"
          },
          {
            prop: "phone",
            label: "手机号"
          },
          {
            prop: "address",
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
      console.log(params);
    };
    return {
      data,
      del
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


