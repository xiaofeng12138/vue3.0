import service from '@/utils/request'

//获取七牛云token
export function Qiniu(data){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}



//表格请求数据的函数
export function LoadTableData(params){
    return service.request({
        method: params.method || "post",
        url:params.url,
        data:params.data || ''
    })
}


//获取省市区函数
export function getCityPicker(data){
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}
