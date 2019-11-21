<template>
    <div class="header">
        <div class=" pull-left meun">
            <img src="./menu .png" alt="" >
        </div>
      
         <div class="right">
            <div class="user-info">
                <img src="./avater.jpg" alt="">
            </div>
            <p>管理员</p>
            <div class="logout">
               <img src="./logout.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
.header{
    position: fixed;
    top: 0;
    left:$menuWidth;
    height: 75px;
    .meun{
        height: 75px;
        img{
            margin:20px;
            display: block;
            width: 35px;
            height: 35px;
            cursor: pointer;
        }
    }
    .right{
        position: fixed;
        top: 0;
        right: 0;
        float: right;
        display: flex;
        height: 75px;
        .user-info{
            height: 75px;
            img{
                
                margin:10px;
                display: block;
                width: 55px;
                height: 55px;
                border-radius: 50%;
            }
        }
        p{
            line-height: 75px;
            font-size: 16px;
            font-weight: bold;
            margin-right: 50px;
        }
   
    .logout{
        img{
               display: block;
                margin:20px;
                width: 35px;
                height: 35px;
                margin-right: 70px;
                cursor: pointer;
            }
        }

    }
}
</style>


