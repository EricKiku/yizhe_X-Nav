<script lang="ts" setup>
import { ref } from "vue"
import { debounce } from "@/tools/debouncs"
import SearchEngin from "./SearchEngin.vue";
import SearchList from "./SearchList.vue"
import { bingSugApi, baiduSugApi, googleSugApi, sogouSugApi } from "@/apis/sug"
import axios from "axios"
const emits = defineEmits(['handleOverlay'])
let searchKey = ref("")
// 清空搜索关键字
function clearSearchKey() {
    searchKey.value = ""
    // 调用一次空搜索条目
    change()
}
// 回车搜索
function enterSearch() {
    openPageSearch(engine.value, searchKey.value)
}

// 各引擎sug返回结果的回调函数
window.sug = {
    bing: function (sugData: any) {
        searchList.value = []
        // 如果没有结果，则直接返回空数组
        if (!sugData.AS.Results) {
            searchList.value = []
            return;
        }
        for (const result of sugData.AS.Results) {
            result.Suggests.map((item: any) => {
                searchList.value.push(item.Txt)
            })
        }
    },
    baidu: function (data: any) {
        if (data) {
            searchList.value = data.s
        } else {
            searchList.value = []
        }
    },
    google: function (data: any) {
        console.log(data);
    }
}

// 获取搜索提示
const change = debounce(() => {
    switch (engine.value) {
        case 'bing':
            bingSugApi(searchKey.value).then(res => {
                eval(res.data)
            })
            break;
        case 'google':
            googleSugApi(searchKey.value).then(res => {
                eval(res.data)
            })
            break;
        case 'baidu':
            baiduSugApi(searchKey.value).then(res => {
                if (searchKey.value) {
                    eval(res.data)
                } else {
                    searchList.value = []
                }
            })
        case 'sougou':
            sogouSugApi(searchKey.value).then(res => {
                console.log(res);
                // eval(res.data)
            })
        default:
            break;
    }
}, 100)

// 透明度变化
let opacity = ref(0.8)
// 处理获取或失去焦点
function handleFocus(status: boolean) {
    // 搜索组件透明度
    opacity.value = status ? 1 : 0.9
    // 智能词条是否显示
    searchListShow.value = status
    // 父组件遮罩层
    emits("handleOverlay", status)
    // 获取焦点(status==true)时，如果下拉词条列表没有值，则查询一次空搜索，获取热点条目
    if (status && searchList.value.length == 0) {
        change()
    }
    document.addEventListener('click', handleBlur)
}
// 点击任意地方失去焦点
function handleBlur() {
    handleFocus(false)
    document.removeEventListener('click', handleBlur)
}

// 当前选择的引擎
let engine = ref('bing')
// 切换引擎，获取key
function chooseEngine(key: string) {
    engine.value = key
}

// 打开新网页并搜索
function openPageSearch(engine: string, key: string) {
    switch (engine) {
        case 'bing':
            window.open(`https://www.bing.com/search?q=${key}`, "_blank")
            break;
        case 'baidu':
            window.open(`https://www.baidu.com/s?ie=utf-8&wd=${key}`, "_blank")
            break;
        case 'google':
            window.open(`https://www.google.com/search?q=${key}`, "_blank")
            break;
    }
}

// 搜索下拉词
let searchList = ref<string[]>([])
// 下拉词条是否显示
let searchListShow = ref(false)
// 处理搜索下拉词点击后传递的搜索内容
function handleSearchListClick(key: string) {
    console.log('条目点击');
    openPageSearch(engine.value, key)
}
</script>

<template>
    <div class="search" :style="{ opacity: opacity }">
        <div class="content">
            <SearchEngin @chooseEngine="chooseEngine" />
            <input @keydown.enter="enterSearch" @input="change" @click.stop="handleFocus(true)" v-model="searchKey"
                type="text" placeholder="有问题就搜一下吧">
            <div class="close">
                <img @click="clearSearchKey" v-show="searchKey" src="/src/assets/icons/close.png" alt="">
            </div>
        </div>
        <SearchList @clickItem="handleSearchListClick" :list="searchList"
            v-show="searchListShow && searchList.length != 0" />
    </div>
</template>

<style scoped lang="less">
.search {
    position: relative;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    padding: 20px;
    width: fit-content;
    height: fit-content;

    .content {
        background-color: white;
        border-radius: 10px;
        min-width: 600px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        display: flex;
        // overflow: hidden;
        padding-right: 20px;

        input {
            padding: 15px 20px 15px 0px;
            font-size: 20px;
            border: 1px solid var(--border-color);
            outline: none;
            transition: all 0.2s;
            color: rgb(54, 51, 51);
            height: 100%;
            width: 100%;

            &::placeholder {
                color: #ccc;
            }
        }

        .close {
            display: flex;
            flex-direction: column;
            justify-content: center;

            img {
                cursor: pointer;
                transition: all 0.2s;

                &:hover {
                    transform: rotate(180deg);
                }
            }
        }
    }

}
</style>