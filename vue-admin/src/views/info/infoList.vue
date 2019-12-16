<template>
    <div class='infoList'>
        <el-row :gutter="16">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">类型：</label>
                    <div class="wrap-content">
                         <el-select v-model="categoryValue" clearable placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div> 
            </el-col>

            <el-col :span="8">
                <div class="label-wrap date">
                    <label for="">时间:&nbsp;&nbsp;</label>
                    <div class="wrap-content">
                       <el-date-picker
                            v-model="dateValue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width:100%"
                            >
                       </el-date-picker>
                    </div>
                </div> 
            </el-col>

            <el-col :span="3">
                <div class="label-wrap keyWord">
                    <label for="">关键字:&nbsp;&nbsp;</label>
                    <div class="wrap-content">
                      <el-select v-model="keyWord"  style="width:100%">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div> 
            </el-col>

            <el-col :span="3">
                <div class="label-wrap ">
                    <div class="wrap-content">
                      <el-input v-model="inputValue"  style="width:100%">
                        </el-input>
                    </div>
                </div> 
            </el-col>

             <el-col :span="2">
                <div class="label-wrap ">
                    <div class="wrap-content">
                      <el-button type='danger'>搜索
                        </el-button>
                    </div>
                </div> 
            </el-col>

             <el-col :span="3">
                <div class="label-wrap " style="float:right">
                    <div class="wrap-content">
                      <el-button type='danger' @click="diaoValue = true">新建
                        </el-button>
                    </div>
                </div> 
            </el-col>

            


        </el-row>


        <!-- 表格部分 -->
        <div class="tableWrap">
            <el-table
            :data="tableData"
            :header-cell-style="{background:'pink',color:'#606266',fontWeight:'bold'}"
            border
            style="width: 100%">
                <el-table-column  type="selection" width="55"  align="center"></el-table-column>
        
                <el-table-column prop="title" label="标题"  align="center"  width='830'> </el-table-column>
                <el-table-column prop="type" label="类型"  align="center" width='130'> </el-table-column>
                <el-table-column prop="date" label="日期"  align="center" width='237'> </el-table-column>
                <el-table-column prop="user" label="管理员"  align="center" width='115'> </el-table-column>
                <el-table-column  label="操作"  align="center" > 
                    <template slot-scope="scope">
                        <el-button type="success" size="small">编辑</el-button>
                        <el-button  type="danger" size="small" @click="delInfoList">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
             <el-row >
            <el-col :span="12">
                <el-button @click="delInfoListAll"> 批量删除 </el-button>
            </el-col>

            <el-col :span="12">
                <el-pagination
                    style="float:right"
                    background
                    layout="total,prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-col>

        </el-row>
        </div>


        <!--弹出框部分-->
        <Dialog :flag = 'diaoValue' @close='fn' />
    </div>
</template>

<script>
import Dialog from './dialog/index'
import { global } from '@/utils/global_3.x.js'
import {reactive,ref,onMounted,computed} from '@vue/composition-api'
export default {
     components:{Dialog},
    setup(props,{root}){
        const {confirm,str} = global()   //导出global里面定义的函数
         //ref
        const  categoryValue = ref('')
        const  dateValue = ref('')
        const  keyWord = ref('1')
        const  inputValue = ref('')
        const  diaoValue = ref(false)  //控制弹出框是否显示

        //reactive
        const options = reactive (
                    [{
                        value: '1',
                        label: '国内新闻'
                        }, {
                        value: '2',
                        label: '国际新闻'
                        }, {
                        value: '3',
                        label: '普通新闻'
                        },],
                    );
         const options2 = reactive (
                    [{
                        value: '1',
                        label: 'ID'
                        }, {
                        value: '2',
                        label: '标题'
                        }],
                    );
        const  tableData = reactive([
            {
                title:'假装这是一条正经的标题',
                type:'国内新闻',
                date:'2019-11-27 13:35:15',
                user:'晓风哥哥'
            },
            {
                title:'假装这是一条正经的标题',
                type:'国内新闻',
                date:'2019-11-27 13:35:15',
                user:'晓风哥哥'
            },
            {
                title:'假装这是一条正经的标题',
                type:'国内新闻',
                date:'2019-11-27 13:35:15',
                user:'晓风哥哥'
            }
        ])

        //定义函数
        const fn = ()=>{
            diaoValue.value = false;
        }
        //信息删除函数 delInfoListAll
        const delInfoList = ()=>{
            // root.confirm({
            //     content:'是否确认删除当前信息！！',
            //     id:'2222',
            //      fn:confirmFn,
            // })
            confirm({
                content:'是否确认删除当前信息！！',
                id:'2222',
                fn:confirmFn,
            })
        }

        //信息批量删除函数 delInfoListAll
        const delInfoListAll = ()=>{
            confirm({
                content:'是否确认删除当前选中的所有信息！！',
                fn:confirmFn,
                id:'1111'
            })
        }

        //定义确认删除回调函数

        const confirmFn = (value)=>{
           console.log(value)
        }


       
       
    

    return {
        //ref
        inputValue, categoryValue, dateValue, keyWord,diaoValue,
        
        //reactive
        options, options2, tableData,

        //自定义函数
        fn,delInfoList,delInfoListAll,confirmFn
      }
    }    
    
}
</script>

<style lang="scss" scoped>
@import '../../styles/config.scss';
  .infoList{
      .label-wrap{
          &.category{ @include labelWarp(left,60,60);}
          &.date{ @include labelWarp(right,83,110); }
          &.keyWord{ @include labelWarp(right,80,100); }
         
      }
      .tableWrap{
          margin-top: 20px;
      }
      .footer{
          margin-top: 30px;
      }
  }
</style>


