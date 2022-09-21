<template>
    <div class="garden-wrapper">
        <div class="router-box">
            <router-link class="block photo" to="/photo">照片墙</router-link>
            <router-link class="block board" to="/board">便签板</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'garden',
    data() {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
    .garden-wrapper {
        height: 100%;
        width: 100%;
        background: url('../../../static/img/sg/bg.jpg');
        background-size: cover;
        background-position: center;
    }
    .router-box {
        padding-top: 2rem;
    }
    .block {
        display: block;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: 10%;

        margin: .5rem auto;
        background-color: #F9F8EB;
        opacity: .7;

        font-size: .4rem;
        color: #000;
        text-align: center;
    }
</style>
