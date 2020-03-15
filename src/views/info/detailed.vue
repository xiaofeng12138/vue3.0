<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <!-- <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
      </el-form-item>-->
      <el-form-item label="信息分类：">
        <el-select v-model="form.categoryId" placeholder="请选择分类名称">
          <el-option
            v-for="(item,index) in data.category"
            :key="index"
            :value="item.id"
            :label="item.category_name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻标题：">
        <el-input v-model="form.title" style="width:400px"></el-input>
      </el-form-item>

      <el-form-item label="缩略图：">
        <upload :imgSrc.sync="form.imgUrl" />
      </el-form-item>

      <el-form-item label="发布日期：">
        <el-date-picker v-model="form.createdate" type="date" placeholder="选择日期" disabled></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容：">
        <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
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
import upload from "@c/upload/upload.vue";
import { common } from "@/utils/common.js"; //引入获取信息分类全局函数
import { formatDate } from "@/utils/date.js"; //日期处理函数
import { AddNews, GetNewsList, EditInfo } from "@/api/info.js";
//引用富文本
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: { quillEditor, upload },
  setup(props, { root, refs }) {
    const { categoryItem, getCategoryInfo, getCategoryInfoAll } = common();
    //定义绑定数据
    const data = reactive({
      category: []
    });

    //定义form表单
    const form = reactive({
      categoryId: "",
      title: root.$route.params.title || localStorage.getItem("title"),
      id: root.$route.params.id || localStorage.getItem("id"),
      createdate: "",
      content: "",
      imgUrl: ""
    });

    //   getCategoryInfoAll()

    const getInfoCategory = () => {
      getCategoryInfo().then(res => {});
    };

    //获取新闻详情的函数

    const getNewsInfo = () => {
      let data = {
        pageNumber: 1,
        pageSize: 1,
        id: form.id
      };
      GetNewsList(data).then(res => {
        let requsetInfo = res.data.data.data[0];
        console.log(requsetInfo);
        form.categoryId = requsetInfo.categoryId;
        form.createdate = formatDate(requsetInfo.createDate); //日期格式化显示
        form.content = requsetInfo.content;
        form.imgUrl = requsetInfo.imgUrl;
      });
    };

    //提交函数
    const submit = () => {
      let data = {
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        id: form.id,
        imgUrl: form.imgUrl
      };
      EditInfo(data)
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message.success(res.data.message);
          } else {
            root.$message.error(res.data.message);
          }
        })
        .catch(err => {
          root.$message.error(err.data.message);
        });
    };
    // let id = root.$route.params.id || localStorage.getItem("id");
    // let title = root.$route.params.title || localStorage.getItem("title");
    // console.log(id);
    // console.log(title);
    onMounted(() => {
      getCategoryInfo();
      getNewsInfo();
      root.$store
        .dispatch("common/getInfoCategory")
        .then(res => {
          console.log(res);
          data.category = res;
        })
        .catch(err => {
          console.log(err);
        });
    });

    return {
      data,
      form,
      getInfoCategory,
      getNewsInfo,
      submit
    };
  }
};
</script>

<style lang="scss" scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

