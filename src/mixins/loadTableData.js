import interfaceUrl from "@/api/interfaceUrl";
import { LoadTableData } from "@/api/common";

let loadTableData = {
    data(){
        return{}
    },
    mounted() {
        this.getTableInfo()
    },
    methods: {
        getTableInfo(){
        let requsetJson = this.tableConfig.requestDataList;
        let requestData = {
            url: interfaceUrl[requsetJson.url],
            method: requsetJson.method,
            data: requsetJson.data
        };
        LoadTableData(requestData).then(res => {
            let resTableData = res.data.data.data;
            if (resTableData && resTableData.length > 0) {
                this.tableData = resTableData
                this.pageData.total =  res.data.data.total;
              }
            })
            .catch(error => {
            console.log(error);
        });
      }
    },
}


export default loadTableData;