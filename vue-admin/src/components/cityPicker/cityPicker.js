
import {reactive} from "@vue/composition-api";
import { getCityPicker } from "@/api/common";

export function cityPicker() {
   
    const data = reactive({
      proviceValue: "",
      cityValue: "",
      areaValue: "",
      streetValue: "",
      proviceData: [],
      cityData: [],
      areaData: [],
      streetData: []
    });

    const resultData = reactive({
      proviceValue: "",
      cityValue: "",
      areaValue: "",
      streetValue: "",
    })

     //获取省份函数
    const getProvice = () => {
      getCityPicker({ type: "province" }).then(res => {
        data.proviceData = res.data.data.data;
      });
    };

    //获取城市函数
    const handlerProvice = (val)=>{
        resetValue({type: "city"})
        getCityPicker({ type: "city", province_code: val }).then(res => {
                data.cityData = res.data.data.data;
        });
    }

    //获取区县函数
    const handlerCity = val => {
     resetValue({type: "area"})
      getCityPicker({ type: "area", city_code: val }).then(res => {
        data.areaData = res.data.data.data;
      });
    };

    //获取街道函数
    const handlerArea = val => {
      resetValue({type: "street"})
      getCityPicker({ type: "street", area_code: val }).then(res => {
        data.streetData = res.data.data.data;
      });
    };
     //获取街道函数
    const handlerStreet = val => {
      resetValue({type:""})
     
    };

    const resetValue = (params)=>{
        const valueJson = {
            city:['cityValue','areaValue','streetValue'],
            area:['areaValue','streetValue'],
            street:['streetValue']
        }
        let arrObj = valueJson[params.type];
        if(arrObj){arrObj.forEach(item=> data[item] = '')}
        result()
    }

    const result =()=>{
       for(let key in resultData ){
           resultData[key] = data[key]
       }
    }
    return{
         data,
         resultData,
         getProvice,
         handlerProvice,
         handlerCity,
         handlerArea,handlerStreet
    }

    
}