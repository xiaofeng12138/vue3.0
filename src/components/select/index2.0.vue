<template>
  <div>
    <el-select v-model="selectValue">
      <el-option
        v-for="(item,index) in initOptionS"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectValue: "",
      initOptionS: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    };
  },

  methods: {
    initOption() {
      let optionArr = [];
      let initObj = this.config.init;
      if (initObj.length === 0) {
        return false;
      }
      initObj.forEach(item => {
        let arr = this.option.filter(ele => ele.value == item)[0];
        optionArr.push(arr);
      });
      this.initOptionS = optionArr;
      this.selectValue = optionArr[0].value;
    }
  },
  mounted() {
    // this.initOption();
  },

  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    config: {
      handler(newValue, oldValue) {
        console.log(newValue);
        this.initOption();
      },
      immediate: true //组件初始化 马上监听
    }
  }

  // props: {
  //   config: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
};
</script>
<style lang="scss">
</style>