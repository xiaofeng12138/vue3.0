<template>
   <el-dialog title="新增" :visible.sync="dialogTableVisible" :modal-append-to-body='false' @close ='close' width= '580px' :close-on-click-modal='false'>

    <el-form :model="form">
         <el-form-item label="类型：" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="国内新闻" value="1"></el-option>
            <el-option label="国际新闻" value="2"></el-option>
            <el-option label="行内新闻" value="3"></el-option>
        </el-select>
        </el-form-item>
        
        <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="概况：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.desc" ></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="danger" @click="dialogTableVisible = false">确定</el-button>
    </div>
</el-dialog>
</template>

<script>
import {reactive,ref,onMounted,computed,watch} from '@vue/composition-api'
export default {

     props:{
        flag:{
            type:Boolean,
            default:false
        }
    },


    setup(props,{root,emit}){

        //ref
        const dialogTableVisible = ref(false);
        const  formLabelWidth = ref('70px');


        const form = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''

        })

        //watch
        watch (()=>{
             dialogTableVisible.value = props.flag;
        })

        const close = ()=>{
             dialogTableVisible.value = false;
             emit('close',false)

        }


        return{
            dialogTableVisible,formLabelWidth,
             
             form,

             close,
        }

    }

    //单向数据流   父集 -> 子集   不能反向修改
   
    // watch: {
    //     flag:{
    //         handler(newValue,oldValue){
    //             this.dialogTableVisible = newValue;
    //         }
    //     }
    // },

   
    
}
</script>

<style lang="scss" scoped>

</style>


