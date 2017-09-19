<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'app',
}
</script>

<style lang="less">
@import '../static/css/variables.less';
@import '../static/css/global.less';
#app {
    height: 100%;
    width: 100%;
}
</style>
