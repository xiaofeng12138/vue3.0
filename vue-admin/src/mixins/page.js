
import interfaceUrl from "@/api/interfaceUrl";
import { LoadTableData } from "@/api/common";

let Pagination = {
    data(){
        return{
            pageData:{
                pageNumber:1,
                pageSize:10,
                total:0
            },
        }
    },
    mounted() {
    },
    methods: {
        handleSizeChange(val){
            this.tableConfig.requestDataList.data.pageSize = val;
            this.getTableInfo()
        },
        handleCurrentChange(val){
            this.tableConfig.requestDataList.data.pageNumber = val;
            this.getTableInfo()
        }
       
    },
}


export default Pagination;