// 按class获取元素
const textElement = document.querySelector('.text');
const buttons = document.querySelectorAll('.btn');

// 遍历btn, 绑定点击事件
buttons.forEach(button => {
    button.addEventListener('click', function(){
        // 通过data-color获取当前按钮颜色
        const color = this.getAttribute('data-color');
        // 改变文字颜色
        textElement.style.color = color;
    });
});