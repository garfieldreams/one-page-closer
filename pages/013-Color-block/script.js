const canvas = document.getElementById('canvas'); // 获取画布容器

canvas.addEventListener('click', function(e){
    const square = document.createElement('div'); // 创建方块元素
    square.classList.add('square'); // 给创建的方块添加square类

    const size = Math.floor(Math.random() * 51) + 30; // 给方块设置随机大小
    square.style.width = `${size}px`;
    square.style.height = `${size}px`;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`; // 给方块设置随机颜色

    square.style.left = `${e.clientX - size/2}px`;
    square.style.top = `${e.clientY - size/2}px`;

    square.addEventListener('click', function(e){
        e.stopPropagation();
        canvas.removeChild(this);
    })

    canvas.appendChild(square); // 把方块添加到画布容器中
})
