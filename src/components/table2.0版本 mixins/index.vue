<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column v-if="tableConfig.selection" type="selection" width="55" align="center"></el-table-column>

      <!-- 带插槽的table-->
      <template v-for="(item,index) in tableConfig.tHead">
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

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.pageNumber"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
    ></el-pagination>
  </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { LoadTableData } from "@/api/common";
import loadTableData from "@/mixins/loadTableData";
import Pagination from "@/mixins/page";
export default {
  mixins: [loadTableData, Pagination],
  data() {
    return {
      tableConfig: {
        selection: true,
        tHead: [],
        requestDataList: {}
      },
      tableData: [],
      total: 0
    };
  },
  methods: {
    initTableConfig() {
      let configData = this.config;
      let keys = Object.keys(this.tableConfig);
      for (let key in configData) {
        if (keys.includes(key)) {
          //es6的方法
          this.tableConfig[key] = configData[key];
        }
      }
    }
  },

  beforeMount() {
    this.initTableConfig();
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>