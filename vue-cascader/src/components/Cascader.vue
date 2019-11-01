<template>
    <div class="cascader" v-click-outside="close">
        <div class="title" @click="toggle">
            {{this.result}}
        </div>
        <div v-if="isVisible">
            <!-- 先显示第一层 -->
            <CascaderItem :options="options" :value="value"
                          :level="0" @change="change"></CascaderItem>
        </div>
    </div>
</template>

<script>
    // 可以在全局上挂个事件，当点击的时候校验一下点击是否是cascader中的内容
    // 判断当前点击的是否在某个元素

    // 如果你希望对某个元素拥有一系列的操作，你可以封装一个指令（自定义指令）
    // click-outside

    import util from '../directives/clickOutside'
    import CascaderItem from './CascaderItem'
    import cloneDeep from 'lodash/cloneDeep'
    export default {
        name: "Cascader",
        props:{
            lazyload:{
                type: Function
            },
            value:{
                type: Array,
                default:()=>[]
            },
            options:{
                type: Array,
                default:()=>[]
            }
        },
        data(){
            return {
                isVisible: false,

            }
        },
        directives:{ // 指令是方法，指令有自己的声明周期
            clickOutside: util.clickOutside
        },
        components:{
            CascaderItem
        },
        computed:{
            result(){
                return this.value.map(item=>item.label).join('/')
            }
        },
        methods:{
            handle(id,children){
                let cloneOptions = cloneDeep(this.options)
                // 遍历 树可以采用深度 或者广度
                // 去树中如何找到当前id 为这一项的那个人
                let stack = [...cloneOptions];
                let index = 0;
                let current;
                while (current = stack[index++]) { // 广度遍历
                    if(current.id !== id){
                        if(current.children){
                            stack = stack.concat(current.children)
                        }
                    }else {
                        break;
                    }
                }
                if(current){ // 动态数据加载好后，传递给父亲
                    current.children = children;// 动态添加儿子节点
                    this.$emit('update:options',cloneOptions)
                }
            },
            change(value){
                // 先获取点击的是谁，再调用用户的lazyload方法
                let lastItem = value[value.length - 1]
                let id = lastItem.id;
                if(this.lazyload){
                    // 需要给当前id的这一项添加一个children属性
                    this.lazyload(id,(children) => this.handle(id,children))
                }
                this.$emit('input', value)
            },
            close(){ // 关闭弹框
                this.isVisible = false
            },
            toggle(){ // 切换显示隐藏
                this.isVisible = !this.isVisible
            }
        }
    }
</script>

<style lang="stylus">
    .cascader
        display inline-block;
    .title
        width 150px;
        height 30px;
        border 1px solid #ccc;
    .content
        display flex
    .content-left
        border:1px solid #ccc;
        min-height:150px;
        max-height:150px;
        overflow-y scroll;
    .label
        width 80px;
        padding-left 5px;
    .label:hover
        background:#999;
        cursor pointer
    .title
        line-height 30px;
</style>
