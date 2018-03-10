<template>
    <div class="board-wrapper">
        <div class="board">
            <div v-for="note in notes" class="note">
                <p class="text">{{note.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    data() {
        return {
            notes: [{
                content: '123'
            }, {
                content: '1123ajdflajdflajdlfjadlkfaldkfjalkdjfadifuaodifqd,nfdfaoidjfalkdsjfqejflkadsjfalkdjflkdsjaf123ajdflajdflajdlfjadlkfaldkfjalkdjfadifuaodifqd,nfdfaoidjfalkdsjfqejflkadsjfalkdjflkdsjaf123ajdflajdflajdlfjadlkfaldkfjalkdjfadifuaodifqd,nfdfaoidjfalkdsjfqejflkadsjfalkdjflkdsjaf123ajdflajdflajdlfjadlkfaldkfjalkdjfadifuaodifqd,nfdfaoidjfalkdsjfqejflkadsjfalkdjflkdsjaf123ajdflajdflajdlfjadlkfaldkfjalkdjfadifuaodifqd,nfdfaoidjfalkdsjfqejflkadsjfalkdjflkdsjaf23ajdflajdflajdlfjadlkfaldkfjalkdjfadifuaodifqd,nfdfaoidjfalkdsjfqejflkadsjfalkdjflkdsjaf'
            }, {
                content: '123'
            }, {
                content: '123'
            }, {
                content: '123'
            }, {
                content: '123'
            }, {
                content: '123'
            }, {
                content: '123'
            }, {
                content: '123'
            }]
        }
    }
}
</script>

<style lang="less" scoped>
    .board-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #E6F7F7;
        overflow: scroll;
    }
    .board {
        background-color: #333;
        position: relative;
        width: 920px;
        min-height: 800px;
        top: 200px;
        left: 50%;
        margin: 0 0 0 -460px;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 0 10px 2px #000;
        padding: 15px;
        font-size: 0;
    }
    .note {
        display: inline-block;
        background-color: #FFE495;
        padding: 15px;
        width: 170px;
        min-height: 120px;
        border-radius: 5px;
        word-wrap: break-word;
        text-align: justify;
        vertical-align: top;
        margin: 15px;
        font-size: 14px;
    }
    .text {
        color: #434343;
    }
    
</style>
