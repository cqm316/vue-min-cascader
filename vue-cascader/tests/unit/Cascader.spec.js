import {shallowMount} from '@vue/test-utils';
import Cascader from '@/components/Cascader'
import CascaderItem from '@/components/CascaderItem'

describe('测试Cascader组件是否符合预期',()=>{
    it('测试当前close事件是否能正常触发',()=>{
        const wrapper = shallowMount(Cascader,{
            propsData:{
                isVisible:true,
            }
        })
        expect(wrapper.vm.isVisible).toBeTruthy;
        wrapper.vm.close();
        expect(wrapper.vm.isVisible).toBeFalsy;
    });
    it('测试handle 能否正常找到那一项',()=>{
        const wrapper = shallowMount(Cascader,{
            propsData:{
                options:[
                    {
                        id:1,
                        label:'上海',
                        children:[{id:2,label:'xxx'}]
                    },{
                        id:3,
                        label:'北京',
                        children:[{id:4,label:'昌平区'}]
                    }
                ]
            }
        })
        wrapper.vm.handle(1,[]);
        expect(wrapper.emitted()['update:options']).toBeTruthy;
        wrapper.vm.handle(2,[]);
        expect(wrapper.emitted()['update:options']).toBeTruthy;
        wrapper.vm.handle(5,[]);
        expect(wrapper.emitted()['update:options']).toBeFalsy;
    })
    it('测试lazyload 是否能执行',()=>{
        let fn = jest.fn(); // 模式一个函数
        const wrapper = shallowMount(Cascader,{
            propsData:{
                lazyload: fn
            }
        })
        wrapper.find('.title').trigger('click'); // 点击头
        wrapper.find(CascaderItem).vm.$emit('change',[
            {
                id:1,
                label:'上海',
                children:[{id:2,label:'xxx'}]
            }
        ])
        expect(fn).toBeCalled();
    })
})
