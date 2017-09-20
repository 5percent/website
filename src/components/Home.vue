<template>
    <div class="home">
        <div class="entries">
            <div class="col">
                <router-link class="entry small snake" to="/snake">贪吃蛇</router-link>
                <router-link class="entry small tetris" to="/tetris">俄罗斯方块</router-link>
                <router-link class="entry small mines" to="/mines">扫雷</router-link>
                <router-link class="entry small sudoku" to="/sudoku">数独</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home'
}
</script>

<style lang="less" scoped>
@import (reference) '../../static/css/variables.less';
    .home {
        width: 100%;
        height: 100%;
        background: url(../../static/img/home-bg-grey.jpg) center no-repeat;
        background-size: cover;

    }
    .entries {
        width: 1000px;
        height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -200px 0 0 -480px;
        font-size: 0;
    }
    .entry {
        vertical-align: top;
        display: inline-block;
        background: @ink;
        color: @white;
        cursor: pointer;
        margin: 3px;

        width: 194px;
        height: 194px;

        &:hover {
            background-color: @dark-ink;

        }

        &.large-i {
            width: 194px;
            height: 394px;
        }
        &.small {
            width: 94px;
            height: 94px;
        }
    }
    .col {
        display: inline-block;
        width: 100px;
        vertical-align: top;
    }

    .snake {
        background: url('../../static/img/home-icons.png') 0 0 no-repeat @blue;
        &:hover {
            background-color: @dark-blue;
        }
    }
    .tetris {
        background: url('../../static/img/home-icons.png') -103px 0 no-repeat @blue;
        &:hover {
            background-color: @dark-blue;
        }
    }
    .sudoku {
        background: url('../../static/img/home-icons.png') -5px -98px no-repeat @blue;
        &:hover {
            background-color: @dark-blue;
        }
    }
    .mines {
        background: url('../../static/img/home-icons.png') -100px -100px no-repeat @blue;
        &:hover {
            background-color: @dark-blue;
        }
    }
</style>
