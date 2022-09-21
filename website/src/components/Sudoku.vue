<template>
    <div class="sudoku">
        <div class="pannel">
            <div class="row" v-for="(row, i) in map">
                <div class="unit" v-for="(unit, j) in row" @click="focus($event, i, j)"
                    :class="{
                        active: current.row === i && current.col === j,
                        'border-bottom-bold': i % 3 == 2,
                        'border-right-bold': j % 3 == 2
                    }"
                >
                {{ unit }}
                </div>
            </div>
        </div>
        <div class="operation">
            <div class="wrapper">
                <div class="unit" v-for="(val, ind) in [1,2,3,4,5,6,7,8,9]" @click="select($event, val)">
                    {{val}}
                </div>
                <button class="btn complete-btn" @click="complete">生成结果</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'sudoku',
    data() {
        return {
            map: (()=>{
                let map = {};
                let arr = [0,1,2,3,4,5,6,7,8];
                arr.forEach((i) => {
                    let colArr = {};
                    arr.forEach((j) => {
                        colArr[j] = undefined;
                    });
                    map[i] = colArr;
                });
                return map;
            })(),
            current: {
                row: null,
                col: null
            }
        }
    },
    mounted() {
    },
    methods: {
        focus(e, row, col) {
            let dom = e.currentTarget;
            this.current.row = row;
            this.current.col = col;
        },
        select(e, val) {
            if (!this.current.row || !this.current.col) {
                return false;
            }

            this.map[this.current.row][this.current.col] = val;

        },
        complete() {
            let _this = this;
            let check = function (unit) {
                let {row, col} = unit;
                let val = _this.map[row][col];

                // 检查整行
                for(let i = 0; i < 9; i++) {
                    if (i === col) {
                        continue;
                    }

                    if (val === _this.map[row][i]) {
                        return false;
                    }
                }

                // 检查整列
                for(let i = 0; i < 9; i++) {
                    if (i === row) {
                        continue;
                    }

                    if (val === _this.map[i][col]) {
                        return false;
                    }
                }

                // 检查九宫格
                let row_grid = Math.floor(row / 3);
                let col_grid = Math.floor(col / 3);
                for(let i = row_grid * 3; i < row_grid * 3 + 3; i++) {
                    for(let j = col_grid * 3; j < col_grid * 3 + 3; j++) {
                        if (i === row && j === col) {
                            continue;
                        }

                        if (val === _this.map[i][j]) {
                            return false;
                        }
                    }
                }

                return true;
            };

            let next = function (unit) {
                let {row, col} = unit;
                if (col < 8) {
                    return {
                        row: row,
                        col: col + 1
                    }
                }
                else if (row < 8) {
                    return {
                        row: row + 1,
                        col: 0
                    }
                }
                else {
                    return null;
                }
            }

            let setUnit = function (unit) {
                let {row, col} = unit;
                let next_unit = next(unit);

                for (let i = 0; i < 9; i++) {
                    _this.map[row][col] = i;

                    if (!check(unit)) {
                        continue;
                    }

//                    _this.map[row][col] = 1;
                }
                if (next_unit) {
                    setUnit(next_unit);
                }
            };

            setUnit({row: 0, col: 0});
        }
    }
}
</script>

<style lang="less" scoped>
    .pannel {
        width: 462px;
        margin: 60px auto;
        border-width: 2px 0 0 2px;
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
        line-height: 50px;
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;

        &.border-right-bold {
            border-right-width: 2px;
        }
        &.border-bottom-bold {
            border-bottom-width: 2px;
        }
        &.active {
            box-shadow: inset 0 0 10px 0px #08c;
        }
    }

    .wrapper {
        border-width: 1px 0 0 1px;
        border-style: solid;
        border-color: #000;
        width: 459px;
        margin: 0 auto;

    }
    .btn {
       
    }
    .complete-btn {
        position: absolute;
    }
</style>
