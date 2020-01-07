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