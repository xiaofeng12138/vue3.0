<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogTableVisible"
    :modal-append-to-body="false"
    @opened="open"
    @close="close"
    width="580px"
    :close-on-click-modal="false"
  >
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择新闻分类">
          <el-option
            v-for="(item,index) in categoryType.item "
            :key="index"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.newsTitle"></el-input>
      </el-form-item>
      <el-form-item label="内容：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取消</el-button>
      <el-button type="danger" @click="submitNews">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { AddNews } from "@/api/info.js";
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";
export default {
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

  setup(props, { root, emit }) {
    //ref
    const dialogTableVisible = ref(false);
    const formLabelWidth = ref("70px");

    const form = reactive({
      newsTitle: "",
      type: "",
      content: ""
    });
    const categoryType = reactive({
      item: []
    });

    const open = () => {
      categoryType.item = props.catagory;
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
      (form.newsTitle = ""), (form.type = ""), (form.content = "");
    };

    //新闻提交
    const submitNews = () => {
      let data = {
        category: form.type,
        title: form.newsTitle,
        content: form.content
      };
      if (!form.type || !form.newsTitle || !form.content) {
        root.$message.error("必填项不能为空!!!");
        return false;
      }
      AddNews(data)
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message.success(res.data.message);
            dialogTableVisible.value = false;
            resetFrom();
          } else {
            root.$message.error(res.data.message);
          }
        })
        .catch(err => {
          root.$message.error(err.data.message);
        });
    };

    return {
      dialogTableVisible,
      formLabelWidth,

      form,
      categoryType,

      close,
      open,
      submitNews,
      resetFrom
    };
  }

  //单向数据流   父集 -> 子集   不能反向修改

  // watch: {
  //     flag:{
  //         handler(newValue,oldValue){
  //             this.dialogTableVisible = newValue;
  //         }
  //     }
  // },
};
</script>

<style lang="scss" scoped>
</style>


