import service from '@/utils/request'

//获取七牛云token
export function Qiniu(data){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}