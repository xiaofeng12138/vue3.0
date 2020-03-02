<template>
  <div>
    <el-table :data="data.tableData" border style="width: 100%">
      <el-table-column v-if="data.tableConfig.selection" type="selection" width="55" align="center"></el-table-column>

      <!-- 带插槽的table-->
      <template v-for="(item,index) in data.tableConfig.tHead">
        <el-table-column
          v-if="item.columnType === 'slot'"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { reactive, ref, onBeforeMount, watch } from "@vue/composition-api";
import interfaceUrl from "@/api/interfaceUrl";
import { LoadTableData } from "@/api/common";
import { loadDataFn } from "./loaddata";
export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    const { getTableInfo, tableData } = loadDataFn();
    const data = reactive({
      tableConfig: {
        selection: true,
        tHead: [],
        requestDataList: {}
      },
      tableData: []
    });

    const initTableConfig = () => {
      //处理传过来的config项
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);
      for (let key in configData) {
        if (keys.includes(key)) {
          //es6的方法
          data.tableConfig[key] = configData[key];
        }
        // if (data.tableConfig[key]) {
        //   data.tableConfig[key] = configData[key];
        // }
      }
    };

    //监听请求数据函数里面的变化
    watch(
      () => tableData.item,
      (newValue, oldValue) => (data.tableData = newValue)
    );
    onBeforeMount(() => {
      initTableConfig();
      getTableInfo(data.tableConfig.requestDataList);
    });

    return {
      data,
      initTableConfig
    };
  }
};
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
</style>