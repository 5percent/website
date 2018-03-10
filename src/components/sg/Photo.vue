<template>
    <div class="photo-wrapper">
        <div class="photo-block" v-for="item in photos">
            <img :src="item.src">
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    data() {
        return {
            photos: [{
                src: 'http://luzhe.info/photo/IMG_0562.JPG'
            }, {
                src: 'http://luzhe.info/photo/IMG_0568.JPG'
            }, {
                src: 'http://luzhe.info/photo/IMG_0569.JPG'
            }, {
                src: 'http://luzhe.info/photo/IMG_0571.JPG'
            }, {
                src: 'http://luzhe.info/photo/IMG_0573.JPG'
            }, {
                src: 'http://luzhe.info/photo/IMG_0575.JPG'
            }, {
                src: 'http://luzhe.info/photo/IMG_0578.JPG'
            }, {
                src: 'http://luzhe.info/photo/WechatIMG3.jpeg'
            }, {
                src: 'http://luzhe.info/photo/z1.jpeg'
            }, {
                src: 'http://luzhe.info/photo/z8.jpeg'
            }, {
                src: 'http://luzhe.info/photo/z4.jpeg'
            }]
        };
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
