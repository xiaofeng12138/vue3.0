<template>
  <div>
    子组件
    这是一个A页面
    {{data}}
    <B v-bind="$attrs" v-on="$listeners"></B>
  </div>
</template>
<script>
import B from "./b";
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch,
  inject
} from "@vue/composition-api";
export default {
  components: { B },
  setup(props, { root, attrs }) {
    const cc = inject("customVal");
    // console.log(cc)
    const data = reactive(attrs);
    return {
      data
    };
  }
};
</script>

