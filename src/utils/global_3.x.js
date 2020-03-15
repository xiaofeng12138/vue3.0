import {MessageBox} from 'element-ui'
import {reactive,ref,onMounted,computed} from '@vue/composition-api'

//封装vue3.x的函数

export  function global(){
    const str = ref('')
    const confirm = (params)=>{
        MessageBox.confirm(params.content, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            // console.log(params.fn)
            // root.$message.success('删除成功');
            params.fn &&  params.fn(params.id)
          }).catch(() => {
        });
    }

    return{
        str,
        confirm
    }
}