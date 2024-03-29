export default { // 指令是一个方法  指令有自己的生命周期
     // bind update
    clickOutside: {
        inserted(el, bindings) { // el真实的dom元素
            el.listener = function listener(e) {
                if (e.target === el || el.contains(e.target)) {
                    return;
                }
                bindings.value(); // close事件
            };
            document.addEventListener('click', el.listener);
        },
        unbind(el) {// 在指令卸载的时候，执行此操作
            document.removeEventListener('click', el.listener);
        },
    },
};
