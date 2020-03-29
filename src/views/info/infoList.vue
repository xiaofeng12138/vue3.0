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
              value-format="yyyy-MM-dd HH-mm-ss"
            ></el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap keyWord">
          <label for>关键字:&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <selectVue :config="data.selectConfig" />
            <!-- <el-select v-model="keyWord" style="width:100%">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
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
            <el-button type="danger" @click="search">搜索</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap" style="float:right">
          <div class="wrap-content">
            <el-button type="danger" @click="diaoValue = true" v-if="showBtn('info:add')">新增</el-button>
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
        @selection-change="SelectMany"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
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
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="delInfoList(scope.row.id)" v-if="showBtn('info:del')">删除</el-button>
            <el-button type="success" size="small" @click="editInfo(scope.row.id)" v-if="showBtn('info:edit')">编辑</el-button>
            <el-button
              type="success"
              size="small"
              @click="infoDetailed(scope.row)"
              style="margin-left:10px"
              v-if="showBtn('info:detailed')"
            >编辑详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-row>
        <el-col :span="12">
          <el-button @click="delInfoListAll" v-if="showBtn('info:batchDel')">批量删除</el-button>
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
    <Dialog
      :flag.sync="diaoValue"
      @close="fn"
      :catagory="options.item"
      @gitInfoEmit="getNewsList(1)"
    />
    <EditDialog
      :flag="diaoValue_edit"
      @close="diaoValue_edit = false"
      :catagory="options.item"
      :id="infoId"
      @gitInfoEmit="getNewsList(1)"
    />
  </div>
</template>

<script>
import selectVue from "@c/select/index.vue"; //引入封装的select
import Dialog from "./dialog/index";
import EditDialog from "./dialog/edit";
import { global } from "@/utils/global_3.x.js"; //导入全局函数
import { GetNewsList, DelNewsInfo } from "@/api/info";
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";
import { getCategory } from "@/api/login";
import { common } from "@/utils/common.js"; //引入获取信息分类全局函数
import { formatDate } from "@/utils/date.js"; //日期处理函数

export default {
  components: { Dialog, EditDialog, selectVue },
  setup(props, { root }) {
    const data = reactive({
      selectConfig: {
        init: ["id", "title"]
      } //组件传值
    });
    const { confirm, str } = global(); //导出global里面定义的函数
    const { categoryItem, getCategoryInfo } = common();
    //ref
    const categoryValue = ref("");
    const dateValue = ref("");
    const keyWord = ref("id");
    const inputValue = ref("");
    const diaoValue = ref(false); //控制弹出框是否显示
    const total = ref(0);
    const tableLoading = ref(false); //默认加载框
    const delId = ref(""); //默认加载框
    const diaoValue_edit = ref(false);
    const infoId = ref(""); //传递编辑框的信息ID

    //reactive
    const options = reactive({
      item: []
    });
    const options2 = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
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
    const delInfoList = row => {
      delId.value = [row];
      console.log(delId.value);
      confirm({
        content: "是否确认删除当前信息！！",
        fn: confirmFn
      });
    };

    //信息批量删除函数 delInfoListAll
    const delInfoListAll = () => {
      if (delId.value == "" || delId.value.length === 0) {
        root.$message.error("请选择需要删除的选项");
        return false;
      }
      confirm({
        content: "是否确认删除当前选中的所有信息！！",
        fn: confirmFn
      });
    };
    //定义确认删除回调函数
    const confirmFn = value => {
      let data = {
        id: delId.value
      };
      DelNewsInfo(data)
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message.success(res.data.message);
            delId.value = "";
          }
          getNewsList(1);
        })
        .catch(err => {
          console.log(err);
        });
    };

    //数据搜索函数
    const search = () => {
      let data = FormatData(); //搜索条件

      tableLoading.value = true;
      GetNewsList(data).then(res => {
        tableData.item = res.data.data.data;
        total.value = res.data.data.total;
        tableLoading.value = false;
      });
      // getNewsList(1)
    };

    //处理搜索条件参数
    const FormatData = () => {
      let requsetData = {
        pageNumber: 1,
        pageSize: 10
      };
      if (categoryValue.value) {
        requsetData.categoryId = categoryValue.value;
      }
      if (dateValue.value.length > 0) {
        requsetData.startTiem = dateValue.value[0];
        requsetData.endTime = dateValue.value[1];
      }
      requsetData[keyWord.value] = inputValue.value;
      return requsetData;
    };

    //获取新闻列表函数
    const getNewsList = page => {
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
    };

    //重置分类
    const restCategory = row => {
      let newCategory = options.item.filter(
        item => item.id == row.categoryId
      )[0];
      return newCategory.category_name;
    };

    //表格多选函数
    const SelectMany = val => {
      delId.value = val.map(item => item.id);
      console.log(delId.value);
    };

    //信息编辑函数
    const editInfo = id => {
      // console.log(id)
      infoId.value = id;
      diaoValue_edit.value = true;
    };

    /*
     信息分类详情
    */
    const infoDetailed = data => {
      // console.log(data)
      root.$store.commit("infoDetailed/SET_ID", data.id);
      root.$store.commit("infoDetailed/SET_TITLE", data.title);
      root.$router.push({
        name: "infoDetailed",
        params: {
          id: data.id,
          title: data.title
        }
      });
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
      setTimeout(() => {
        getNewsList(1);
      }, 500);
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
      delId,
      diaoValue_edit,
      infoId,

      //reactive
      options,
      options2,
      tableData,
      data,

      //自定义函数
      fn,
      delInfoList,
      delInfoListAll,
      confirmFn,
      getNewsList,
      changePage,
      restDate,
      restCategory,
      SelectMany,
      search,
      FormatData,
      editInfo,
      infoDetailed
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


