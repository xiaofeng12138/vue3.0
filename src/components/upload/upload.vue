<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://up.qiniup.com"
      :data="data.qiNiuToken"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="data.image" :src="data.image" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
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
import { Qiniu } from "@/api/common.js"; //引入获取七牛云token的函数
export default {
  props: {
    imgSrc: {
      type: String,
      default: ""
    }
  },
  setup(props, { root, emit }) {
    console.log(props.imgSrc);
    //定义绑定数据
    const data = reactive({
      image: "",
      qiNiuToken: {
        token: "",
        key: ""
      }
    });

    //文件上传成功
    const handleAvatarSuccess = (res, file) => {
      let src = `http://llc.xiaofenggege.com/${res.key}`;
      data.image = src;
      emit("update:imgSrc", src); //将数据方向返回给父组件
    };

    //图片上传之前的参数
    const beforeAvatarUpload = file => {
      //文件名转码
      let tt = file.name;
      let key = encodeURI(`${tt}`);
      data.qiNiuToken.key = key;
      return;
    };

    const getQiniuToken = () => {
      //获取七牛云参数的函数
      let p = {
        accesskey: "DDinTpKdKIJi9NA0q2nMoJV-296wps2DYD5JUxb8", //密钥AK*
        secretkey: "POvLMBoC-EnwHWvwaJVkCjzLVvYuGl9TOVnzBpRv", //密钥SK
        buckety: "xiaofenggeg" //空间名称
      };
      Qiniu(p).then(res => {
        data.qiNiuToken.token = res.data.data.token;
      });
    };

    /*
      watch 监听函数
    */

    watch(
      () => props.imgSrc,
      value => {
        console.log(value);
        data.image = value;
      }
    );
    onMounted(() => {
      getQiniuToken();
    });

    return {
      data,
      handleAvatarSuccess,
      beforeAvatarUpload,
      getQiniuToken
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