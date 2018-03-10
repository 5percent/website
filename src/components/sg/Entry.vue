<template>
    <div class="entry-wrapper">
        <div class="line">
            <label>输入日期</label>
            <input class="input" type="date" v-model="date">
        </div>
        <div class="line" v-if="date == '2016-05-28'">
            <label>输入姓名</label>
            <input class="input" type="type" v-model="address">
        </div>
        <div class="line">
            <button @click="cal">计算</button>
        </div>
        <div class="line" v-if="offset">
            <p>该日期距今{{offset}}天</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    data() {
        return {
            date: '2018-01-01',
            offset: 0,
            address: '',
        }
    },
    methods: {
        cal() {
            var start = new Date(this.date).getTime();
            var today = new Date().getTime();
            var result;

            if (start === start) {
                this.offset = Math.floor((today - start) / 86400000);
            }

            if (this.address === 'Phuket') {
                window.permission = true;
                this.$router.push({path: '/garden'})
            }
        }
    },
    watch: {
    }
}
</script>

<style lang="less" scoped>
.entry-wrapper {
    font-size: .4rem;
}
.line {
    width: 100%;
    border-bottom: .02rem solid #eee;
    height: 1rem;

    label {
        color: #333;
        width: 30%;
        border-right: .02rem solid #eee;
        display: inline-block;
        padding: .2rem;

    }
    .input {
        border: none;
        background-color: #fff;
        width: 50%;
        padding: .2rem;
    }
}

button {
    width: 100%;
    height: 100%;
    background-color: #00204A;
    color: #fff;
    display: inline-block;
}

p {
    line-height: 1rem;
    text-align: center;

}
</style>
