import service from '@/utils/request'


//新闻添加接口
export function AddNews(data){
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}

    
//新闻列表接口
export function GetNewsList(data){
    return service.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

//新闻删除接口
export function DelNewsInfo(data){
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    })
}

//新闻修改接口
export function EditInfo(data){
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data
    })
}