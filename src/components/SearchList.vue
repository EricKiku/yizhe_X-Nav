<script lang="ts" setup>
import { ref } from "vue"
const props = defineProps(['list'])
const emits = defineEmits(['clickItem'])
function handleClick(key: string) {
    emits('clickItem', key)
}
</script>

<template>
    <div class="searchList">
        <div class="item" @click.stop="handleClick(item)" v-for="(item, index) in props.list" :key="index">
            <div class="img"><img src="/src/assets/icons/search.png" alt=""></div>
            <div class="text" :title="item">{{ item }}</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.searchList {
    height: fit-content;
    background-color: white;
    border-radius: 10px;
    margin-top: 5px;
    padding: 10px;
    transition: all 0.2s;
    max-height: 500px;
    overflow: auto;

    .item {
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;

        .text {
            margin-left: 5px;
            max-width: 400px;
            /* 强制不换行 */
            white-space: nowrap;
            /* 文字用省略号代替超出的部分 */
            text-overflow: ellipsis;
            /* 匀速溢出内容，隐藏 */
            overflow: hidden;
        }

        &:hover {
            background-color: #ebebeb;
        }
    }
}
</style>