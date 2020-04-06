<template>
  <div class="user">
    <el-row>
      <el-col :span="20">
        <div class="labelWarp">
          <label>关键字</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <selectVue :config="data.selectConfig" :selectData.sync="data.selectData" />
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
                <el-button type="danger" @click="search" v-if="showBtn('user:search')">搜索</el-button>
              </el-col>
              <!-- <el-col :span="4">
                <el-button type="danger" @click="fnn">触发</el-button>
              </el-col>-->
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button
          type="danger"
          class="pull-right"
          @click="diaoValue = true"
          v-if="showBtn('user:add')"
        >添加用户</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:30px">
      <tableVue :config="data.tableConfig" :tableRow.sync="data.tableRow" ref="tableFn">
        <template v-slot:status="slotData">
          <el-switch
            @change="changeStatus(slotData.data)"
            v-model="slotData.data.status"
            active-value="1"
            inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
        <template v-slot:tableFooterLeft>
          <el-button
            size="small"
            type="danger"
            @click="removeAll"
            v-if="showBtn('user:batchDel')"
          >批量删除</el-button>
        </template>
        <template v-slot:operate="slotData">
          <el-button
            size="small"
            type="danger"
            @click="del(slotData.data)"
            v-if="showBtn('user:del')"
          >删除</el-button>
          <el-button
            size="small"
            type="success"
            @click="handerEdit(slotData.data)"
            v-if="showBtn('user:edit')"
          >编辑</el-button>
        </template>
      </tableVue>
    </div>
    <addUser
      :flag.sync="diaoValue"
      @close="fn"
      @referParentFn="referFn"
      :editData.sync="data.editData"
    />
    <A aaa="111" bbb="2222" v-on:xfFn="XFGG" />
    <!-- <addUser :flag.sync="diaoValue" /> -->
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch,
  provide
} from "@vue/composition-api";
import tableVue from "@c/table/index.vue";
import selectVue from "@c/select/index.vue";
import addUser from "./dialog/add";
import { delUser, userActive, searchList } from "@/api/user";
import { global } from "@/utils/global_3.x.js"; //导入全局函数 删除提示函数
import EventBus from "@/utils/eventBus"; //引入事件车 中央事件
import A from "./dialog/test/a";

export default {
  components: { selectVue, tableVue, addUser, A },
  setup(props, { root, refs }) {
    provide("customVal", "我是父组件向子组件传递的值");
    const { confirm } = global(); //导出global里面定义的函数
    const diaoValue = ref(false); //控制弹出框是否显示
    const data = reactive({
      selectData: {}, //下拉框存值
      editData: {}, //编辑数据所储存的内容
      tableRow: {}, //删除选中的id
      selectConfig: {
        //下拉框组件传参的内容
        init: ["truename", "phone"]
      },
      handerUserSwitch: false,
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
    // const fnn = () => {
    //   EventBus.$emit("showFn", { a: 11111 });
    // };
    const XFGG = () => {
      console.log("这是一个孙子组件调用父组件的方法");
    };

    const del = params => {
      data.tableRow.rowId = [params.id];
      confirm({
        content: "是否确认删除当前选中的用户！！",
        fn: confirmFn
      });
    };

    /*
     编辑
    */
    const handerEdit = params => {
      diaoValue.value = true;
      data.editData = Object.assign({}, params);
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
          referFn();
        } else {
          root.$message.error("删除失败");
        }
      });
    };
    //用户是否启用函数
    const changeStatus = params => {
      if (data.handerUserSwitch) {
        return false;
      }
      data.handerUserSwitch = true;

      userActive({ id: params.id, status: params.status })
        .then(r => {
          if (r.data.resCode == 0) {
            root.$message.success(r.data.message);
            data.handerUserSwitch = !data.handerUserSwitch;
          } else {
            root.$message.error("修改失败");
          }
        })
        .catch(err => {
          data.handerUserSwitch = !data.handerUserSwitch;
          console.log(err);
        });
    };

    //刷新数据请求函数
    const referFn = () => {
      refs.tableFn.callbackUserTable(); //回调子组件的方法
    };

    //搜索函数
    const search = () => {
      console.log(data.selectData.value);
      let requestData = {
        [data.selectData.value]: data.inputVlue
      };
      refs.tableFn.paramsLoadData(requestData);
    };

    //关闭弹窗函数
    const fn = val => {
      console.log(val);
    };
    return {
      data,
      del,
      diaoValue,
      fn,
      removeAll,
      confirmFn,
      XFGG,
      referFn,
      changeStatus,
      handerEdit,
      search
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


