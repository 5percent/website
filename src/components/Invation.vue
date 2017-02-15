<template>
    <div class="invation">
        <div class="section section1">1</div>
        <div class="section section2">2</div>
        <div class="section section3">3</div>
        <div class="section section4">4</div>
    </div>
</template>

<script>
export default {
    name: 'invation',
    mounted() {
        let startY;

        this.$el.addEventListener('touchstart', e => {
            startY = e.changedTouches[0].pageY;
        });
        this.$el.addEventListener('touchend', e => {
            let endY = e.changedTouches[0].pageY;
            let offset = endY - startY;
            this.$options.methods.move(this, offset);
        });
    },
    methods: {
        move(vm, offset) {
            let top = parseInt(vm.$el.style.top || 0, 10);
            
            if (offset > 0) {
                if (top <= -100) {
                    vm.$el.style.top = (top + 100) + '%';
                }
            }
            else {
                if (top >= -200) {
                    vm.$el.style.top = (top - 100) + '%';
                }
            }
        }
    }

}
</script>

<style lang="less" scoped>
    .invation {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;

        transition: 1s top;
    }
    .section {
        width: 100%;
        height: 100%;
        background-color: #fff;

        font-size: 180px;

        &.section1 {
            background-color: red;
        }
        &.section2 {
            background-color: blue;
        }
        &.section3 {
            background-color: yellow;
        }
    }
</style>
