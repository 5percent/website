<template>
    <div class="home">
        <router-link to="/invation">invation</router-link>
        <a href="/games/snake">贪吃蛇</a>
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
