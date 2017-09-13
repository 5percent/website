<template>
    <div class="sudoku">
        <div class="pannel">
            <div class="row" v-for="(row, i) in map">
                <div class="unit" v-for="(unit, j) in row"
                    @click="focus($event, i, j)" v-text="unit"
                    @input="unit = $event.target.innerText"
                    :class="{
                        active: current.row === i && current.col === j,
                        'border-bottom-bold': i % 3 == 2,
                        'border-right-bold': j % 3 == 2
                    }"
                >
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
let map = new Array();
let ind = 9;
while(ind--) {
//    map.unshift(new Array(9));
}
map.push(new Array(1,2,3,4,5,6,7,8,9));
map.push(new Array(4,5,6,7,8,9,1,2,3));
map.push(new Array(2,8,9,1,7,3,4,5,6));
map.push(new Array(1,2,3,4,5,6,7,8,9));
map.push(new Array(1,2,3,4,5,6,7,8,9));
map.push(new Array(1,2,3,4,5,6,7,8,9));
map.push(new Array(1,2,3,4,5,6,7,8,9));
map.push(new Array(1,2,3,4,5,6,7,8,9));
map.push(new Array(1,2,3,4,5,6,7,8,9));

export default {
    name: 'sudoku',
    data() {
        return {
            map,
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
            let check = function (row, col) {
                let val = map[row][col];

                // 检查整行
                for(let i = 0; i < 9; i++) {
                    if (i === col) {
                        continue;
                    }

                    if (val === map[row][i]) {
                        return false;
                    }
                }

                // 检查整列
                for(let i = 0; i < 9; i++) {
                    if (i === row) {
                        continue;
                    }

                    if (val === map[i][col]) {
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

                        if (val === map[i][j]) {
                            console.log(i, j)
                            return false;
                        }
                    }
                }

                return true;
            };

            let next = function (unit) {
                if (unit.col < 8) {
                    return {
                        row: unit.row,
                        col: unit.col + 1
                    }
                }
//                else if (unit.)
            }

            let setUnit = function (row, col) {
                if (map[row][col] != undefined) {
                    
                }
                
            };
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
