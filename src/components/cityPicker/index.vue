<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <el-col :span="6" v-if="initData.provice">
        <el-select v-model="data.proviceValue" @change="handlerProvice">
          <el-option
            v-for="(item,index) in data.proviceData"
            :key="index"
            :label="item.PROVINCE_NAME"
            :value="item.PROVINCE_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="initData.city">
        <el-select v-model="data.cityValue" @change="handlerCity">
          <el-option
            v-for="(item,index) in data.cityData"
            :key="index"
            :label="item.CITY_NAME"
            :value="item.CITY_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="initData.area">
        <el-select v-model="data.areaValue" @change="handlerArea">
          <el-option
            v-for="(item,index) in data.areaData"
            :key="index"
            :label="item.AREA_NAME"
            :value="item.AREA_CODE"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="initData.street">
        <el-select v-model="data.streetValue" @change="handlerStreet">
          <el-option
            v-for="(item,index) in data.streetData"
            :key="index"
            :label="item.STREET_NAME"
            :value="item.STREET_CODE"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, watch, onBeforeMount } from "@vue/composition-api";
import { cityPicker } from "./cityPicker";
export default {
  props: {
    cityPickerData: {
      type: Object,
      default: () => {}
    },
    cityChoose: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    console.log(props.cityChoose);
    const {
      //数据绑定
      data,
      resultData,
      getProvice,
      handlerProvice,
      handlerCity,
      handlerArea,
      handlerStreet
    } = cityPicker();
    const initData = reactive({
      provice: false,
      city: false,
      area: false,
      street: false
    });

    watch(
      [
        () => resultData.proviceValue,
        () => resultData.cityValue,
        () => resultData.areaValue,
        () => resultData.streetValue
      ],
      ([provice, city, area, street]) => {
        emit("update:cityPickerData", resultData); //反向修改传进来的参数
      }
    );
    /**
     * 配置省市区显示的个数
     */
    const initCityChoose = () => {
      let setCity = props.cityChoose;
      if (setCity.length == 0) {
        for (let key in initData) {
          initData[key] = true;
        }
      } else {
        setCity.forEach(item => {
          initData[item] = true;
        });
      }
    };

    onBeforeMount(() => {
      initCityChoose();
      getProvice();
    });

    getProvice();
    return {
      data,
      initData,
      initCityChoose,
      resultData,
      getProvice,
      handlerProvice,
      handlerCity,
      handlerArea,
      handlerStreet
    };
  }
};
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
</style>