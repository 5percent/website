<template>
    <div class="mine" id="mine">
        <div class="operator">
            <input type="radio" v-model="size" value="tall" id="tall"><label for="tall">tall</label>
            <input type="radio" v-model="size" value="grande" id="grande"><label for="grande">grande</label>
            <input type="radio" v-model="size" value="venti" id="venti"><label for="venti">venti</label>
            <button @click="init">New Game!</button>
        </div>
        <div class="status">
            remains: {{ remains }}
            cost: {{ time }}
        </div>
        <div class="wrapper">
            <div class="row" v-for="(map_row, i) in map">
                <div class="field" v-for="(field, j) in map_row" 
                    :class="{
                        'unchecked': field.val === undefined,
                        'mine-field': over && field.isMine,
                        'flag-field': field.isFlag
                    }"
                    @click="check($event, i, j)"
                    @dblclick="checkAround($event, i, j)"
                    @contextmenu="mark($event, i, j)"
                >{{ field.val }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mine',
    data(){
        return {
            size: 'grande',
            map: {
                change: true
            },
            row: 0,
            col: 0,
            mines_num: 0,
            remains: 0,
            time: 0,
            clock: null,
            over: false
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.over = false;
            this.time = 0;
            this.clock = null;

            // set fields
            switch(this.size) {
                case 'tall':
                    this.row = 9;
                    this.col = 9;
                    this.mines_num = 10;
                    break;
                case 'grande':
                    this.row = 16;
                    this.col = 16;
                    this.mines_num = 40;
                    break;
                case 'venti':
                    this.row = 16;
                    this.col = 30;
                    this.mines_num = 99;
                    break;
            }
            this.remains = this.mines_num;

            this.map = {
                change: true
            };
            for (let i = 0; i < this.row; i++) {
                let colObj = {};
                for (let j = 0; j < this.col; j++) {
                    colObj[j] = {
                        val: undefined,
                        isMine: false,
                        isFlag: false
                    };
                }
                this.map[i] = colObj;
            }

            // set mines
            for (let num = 0; num < this.mines_num; num++) {
                while(1) {
                    let mine_row = Math.round(Math.random() * 1000) % this.row;
                    let mine_col = Math.round(Math.random() * 1000) % this.col;
                    if (!this.map[mine_row][mine_col].isMine) {
                        this.map[mine_row][mine_col].isMine = true;
                        break;
                    }
                }
            }
        },
        check(e, row, col) {
            if (!this.clock) {
                this.clock = setInterval(() => {
                    this.time++;
                }, 1000);
            }

            if (this.over || this.map[row][col].isFlag || this.map[row][col].val === '') {
                return false;
            }

            if (this.map[row][col].isMine) {
                this.over = true;
                clearInterval(this.clock);
                return false;
            }

            row = +row;
            col = +col;
            let row_start = row > 0 ? row - 1 : row;
            let col_start = col > 0 ? col - 1 : col;
            let mine_num = 0;

            for (let i = row_start; i < row + 2 && i < this.row; i++) {
                for (let j = col_start; j < col + 2 && j < this.col; j++) {
                    if (this.map[i][j].isMine)
                        mine_num++;
                }
            }
            if (mine_num != 0) {
                this.map[row][col].val = mine_num;
                this.map.change = !this.map.change;
            }
            else {
                this.map[row][col].val = '';
                this.checkAround(null, row, col);
            }
        },
        checkAround(e, row, col) {
            e && e.preventDefault();
            row = +row;
            col = +col;
            let row_start = row > 0 ? row - 1 : row;
            let col_start = col > 0 ? col - 1 : col;
            let mine_num = 0;

            for (let i = row_start; i < row + 2 && i < this.row; i++) {
                for (let j = col_start; j < col + 2 && j < this.col; j++) {
                    this.check(null, i, j);
                }
            }

        },
        mark(e, row, col) {
            e && e.preventDefault();

            if (this.over) {
                return false;
            }
            this.map[row][col].isFlag = !this.map[row][col].isFlag;
            this.map[row][col].isFlag ? this.remains-- : this.remains++;
            this.map.change = !this.map.change;

            return false;
        }

    },
    watch: {
        size() {
            this.init();
        },
        map: {
            deep: true,
            handler() {
                if (!this.over) {
                    for (let i = 0; i < this.row; i++) {
                        for (let j = 0; j < this.col; j++) {
                            if (this.map[i][j].val === undefined && !this.map[i][j].isMine) 
                                return false;
                        }
                    }

                    this.over = true;
                    clearInterval(this.clock);
                    alert('You Win!')
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.mine {
    width: 800px;
    margin: 60px auto;
    text-align: center;
}
.operator, .status {
    margin-bottom: 30px;
}
.wrapper {
    font-size: 0;
    border: 1px solid #000;
    border-width: 1px 0 0 1px;
    display: inline-block;
}
.field{
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid #000;
    border-width: 0 1px 1px 0;
    cursor: pointer;
    font-size: 16px;
    vertical-align: top;

    &.unchecked {
        background-color: #e3e3e3;
    }
    &.mine-field {
        background-color: red;
    }
    &.flag-field {
        background-color: yellow;
    }
}
</style>