
import { reactive } from "@vue/composition-api";

export function  Pagination() {

 const pageData = reactive({
     pageNumber:1,
     pageSize:10,
     total:0
 })

 const chageTotal = (val)=>{
     pageData.total = val ;
 }

 const handleSizeChange = (val)=>{
    pageData.pageSize = val
 }
 const handleCurrentChange = (val)=>{
      pageData.pageNumber = val
 }

  
 return {
     pageData,handleSizeChange,handleCurrentChange,chageTotal
 }
    
}

