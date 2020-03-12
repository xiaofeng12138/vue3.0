import service from '@/utils/request'

//获取用户角色的接口
export function GetRole(data={}){
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}


//添加用户接口
export function addUser(data){
    return service.request({
        method: "post",
        url: "/user/add/",
        data
    })
}
