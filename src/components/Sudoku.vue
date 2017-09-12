<template>
    <div class="sudoku">
        <div class="row" v-for="row in map">
            <div class="unit" v-for="unit in row">
                <p class="context" v-text="unit" @input="unit = $event.target.innerText"></p>
            </div>
        </div>
    </div>
</template>

<script>
let map = new Array();
let ind = 9;
while(ind--) {
//    map.unshift(new Array(9));
    map.unshift(new Array(1,2,3,4,5,6,7,8,9));
}

export default {
    name: 'sudoku',
    data() {
        return {
            map
        }
    },
    mounted() {
        console.log(this.map);

    }
}
</script>

<style lang="less" scoped>
    .sudoku {
        width: 459px;
        margin: 60px auto;
        border-width: 1px 0 0 1px;
        border-style: solid;
        border-color: #000;
    }
    .unit {
        display: inline-block;
        border-width: 0 1px 1px 0;
        border-style: solid;
        border-color: #000;
        width: 50px;
        height: 50px;
        text-align: center;
        vertical-align: middle;

        p {
            display: inline;
            line-height: 50px;
            font-size: 20px;
        }
    }
</style>
