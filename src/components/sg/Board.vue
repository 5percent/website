<template>
    <div class="board-wrapper">
        <div class="header">
            <button></button>
        </div>
        <div v-for="note in notes" class="note">
            <p class="text">{{note.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    data() {
        return {
            notes: [{
                content: '表白西西'
            }]
        }
    }
}
</script>

<style lang="less" scoped>
.board-wrapper {
    width: 100%;
    min-height: 100%;
    overflow-y: scroll;

    background-color: #F9F8EB;
}
.header {
    width: 100%;
    height: 1rem;
    background-color: #155263; 
}
button {
    float: right;
    display: inline-block;
    height: .6rem;
    width: .6rem;
    background-image: url('../../../static/img/note.png');
    background-size: 100%;
    background-color: #155263;
    color: #fff;
    font-size: .3rem;
    margin: .15rem .15rem 0 0;

}
.note {
    font-size: .4rem;
    background-color: #FFEBB7;
    margin: .2rem 0;
    padding: .4rem;
    word-wrap: wrap;
    word-break: break-all;
}
</style>
