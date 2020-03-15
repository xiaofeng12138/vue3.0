
import { reactive, ref, onBeforeMount } from "@vue/composition-api";
import interfaceUrl from "@/api/interfaceUrl";
import { LoadTableData } from "@/api/common";

export function loadDataFn() {
    const tableData = reactive({
            item:[],
            total:0
        })

    const getTableInfo =(params)=>{
        // console.log(interfaceUrl[params.url])
        let requestData = {
            url: interfaceUrl[params.url],
            method: params.method,
            data: params.data
        };
        LoadTableData(requestData).then(res => {
             console.log(res)
            let resTableData = res.data.data.data;
            tableData.item = resTableData;
            tableData.total = resTableData.length == 0 ? 0:res.data.data.total;
                // if (resTableData && resTableData.length > 0) {
                //     tableData.item = resTableData;
                //     tableData.total = res.data.data.total;
                // }
            })
            .catch(error => {
            console.log(error);
        });
    }

    return{
        getTableInfo,tableData
    }

    
}