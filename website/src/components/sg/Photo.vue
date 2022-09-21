<template>
    <div class="photo-wrapper">
        <div class="photo-block" v-for="item in photos">
            <img :src="item.url">
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    data() {
        return {
            photos: []
        };
    },
    mounted() {
        //TODO 修改为多次加载
        socket.emit('getPhotos', {ps: 20, pn:1});

        socket.off('pushPhotos');
        socket.on('pushPhotos', data => {
            this.photos = this.photos.concat(data);
        });

        // socket.once('noMorePhotos', data => {
        // });
    }
};
</script>

<style lang="less" scoped>
.photo-wrapper {
    width: 100%;
    background-color: #F9F8EB;
    overflow-y: scroll;
    position: absolute;
    top: 0;
}

.photo-block {
    width: 100%;
    margin-bottom: .2rem;

    img {
        width: 100%;
        height: 100%;
    }
}
    
</style>
