import {shallowMount} from '@vue/test-utils';
// shallowMount 是挂载，它里面还有其他组件的话是不被渲染
// 只会渲染第一层
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
// 套件
describe('HelloWorld.vue', () => {
    // 用例
    it('renders props.msg when passed', () => {
        // let Sub = Vue.extend(HelloWorld)
        // let vm = new Sub({
        //     propsData:{
        //         msg: 'hello'
        //     }
        // })
        // vm.$mount(); // 如果没有el 会将挂载的结果放到vm.$el属性上
        // // jest 文档
        // expect(vm.$el.innerHTML).toContain('敏爷hello');
        // // vm.$el.innerHTML === '敏爷hello'

        let wrapper = shallowMount(HelloWorld,{
            propsData:{
                msg: 'hello'
            }
        });

        // find('#hello') 是标签选择器
        // 断言
        expect(wrapper.find('#hello').text()).toContain('敏爷hello')
    });
});
