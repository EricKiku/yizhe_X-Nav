<script lang="ts" setup>
import { ref, computed } from "vue"
import { urls } from "@/source/source"
import Search from "./Search.vue";

// 遮罩层透明度
let overlayOpacity = ref(0)
function handleOverlay(status: boolean) {
    overlayOpacity.value = status ? 0.4 : 0
}
</script>

<template>
    <div class="overlay" :style="{ opacity: overlayOpacity }"></div>
    <div class="layout" :style="{ backgroundImage: `url(${urls[0]})` }">
        <Search @handleOverlay="handleOverlay" />
    </div>
</template>

<style scoped>
.overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: black;
    opacity: 0.4;
    transition: all 0.2s;
}

.layout {
    height: 100%;
    width: 100%;
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    background-color: #363636;
}
</style>