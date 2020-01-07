<template>
  <div class="infoList">
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>分类：</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue" clearable placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options.item"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="label-wrap date">
          <label for>时间:&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%"
            ></el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap keyWord">
          <label for>关键字:&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="keyWord" style="width:100%">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap">
          <div class="wrap-content">
            <el-input v-model="inputValue" style="width:100%"></el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="2">
        <div class="label-wrap">
          <div class="wrap-content">
            <el-button type="danger">搜索</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap" style="float:right">
          <div class="wrap-content">
            <el-button type="danger" @click="diaoValue = true">新建</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 表格部分 -->
    <div class="tableWrap">
      <el-table
        :data="tableData.item"
        :header-cell-style="{background:'pink',color:'#606266',fontWeight:'bold'}"
        border
        v-loading="tableLoading"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center" width="830"></el-table-column>
        <el-table-column
          prop="categoryId"
          label="类型"
          align="center"
          width="130"
          :formatter="restCategory"
        ></el-table-column>
        <el-table-column
          prop="createDate"
          label="日期"
          align="center"
          width="237"
          :formatter="restDate"
        ></el-table-column>
        <el-table-column prop="user" label="管理员" align="center" width="115"></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="success" size="small">编辑</el-button>
            <el-button type="danger" size="small" @click="delInfoList">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-row>
        <el-col :span="12">
          <el-button @click="delInfoListAll">批量删除</el-button>
        </el-col>

        <el-col :span="12">
          <el-pagination
            style="float:right"
            background
            layout="total,prev, pager, next"
            @current-change="changePage"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <!--弹出框部分-->
    <Dialog :flag="diaoValue" @close="fn" :catagory="options.item" />
  </div>
</template>

<script>
import Dialog from "./dialog/index";
import { global } from "@/utils/global_3.x.js"; //导入全局函数
import { GetNewsList } from "@/api/info";
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";
import { getCategory } from "@/api/login";
import { common } from "@/utils/common.js"; //引入获取信息分类全局函数
import { formatDate } from "@/utils/date.js";

export default {
  components: { Dialog },
  setup(props, { root }) {
    const { confirm, str } = global(); //导出global里面定义的函数
    const { categoryItem, getCategoryInfo } = common();
    //ref
    const categoryValue = ref("");
    const dateValue = ref("");
    const keyWord = ref("1");
    const inputValue = ref("");
    const diaoValue = ref(false); //控制弹出框是否显示
    const total = ref(0);
    const tableLoading = ref(false); //默认加载框

    //reactive
    const options = reactive({
      item: []
    });
    const options2 = reactive([
      {
        value: "1",
        label: "ID"
      },
      {
        value: "2",
        label: "标题"
      }
    ]);
    const tableData = reactive({
      item: []
    });

    //定义函数
    const fn = () => {
      diaoValue.value = false;
    };
    //信息删除函数 delInfoListAll
    const delInfoList = () => {
      // root.confirm({
      //     content:'是否确认删除当前信息！！',
      //     id:'2222',
      //      fn:confirmFn,
      // })
      confirm({
        content: "是否确认删除当前信息！！",
        id: "2222",
        fn: confirmFn
      });
    };

    //信息批量删除函数 delInfoListAll
    const delInfoListAll = () => {
      confirm({
        content: "是否确认删除当前选中的所有信息！！",
        fn: confirmFn,
        id: "1111"
      });
    };
    //定义确认删除回调函数
    const confirmFn = value => {
      console.log(value);
    };

    //获取新闻列表函数
    const getNewsList = page => {
      // categoryId: 分类ID（number）
      // startTiem: 开始时间（string）
      // endTime: 结束时间（string）
      // title: 标题（string）
      // id: 信息ID（number）
      // pageNumber: 页码（number）*
      // pageSize: 条数（number）*
      let data = {
        pageNumber: page,
        pageSize: 10
      };
      tableLoading.value = true;
      GetNewsList(data).then(res => {
        tableData.item = res.data.data.data;
        total.value = res.data.data.total;
        tableLoading.value = false;
      });
    };

    //分页
    const changePage = page => {
      getNewsList(page);
    };

    //重置时间
    const restDate = row => {
      let newDate = formatDate(JSON.parse(row.createDate));
      return newDate;
      // console.log(newDate);
    };

    //重置分类
    const restCategory = row => {
      let newCategory = options.item.filter(
        item => item.id == row.categoryId
      )[0];
      return "555";
      // console.log(newCategory);
      // if (!newCategory.category_name) {
      //   return "ddddd";
      // } else {
      //   return newCategory.category_name;
      // }
    };

    watch(
      () => categoryItem.item,
      value => {
        options.item = value;
      }
    );

    /*
      生命周期函数
    */
    onMounted(() => {
      getCategoryInfo();
      getNewsList(1);
      root.$store
        .dispatch("common/getInfoCategory")
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    });

    return {
      //ref
      inputValue,
      categoryValue,
      dateValue,
      keyWord,
      diaoValue,
      total,
      tableLoading,

      //reactive
      options,
      options2,
      tableData,

      //自定义函数
      fn,
      delInfoList,
      delInfoListAll,
      confirmFn,
      getNewsList,
      changePage,
      restDate,
      restCategory
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.infoList {
  .label-wrap {
    &.category {
      @include labelWarp(left, 60, 60);
    }
    &.date {
      @include labelWarp(right, 83, 110);
    }
    &.keyWord {
      @include labelWarp(right, 80, 100);
    }
  }
  .tableWrap {
    margin-top: 20px;
  }
  .footer {
    margin-top: 30px;
  }
}
</style>


