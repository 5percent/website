<template>
    <div class="board-wrapper">
        <div class="header">
            <button @click="show"></button>
        </div>
        <div v-for="note in notes" class="note">
            <p class="text">{{note.text}}</p>
            <span class="note-time">{{note.date}}</span>
        </div>
        <div class="pad" :class="{ 'show': showPad}">
            <div class="pad-header">
                <button class="cancel-btn" @click="hide">cancel</button>
                <button class="pad-btn" @click="post">done</button>
            </div>
            <div class="pad-container">
                <textarea v-model="text" autofocus></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    data() {
        return {
            notes: [],
            showPad: false,
            text: ''
        }
    },
    mounted() {
        this.get();

        socket.off('pushNotes');
        socket.on('pushNotes', data => {
            this.notes = data;
        });

        socket.off('writeNoteDone');
        socket.on('writeNoteDone', () => {
            this.hide();
            this.get();
        });
    },
    methods: {
        show() {
            this.showPad = true;
        },
        hide() {
            this.showPad = false;
        },
        get() {
            socket.emit('getNotes', {ps: 20, pn:1});
        },
        post() {
            if (this.text != '') {
                socket.emit('writeNote', {text: this.text});
            }
        }
    }
}
</script>

<style lang="less" scoped>
.board-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    background-color: #F9F8EB;
}
.header {
    width: 100%;
    height: 1rem;
    background-color: #155263; 

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
}
.note {
    font-size: .4rem;
    background-color: #FFEBB7;
    margin: .2rem 0 1rem;
    padding: .4rem;
    word-wrap: wrap;
    word-break: break-all;
    position: relative;

    .note-time {
        font-size: .2rem;
        line-height: .2rem;
        color: #999;
        position: absolute;
        bottom: -0.3rem;
        right: 0.2rem;
    }
}
.pad {
    position: absolute;
    left: 0;
    right: 0;
    top: -200%;
    height: 100%;
    transition: top .7s linear;

    &.show {
        top: 0;
    }
    

    .pad-header {
        width: 100%;
        height: 1rem;
        background-color: #155263; 
        font-size: 0;
    }

    .pad-btn {
        float: right;
        display: inline-block;
        height: 100%;
        width: 1.2rem;
        color: #fff;
        font-size: .3rem;
        background-color: #155263;
    }

    .cancel-btn {
        float: left;
        display: inline-block;
        height: 100%;
        width: 1.2rem;
        color: #fff;
        font-size: .3rem;
        background-color: #155263;
    }

    .pad-container {
        padding: 0 .5rem;
        height: 100%;
        background-color: #F9F8EB;
    }

    textarea {
        width: 100%;
        height: 50%;
        font-size: .3rem;
        border: none;
        padding: .5rem 0;
        margin: 0;
        background-color: #F9F8EB;
    }
}
</style>
