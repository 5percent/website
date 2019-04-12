<template>
    <div class="mine" id="mine" onselectstart="return false">
        <div class="operator">
            <div class="btn-group inline">
                <button class="btn" :class="{active: size == 's'}" @click="changeSize($event, 's')">S</button>
                <button class="btn" :class="{active: size == 'm'}" @click="changeSize($event, 'm')">M</button>
                <button class="btn" :class="{active: size == 'l'}" @click="changeSize($event, 'l')">L</button>
            </div>
            <button class="btn" @click="init">New Game!</button>
        </div>
        <div class="status">
            <label>remains:</label>
            <span>{{ remains }}</span>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <label>cost:</label>
            <span>{{ time + 's'}}</span>
        </div>
        <div class="result">
            <p v-if="win">You Win!</p>
            <p v-else-if="over">Game Over!</p>
        </div>
        <div class="wrapper">
            <div class="row" v-for="(map_row, i) in map">
                <div class="field" v-for="(field, j) in map_row" 
                    :class="{
                        'unchecked': field.val === undefined,
                        'flag-field': field.isFlag,
                        'mine-field': over && field.isMine && !field.isFlag,
                        'error-flag': over && field.isMine && field.isFlag
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
            size: 'm',
            map: {
                change: true
            },
            row: 0,
            col: 0,
            mines_num: 0,
            remains: 0,
            time: 0,
            clock: null,
            over: false,
            win: false
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.over = false;
            this.win = false;
            this.time = 0;
            clearInterval(this.clock);
            this.clock = null;

            // set fields
            switch(this.size) {
                case 's':
                    this.row = 9;
                    this.col = 9;
                    this.mines_num = 10;
                    break;
                case 'm':
                    this.row = 16;
                    this.col = 16;
                    this.mines_num = 40;
                    break;
                case 'l':
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

            if (this.over || this.map[row][col].isFlag || this.map[row][col].val !== undefined) {
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

            if (this.over || this.map[row][col].isFlag) {
                return false;
            }

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

            if (this.over || this.map[row][col].val !== undefined) {
                return false;
            }
            this.map[row][col].isFlag = !this.map[row][col].isFlag;
            this.map[row][col].isFlag ? this.remains-- : this.remains++;
            this.map.change = !this.map.change;

            return false;
        },
        changeSize(e, size) {
            this.size = size;
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
                    this.win = true;
                    clearInterval(this.clock);
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) '../../static/css/variables.less';
.mine {
    width: 800px;
    margin: 60px auto;
    text-align: center;
}
.operator, .status, .result {
    margin-bottom: 15px;
}
.status {
    label {
        font-size: 20px;
    }
    span {
        font-size: 20px;
        display: inline-block;
        width: 25px;
        text-align: left;
        font-weight: 700;
    }
}
.result {
    height: 30px;
    font-size: 20px;
    line-height: 1.5em;
    font-weight: 700;
    color: @dark-red;
}
.wrapper {
    font-size: 0;
    border: 1px solid @dark-ink;
    border-width: 2px 1px 1px 2px;
    display: inline-block;
}
.field{
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #000;
    border-width: 0 1px 1px 0;
    cursor: pointer;
    font-size: 16px;
    vertical-align: top;
    background-color: @white;

    &.unchecked {
        background: @dark-white;
    }
    &.mine-field {
        background: url('../../static/img/mines.png') -25px 0;
    }
    &.flag-field {
        background: url('../../static/img/mines.png');
    }
    &.error-flag {
        background: url('../../static/img/mines.png') 0 -25px;
    }
}
</style>
