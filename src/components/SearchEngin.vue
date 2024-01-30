<script lang="ts" setup>
import { ref } from "vue"
import { searchEngineIcons } from "../source/source"
const emits = defineEmits(['chooseEngine'])
interface Engine {
    iconId: number,
    key: string,
    name: string,
    img: string
}
// 当前引擎
let currentEngine = ref<Engine>(searchEngineIcons[0])
// 选择引擎
function chooseEngine(engineId: number) {
    let engine = searchEngineIcons.find(engine => {
        return engine.iconId == engineId
    })
    if (engine != undefined) {
        currentEngine.value = engine
        emits('chooseEngine', engine.key)
    }
}

// 是否显示切换引擎
let isChangeEngineShow = ref<boolean>(false)
// 切换显示与否
function handleChangeEngineShow(status: boolean) {
    isChangeEngineShow.value = status

    document.addEventListener('click', closeChangeEngine)
}
// 点击任意地方关闭
function closeChangeEngine() {
    handleChangeEngineShow(false)
    document.removeEventListener('click', closeChangeEngine)
}

</script>

<template>
    <div class="searchEngine">
        <div class="chooseEngine" v-show="isChangeEngineShow">
            <div class="item" :class="{ currentEngineItem: currentEngine.iconId == icon.iconId }"
                @click="chooseEngine(icon.iconId)" v-for="(icon) in searchEngineIcons" :key="icon.iconId">
                <div class="img">
                    <img :src="`/src/assets/searchEngine/${icon.img}`" :alt="icon.name">
                </div>
                <span>{{ icon.name }}</span>
            </div>
        </div>
        <div class="icon" @click.stop="handleChangeEngineShow(true)" :title="currentEngine.name">
            <img :src="`/src/assets/searchEngine/${currentEngine.img}`" :alt="currentEngine.name">
        </div>
    </div>
</template>

<style scoped lang="less">
.searchEngine {
    padding: 5px 10px 5px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .chooseEngine {
        position: absolute;
        left: calc(-100% - 30px);
        top: 50%;
        transform: translateY(-50%);
        background-color: #DDDEDF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 5px;
        padding: 10px;

        .currentEngineItem {
            background-color: white;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .item {
            width: 50px;
            height: 50px;
            margin: 5px;
            padding: 5px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 14px;
            color: rgb(46, 46, 46);

            &:hover {
                background-color: white;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }

            img {
                height: 30px;
                width: 30px;
                margin-bottom: 5px;
            }
        }
    }

    .icon {
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background-color: #ebebeb;
        }
    }
}
</style>