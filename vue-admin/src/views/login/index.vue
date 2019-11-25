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
                    <el-col :span="9"><el-button type="success"  class=" block" @click="getSms()"  :disabled = codeBtnStatus.status >{{codeBtnStatus.text}}</el-button></el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('formName')" class="login-btn block" :disabled = BtnStatus>{{modal == 'login'?"登录":"注册"}}</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
import service from '@/utils/request'
import { GetSms,SignIn,Login} from '@/api/login'
import {reactive,ref,onMounted} from '@vue/composition-api'
import { stripscript , checkRegEmial ,checkRegPass,checkRegRepass} from '@/utils/reg'
import { setCookie , setUsername } from '@/utils/cookie.js'

export default {
  setup(props,{root,refs}){
    //console.log(context)
    /**
     *  
     *  attrs   ==> this.$attrs
        emit    ==> this.$emit
        listeners  ==> this.$listeners
        parent     ==> this.parent
        refs       ==> this.refs
        root   ==> this

     */

      // 自定义表单检验函数
      let checkEmail = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('邮箱不能为空'));
          }else if( checkRegEmial(value) ){
            return callback(new Error('请输入合法的邮箱'));
          }else{
            callback();
          }
      };
      let checkPassword = (rule, value, callback) => {    //校验密码
        ruleForm.password = stripscript(value);
        value = ruleForm.password;

        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(checkRegPass(value)){
              return callback(new Error('密码为6-20位数字加字母组合'));
        }else{
            callback()
        }
      };
      let checkPasswords = (rule, value, callback) => {   //校验重复密码  
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
      let checkRepass = (rule, value, callback) => {  //校验验证码  
        ruleForm.repass = stripscript(value);
        value = ruleForm.repass;
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if( checkRegRepass(value)){
              return callback(new Error('请输入合法的密码'));
        }else{
            callback()
        }
      };



 /****************************************************************************/
    //  存放data数据  生命周期 自定义函数

    //定义按钮切换
    const  menuTab = reactive ([
                {text:'登录',current:true,type:'login'},
                {text:'注册',current:false,type:'register'},
            ]);

     //定义表单数据
    const  ruleForm =  reactive({
              email: '',
              password: '',
              passwords:'',
              repass:''
            })

    //定义表单校验规则
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


    //定义登录注册按钮切换
    const modal = ref('login');
    
    // 定义按钮是否禁用状态
    const BtnStatus = ref(true);

    //定义获取验证码按钮
    const codeBtnStatus = reactive({
          status:false,
          text:'获取验证码'
    })

    //定义函数切换
    const toggleMenu = ((data)=>{
       menuTab.forEach( (ele) => {
               ele.current = false
            })
            data.current = true
            modal.value = data.type
            refs.formName.resetFields(); //清除表单数据
            clearInterval(timer.value);
            BtnStatus.value = true
            updateBtnStatus({
                  status:false,
                  text:'获取验证码'
                })

    })

    //定义倒计时函数
     const timer = ref(null);
    
    //获取验证码函数
        const getSms = (()=>{
            if(ruleForm.email == ''){
              root.$message.error('邮箱不能为空！！')
              return false
            }else if( checkRegEmial(ruleForm.email)){
              root.$message.error('邮箱格式不正确！！')
              return false
            }else{
              let data = {
                username:ruleForm.email,
                module:modal.value
              }
               updateBtnStatus({
                  status:true,
                  text:'发送中...'
                })

                GetSms(data).then((response)=>{
                     // console.log(response)
                     root.$message.success(response.data.message)
                     BtnStatus.value  = false  //修改按钮状态是否可用
                     countDown(60)
                   }).catch((error)=>{
                    console.log(error)
                 })
            }
        })


        //表单提交函数
        const submitForm = ((formName)=>{
          //console.log(modal.value)
        refs[formName].validate((valid) => {
              if (valid) {
                modal.value == 'login' ? login() : register()
              } else {
                console.log('error submit!!');
                return false;
              }
            })
        });


        //定义倒计时函数
        const  countDown = (number)=>{
          if(timer.value ){clearInterval(timer.value)}
          let time = number
          timer.value = setInterval(()=>{
            time -- ;
            if(time === 0){
                clearInterval(timer.value)
                updateBtnStatus({
                  status:false,
                  text:'重新获取'
                })
            }else{
              codeBtnStatus.text = `倒计时${time}秒`
            }
          },1000)
        }

        //登录函数
        const login = (()=>{
            let data = {
                  username:ruleForm.email,
                  password:ruleForm.password,
                  code:ruleForm.repass,
                }
                 Login(data).then((res)=>{
                    console.log(res)
                    let userInfo = res.data.data
                    
                    root.$store.commit('app/SET_TOKEN',userInfo.token)  //存储用户token
                    root.$store.commit('app/SET_USERNAME',userInfo.username)  //存储用户名
                    setCookie(userInfo.token)
                    setUsername(userInfo.username)
                    root.$message.success(res.data.message)
                    root.$router.push('/console')
                 }).catch((error)=>{
                    console.log(error)
                 })
        })

         //注册函数
        const register = (()=>{
          let data = {
                  username:ruleForm.email,
                  password:ruleForm.password,
                  code:ruleForm.repass,
                  module:"register"
                }
                 SignIn(data).then((res)=>{
                    root.$message.success(res.data.message)
                    toggleMenu(menuTab[0])
                 }).catch((error)=>{
                    console.log(error)
                 })
        })

        //更改按钮状态函数
        const updateBtnStatus = ((params)=>{
           codeBtnStatus.status = params.status;
           codeBtnStatus.text = params.text;
        })


      onMounted(()=>{
        console.log(1)
        console.log(process.env.VUE_APP_ABC)
      })


      return {
        menuTab,
        modal,
        ruleForm,
        BtnStatus,
        codeBtnStatus,
        rules2,
        toggleMenu,
        submitForm,
        getSms,
        timer
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
