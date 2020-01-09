<template>
  <div class="category-warp">
    <el-button type="danger" @click="addMeuns({type:'addFirstType'})">添加一级分类</el-button>
    <hr class="hrSTyle" />

    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category">
            <div class="c_item" v-for="(item,index) in category.item" :key="index">
              <img src="./minus.png" alt />
              <h4>
                {{item.category_name}}
                <div class="category_btn">
                  <el-button
                    size="mini"
                    type="danger"
                    round
                    @click="edit({id:item.id,category_name:item.category_name,type:'changeFirstType'})"
                  >编辑</el-button>
                  <el-button size="mini" type="success" round @click="addChildren({id:item.id,category_name:item.category_name,type:'addChildren'})">添加子集</el-button>
                  <el-button size="mini" round @click="delFirstCategory(item)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="(item,index) in item.children" :key="index">
                  {{item.category_name}}
                  <div class="category_btn">
                    <el-button size="mini" type="danger" round @click="editChildren({id:item.id,category_name:item.category_name,type:'editChildren'})">编辑</el-button>
                    <el-button size="mini" round @click="delChildren(item)">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="meun-title">
            <h4>一级分类编辑</h4>
            <el-form label-width="140px" class="formStyle">
              <el-form-item label="一级分类" v-if="category_first">
                <el-input v-model="formData.firstTitle" :disabled="firstTitle_input"></el-input>
              </el-form-item>
              <el-form-item label="二级分类" v-if="ccategory_sec">
                <el-input v-model="formData.secondTitle" :disabled="secondTitle_input"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  @click="submit"
                  :loading="btn_loading"
                  :disabled="subBtn"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { common } from "@/utils/common.js"; //引入获取信息分类全局函数
import {addFirstCategory,getCategory,delCategory,editCategory,addChildrenType} from "@/api/login.js";
export default {
  setup(props, { root, refs }) {
    const { categoryItem, getCategoryInfo,getCategoryInfoAll } = common();
    const category_first = ref(true);
    const ccategory_sec = ref(true);
    const btn_loading = ref(false);
    const firstTitle_input = ref(true);
    const secondTitle_input = ref(true);
    const subBtn = ref(true);

    //定义表单数据
    const formData = reactive({
      firstTitle: "",
      secondTitle: ""
    });

    //提交类型 和id
    const searchType = reactive({
      id: "",
      type: "",
      category_name: ""
    });

    //一级分类数据
    const category = reactive({
      item: []
    });

    //提交函数
    const submit = () => {
      if (searchType.type === "addFirstType") {
        addFirstFn();
      }else if (searchType.type === "changeFirstType") {
        changeFirstType(searchType);
      }else if(searchType.type === "addChildren"){
        submitAddChildren(searchType)
      }else if(searchType.type === "editChildren"){
        editChildrenFn(searchType)
      }
    };

    //添加一级分类
    const addMeuns = val => {
      searchType.type = val.type;
      category_first.value = true;
      ccategory_sec.value = false;
      firstTitle_input.value = false;
      subBtn.value = false;
    };
    //真正提交添加一级分类函数
    const addFirstFn = () => {
      if (!formData.firstTitle) {
        root.$message.warning("一级菜单不能为空");
        return false;
      }
      category_first.value = true; //改变按钮请求状态
      let data = {
        categoryName: formData.firstTitle
      };

      addFirstCategory(data)
        .then(res => {
          if (res.data.resCode == 0) {
            //   btn_loading.value = true
            root.$message.success(res.data.message);
            category.item.push(res.data.data);
            formData.firstTitle = "";
            formData.secondTitle = "";
            category_first.value = true;
            //   subBtn.value = true
          }
        })
        .catch(err => {
          console.log(err);
          formData.firstTitle = "";
          formData.secondTitle = "";
          category_first.value = false;
        });
    };

    //删除一级分类
    const delFirstCategory = val => {
      root
        .$confirm(
          `确定要删除当前名称为 ${val.category_name} 的一级分类吗`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          }
        )
        .then(() => {
          let data = {
            categoryId: val.id
          };
          delCategory(data)
            .then(res => {
              if (res.data.resCode === 0) {
                let index = category.item.findIndex(item => item.id == val.id); //获取数组的下标
                category.item.splice(index, 1); //删除数组
                root.$message.success(res.data.message);
              } else {
                root.$message.error("删除失败，请重试");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    };

    //删除子集分类  
    const delChildren = val => {
      root
        .$confirm(
          `确定要删除当前名称为 ${val.category_name} 的子集分类吗`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          }
        )
        .then(() => {
          let data = {
            categoryId: val.id
          };
          delCategory(data)
            .then(res => {
              if (res.data.resCode === 0) {
                root.$message.success(res.data.message);
                getCategoryInfoAll()
              } else {
                root.$message.error("删除失败，请重试");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    };

    //编辑一级分类显示
    const edit = val => {
      searchType.type = val.type;
      searchType.id = val.id;
      searchType.category_name = val.category_name;

      firstTitle_input.value = false;
      ccategory_sec.value = false; //隐藏
      subBtn.value = false;
      formData.firstTitle = val.category_name;
    };

    //编辑子集分类
    const editChildren = (val)=>{
      console.log(val)
      searchType.type = val.type;
      searchType.id = val.id;
      searchType.category_name = val.category_name;

      secondTitle_input.value = false;
      category_first.value = false; //隐藏
      subBtn.value = false;
      formData.secondTitle = val.category_name;
    }

    //编辑子集函数提交函数
    const editChildrenFn = (val)=>{
      if (!formData.secondTitle) {
        root.$message.warning("子级菜单不能为空");
        return false;
      }
      ccategory_sec.value = true; //改变按钮请求状态
      let data = {
        id: val.id,
        categoryName: formData.secondTitle
      };

      editCategory(data)
        .then(res => {
          if (res.data.resCode == 0) {
            formData.secondTitle = "";
            ccategory_sec.value = true;
            root.$message.success(res.data.message);
             getCategoryInfoAll()
          }
        })
    }

    //编辑一级菜单提交
    const changeFirstType = val => {
      if (!formData.firstTitle) {
        root.$message.warning("一级菜单不能为空");
        return false;
      }
      category_first.value = true; //改变按钮请求状态
      let data = {
        id: val.id,
        categoryName: formData.firstTitle
      };

     editCategory(data)
        .then(res => {
          if (res.data.resCode == 0) {
            //   btn_loading.value = true
            formData.firstTitle = "";
            formData.secondTitle = "";
            category_first.value = true;
            root.$message.success(res.data.message);
            let data = category.item.filter(item => item.id == val.id); //数组过滤
            data[0].category_name = res.data.data.data.categoryName;
            // getCategoryInfoAll()
          }
        })
        .catch(err => {
          console.log(err);
          formData.firstTitle = "";
          formData.secondTitle = "";
          category_first.value = false;
        });
    };

    //添加子集分类
    const addChildren = (val)=>{
      console.log(val)
      secondTitle_input.value = false
      subBtn.value = false
      formData.firstTitle = val.category_name
      searchType.id = val.id
      searchType.type = val.type
      searchType.category_name = val.category_name
    }

    const submitAddChildren = (val)=>{
        console.log(val)
        let data = {
        categoryName:formData.secondTitle,
        parentId:val.id
      }
      console.log(data)
      addChildrenType(data).then(res=>{
        root.$message.success(res.data.message);
        getCategoryInfoAll()
        formData.secondTitle = ''
      })
    }

    //生命周期函数
    onMounted(() => {
      getCategoryInfoAll();
    });

    watch(
      () => categoryItem.item,
      value => {
        category.item = value;
      }
    );

    return {
      //ref
      category_first,ccategory_sec,btn_loading,firstTitle_input,secondTitle_input,subBtn,

      //relative
      formData,category,searchType,

      //methods
      submit,addMeuns,delFirstCategory,edit,addFirstFn,addChildren,editChildren,editChildrenFn,delChildren
    };
  }
};
</script>

<style lang="scss" scoped>
.category-warp {
  height: 5000px;
  .hrSTyle {
    background-color: #e9e9e9;
    margin-left: -30px;
    margin-right: -30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .category {
    div:first-child {
      &:before {
        top: 20px;
      }
    }
    div:last-child {
      &:before {
        bottom: 21px;
      }
    }
    .c_item {
      position: relative;
      line-height: 44px;
      &:before {
        content: "";
        position: absolute;
        width: 15px;
        top: 0;
        bottom: 0;
        left: 20px;
        border-left: 1px dotted #000;
      }
      img {
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      h4 {
        padding-left: 39px;
        cursor: pointer;
        .category_btn {
          position: absolute;
          right: 11px;
          z-index: 22;
          top: -1px;
          font-size: 12px;
          display: none;
        }
      }
      h4:hover {
        background-color: #f3f3f3;
        .category_btn {
          display: block;
        }
      }
      li {
        position: relative;
        padding-left: 40px;
        margin-left: 20px;
        cursor: pointer;
        .category_btn {
          position: absolute;
          display: none;
          right: 11px;
          z-index: 22;
          top: -1px;
          font-size: 12px;
        }
        &:before {
          content: "";
          position: absolute;
          width: 32px;
          top: 20px;
          left: 5px;
          border-bottom: 1px dotted #000;
        }
      }
      li:hover {
        background-color: #f3f3f3;
        .category_btn {
          display: block;
        }
      }
    }
  }
  .meun-title {
    line-height: 44px;
    h4 {
      background-color: #f3f3f3;
      padding-left: 30px;
    }
    .formStyle {
      width: 420px;
      margin-top: 20px;
    }
  }
}
</style>

