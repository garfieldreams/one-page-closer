
document.addEventListener('click', function (event) {
    // 获取点击位置坐标
    const clickX = event.clientX;
    const clickY = event.clientY;

    // 创建色块元素
    const block = document.createElement('div');
    block.classList.add('color-block');

    // 设置随机颜色
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    block.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // 设置色块随机大小
    const size = Math.floor(Math.random() * 71) + 30;
    block.style.width = `${size}px`;
    block.style.height = `${size}px`;

    // 设置色块随机位置
    block.style.left = `${clickX - size / 2}px`;
    block.style.top = `${clickY - size / 2}px`;

    // 添加到页面中
    document.body.appendChild(block);

    // 延迟后移除色块
    setTimeout(() => {
        block.style.transform = 'scale(2)';
        block.style.opacity = '0';
        setTimeout(() => block.remove(), 1000);
    }, 200);
})
