<template>
    <div id="login">
       <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="(item,index) in menuTab" :key="index" :class="{'current': item.current}" @click="toggleMenu(item)">
                {{ item.text }}
                </li>
            </ul>

            <el-form :model="ruleForm" status-icon :rules="rules2" ref="formName" class="login-form" size="medium">

            <el-form-item  prop="email" class="item-from">
                <label>邮箱</label>
                <el-input type="text" v-model="ruleForm.email" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item  prop="password" class="item-from">
                <label>密码</label>
                <el-input type="password" v-model="ruleForm.password" auto-complete="off" maxlength = '20' minlength='6'></el-input>
            </el-form-item>

             <el-form-item  prop="passwords" class="item-from" v-show ="modal === 'register'">
                <label>重复密码</label>
                <el-input type="passwords" v-model="ruleForm.passwords" auto-complete="off" maxlength = '20' minlength='6'></el-input>
            </el-form-item>


            <el-form-item  prop="repass" class="item-from">
                <label>验证码</label>
                <el-row :gutter="20">
                    <el-col :span="15"><el-input v-model="ruleForm.repass"></el-input></el-col>
                    <el-col :span="9"><el-button type="success"  class=" block">获取验证码</el-button></el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('formName')" class="login-btn block">提交</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {reactive,ref,onMounted} from '@vue/composition-api'
import { stripscript , checkRegEmial ,checkRegPass,checkRegRepass} from '@/utils/reg'
export default {

  setup(props,context){

     let checkEmail = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('邮箱不能为空'));
          }else if( checkRegEmial(value) ){
            return callback(new Error('请输入合法的邮箱'));
          }else{
            callback();
          }
       };

      let checkPassword = (rule, value, callback) => {
         //校验密码
       ruleForm.password = stripscript(value);
        value = ruleForm.password;

        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(checkRegPass(value)){
              return callback(new Error('请输入合法的密码'));
        }else{
            callback()
        }
      };

      let checkPasswords = (rule, value, callback) => {
         //校验重复密码
       if(modal.value== 'login'){ callback() }  //使用v-if 不需要判断  使用v-show时候 需要判断
       ruleForm.passwords = stripscript(value);
        value = ruleForm.passwords;
        if (value === '') {
          callback(new Error('请输入重复密码'));
        } else if(value !=  ruleForm.password ){
              return callback(new Error('两次输入不一致'));
        }else{
            callback()
        }
      };


      var checkRepass = (rule, value, callback) => {
           //校验验证码
        ruleForm.repass = stripscript(value);
        value = ruleForm.repass;
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if(checkRegRepass(value)){
              return callback(new Error('请输入合法的密码'));
        }else{
            callback()
        }
      };

    //  存放data数据  生命周期 自定义函数

    //定义按钮切换
    const  menuTab = reactive ([
                {text:'登录',current:true,type:'login'},
                {text:'注册',current:false,type:'register'},
            ]);


    const  ruleForm =  reactive({
              email: '',
              password: '',
              passwords:'',
              repass:''
            })

    const  rules2 = ({
              email: [
                  { validator: checkEmail, trigger: 'blur' }  //校验邮箱
              ],
              password: [
                  { validator: checkPassword, trigger: 'blur' } //密码
              ],
              passwords: [
                  { validator: checkPasswords, trigger: 'blur' } //重复密码
              ],
              repass: [
                  { validator: checkRepass, trigger: 'blur' } //验证码
              ]
            })

    const modal = ref('login');

    //定义函数切换
    
    const toggleMenu = ((data)=>{
       menuTab.forEach( (ele) => {
               ele.current = false
            })
            data.current = true
            modal.value = data.type
    })

    const submitForm = ((formName)=>{
    context.refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    });

    onMounted:(()=>{
      console.log(1)
    })


      return {
        menuTab,
        modal,
        ruleForm,
        rules2,
        toggleMenu,
        submitForm

      }

  },
    
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, .1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from { margin-bottom: 13px; }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn { margin-top: 19px; }
}
</style>
