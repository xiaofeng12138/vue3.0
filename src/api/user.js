import service from '@/utils/request'

//获取系统用户角色的接口
export function GetRole(data={}){
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}

//获取用户系统列表
export function GetSystem(data={}){
    return service.request({
        method: "post",
        url: "/system/",
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

//删除用户接口
export function delUser(data){
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}


//用户是否启用
export function userActive(data){
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    })
}

//用户编辑/user/getList/
export function userEdit(data){
    return service.request({
        method: "post",
        url: "/user/edit/",
        data
    })
}

//用户编辑
export function searchList(data){
    return service.request({
        method: "post",
        url: "/user/getList/",
        data
    })
}


//获取用户按钮接口
export function getUserBtn(data ={}){
    return service.request({
        method: "post",
        url: "/permButton/",
        data
    })
}



