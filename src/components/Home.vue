<template>
    <div class="home">
        <router-link to="/snake">贪吃蛇</router-link>
        <router-link to="/tetris">俄罗斯方块</router-link>
        <router-link to="/sudoku">数独</router-link>
    </div>
</template>

<script>
export default {
    name: 'home'
}
</script>

<style lang="less" scoped>
    .home {
        width: 100%;
        height: 100%;
        background: url(../../static/img/home-bg-grey.jpg) center no-repeat;
        background-size: cover;

    }
</style>
