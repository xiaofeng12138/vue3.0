<template>
    <div class='category-warp'>
      
      <el-button type='danger'>添加一级分类</el-button>
      <hr class="hrSTyle" />

      <div>
          <el-row :gutter='30'>
              <el-col :span='8'>
                  <div class="category">
                        <div class="c_item">
                            <img src="./minus.png" alt="">
                            <h4>新闻
                                <div class="category_btn">
                                     <el-button size="mini" type='danger' round>编辑</el-button>
                                        <el-button size="mini" type='success' round>添加子集</el-button>
                                        <el-button size="mini" round>删除</el-button>
                                </div>
                            </h4>
                            <ul>
                                <li>国内
                                     <div class="category_btn">
                                       <el-button size="mini" type='danger' round>编辑</el-button>
                                        <el-button size="mini" round>删除</el-button>
                                     </div>
                                </li>
                                <li>国内
                                     <div class="category_btn">
                                       <el-button size="mini" type='danger' round>编辑</el-button>
                                        <el-button size="mini" round>删除</el-button>
                                     </div>
                                </li>
                                <li>国内
                                     <div class="category_btn">
                                       <el-button size="mini" type='danger' round>编辑</el-button>
                                        <el-button size="mini" round>删除</el-button>
                                     </div>
                                </li>
                                <li>国内</li> 

                            </ul>
                        </div>
                        <div class="c_item">
                             <img src="./minus.png" alt="">
                            <h4>新闻</h4>
                            <ul>
                                <li>国内</li>
                                <li>国内</li>
                                <li>国内</li>
                                <li>国内</li> 
                            </ul>
                        </div>
                  </div>
              </el-col>
               <el-col :span='16'>
                 <div class="meun-title">
                     <h4>一级分类编辑</h4>
                      <el-form  label-width="140px" class="formStyle">
                        <el-form-item label="活动区域">
                            <el-input v-model="formLabelAlign.region" ></el-input>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                         <el-form-item >
                            <el-button type='danger'>提交</el-button>
                        </el-form-item>
                    </el-form>
                 </div>
              </el-col>
          </el-row>
      </div>

        
    </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {

    setup(props,{root}){

        const  formLabelAlign = reactive ({
          name: '',
          region: '',
          type: ''
        }) 

        return{
            formLabelAlign
        }
    }
    
}
</script>

<style lang="scss" scoped>
.category-warp{
    .hrSTyle{
        background-color: #e9e9e9;
        margin-left: -30px;
        margin-right: -30px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .category{
        div:first-child{&:before{top: 20px; }}
        div:last-child{&:before{bottom: 21px; }}
        .c_item{
            position: relative;
            line-height: 44px;
              &:before{
                    content: '';
                    position: absolute;
                    width: 15px;
                    top: 0;
                    bottom: 0;
                    left: 20px;
                    border-left: 1px dotted #000;

                }
            img{
                float: left;
                margin-left: 10px;
                margin-top: 10px;
                width: 20px;
                height: 20px;
                cursor: pointer;
                
            }
            h4{
                padding-left: 39px;
                cursor: pointer;
                .category_btn{
                    position: absolute;
                    right: 11px;
                    z-index: 22;
                    top: -1px;
                    font-size: 12px;
                    display: none;
                }
            }
            h4:hover{
               background-color: #f3f3f3;
               .category_btn{
                    display: block;
                }
            }
            li{
                position: relative;
                padding-left: 40px;
                margin-left: 20px;
                cursor: pointer;
                .category_btn{
                    position: absolute;
                    display: none;
                    right: 11px;
                    z-index: 22;
                    top: -1px;
                    font-size: 12px;
                }
                &:before{
                    content: '';
                    position: absolute;
                    width: 32px;
                    top: 20px;
                    left: 5px;
                    border-bottom: 1px dotted #000;

                }
            }
            li:hover{
                 background-color: #f3f3f3;
                .category_btn{
                    display: block;
                }
            }
            
        }
       
    }
    .meun-title{
        line-height: 44px;
        h4{
           background-color: #f3f3f3;
           padding-left: 30px;
        }
        .formStyle{
            width: 420px;
            margin-top: 20px;
        }
    }
}


</style>


