<template>
    <div class="layout">
        <div class="wrap">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
.layout{
    position: fixed;
    left: $menuWidth;
    top: 75px;
    right: 0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    box-sizing: border;
    @include webkit(transition, all .3s ease 0s); //scss自定义样式函数
    .wrap{
        padding: 30px;
    }
}
.open{
    .layout{
         left:$menuWidth;
    }
}
.close{
    .layout{
         left:$menuMinWidth;
    }
}
</style>


