<template>
  <div>
    <el-select v-model="data.selectValue" @change="changeStatus">
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
    },
    selectData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    const data = reactive({
      selectValue: "",
      initOptionS: [],
      option: [
        { value: "username", label: "姓名" },
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
      // data.selectValue = optionArr[0].value;
    };
    const changeStatus = val => {
      let filterData = data.option.filter(item => item.value == val)[0];
      emit("update:selectData", filterData);
    };

    onMounted(() => {
      initOption();
    });
    return {
      data,
      initOption,
      changeStatus
    };
  }
};
</script>
<style lang="scss">
</style>