<template>
    <div id="app">
        <!--获取用户选择的数据-->
        <!--<Cascader :options="options" @input="input"-->
                  <!--v-model="value"></Cascader>-->
        <Cascader :options.sync="options" v-model="value"
                  :lazyload="lazyload"></Cascader>
    </div>
</template>

<script>
import cityList from './data'
import Cascader from "./components/Cascader";

const fetchData = (pid) =>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(cityList.filter(item=> item.pid == pid))
        },100)
    })
}
// fetchData(0).then(data=>{
//     console.log(data)
// })
export default {
    name: 'app',
    data(){
        return {
            value:[],
            options: [
                {
                    "label": "肉类",
                    "children": [
                        {
                            "label": "猪肉",
                            "children": [
                                {
                                    "label": "五花肉"
                                },
                                {
                                    "label": "里脊肉"
                                }
                            ]
                        },
                        {
                            "label": "鸡肉",
                            "children": [
                                {
                                    "label": "鸡腿"
                                },
                                {
                                    "label": "鸡翅"
                                }
                            ]
                        }
                    ]
                },
                {
                    "label": "蔬菜",
                    "children": [
                        {
                            "label": "叶菜类",
                            "children": [
                                {
                                    "label": "大白菜"
                                },
                                {
                                    "label": "小白菜"
                                }
                            ]
                        },
                        {
                            "label": "根茎类",
                            "children": [
                                {
                                    "label": "萝卜"
                                },
                                {
                                    "label": "土豆"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    async mounted(){
        this.options = await fetchData(0)
        // await 是 co + generate 语法糖
    },
    components: {Cascader},
    methods:{
        // 需要在组建内部来处理
        // async input(value){
        //     let currentItem = value[value.length - 1]
        //     let children = await fetchData(currentItem.id)
        //     currentItem.children = children
        //
        //     // vue.set
        //     this.$set(currentItem, 'children', children) // Object.defineProperty
        // },
        async lazyload(id, callback){// 你需要传入一个方法 这个方法第一个参数是你选中的id
            let children = await fetchData(id)
            callback(children)
        }
    }
};
</script>
<style lang="stylus">

</style>
