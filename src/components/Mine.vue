<template>
    <div class="mine">
        <input type="radio" v-model="size" value="tall" id="tall"><label for="tall">小</label>
        <input type="radio" v-model="size" value="grende" id="grende"><label for="grende">中</label>
        <input type="radio" v-model="size" value="venti" id="venti"><label for="venti">大</label>
    </div>
</template>

<script>
export default {
    name: 'mine',
    data(){
        return {
            size: 'grende',
            map: null

        }
    },
    mounted() {
        this.init();

    },
    methods: {
        init() {
            // 9*9
            // 16*16
            // 16*30
            

        }

    }
}
</script>

<style lang="less" scoped>
</style>