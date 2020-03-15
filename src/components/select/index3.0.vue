<template>
  <div>
    <el-select v-model="data.selectValue">
      <el-option
        v-for="(item,index) in data.initOptionS"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
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
export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    const data = reactive({
      selectValue: "",
      initOptionS: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });

    const initOption = () => {
      let optionArr = [];
      let initObj = props.config.init;
      if (initObj.length === 0) {
        return false;
      }
      initObj.forEach(item => {
        let arr = data.option.filter(ele => ele.value == item)[0];
        optionArr.push(arr);
      });
      data.initOptionS = optionArr;
      data.selectValue = optionArr[0].value;
    };

    onMounted(() => {
      initOption();
    });
    return {
      data,
      initOption
    };
  }
};
</script>
<style lang="scss">
</style>