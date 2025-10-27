// 1. 获取元素
const colorOptionsContainer = document.getElementById('colorOptions');
const clearBtn = document.getElementById('clearBtn');
const pixelCanvas = document.getElementById('pixelCanvas');

// 2. 定义取色器颜色列表
const COLOR_LIST = [ // 内置颜色列表（无需网络）
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#9900ff',
    '#333333', '#666666', '#999999', '#cccccc', '#ff6666'
];
const CANVAS_SIZE = 20; // 画布尺寸常量：20 * 20方格

// 3. 定义全局变量
let isDrawing = false; // 是否处于绘图模式，鼠标按住为true
let selectedColor = '#000000';

// 4. 定义核心函数
// 4.1 颜色选择器
function renderColorOptions() {
    colorOptionsContainer.innerHTML = ''; // 清空容器

    COLOR_LIST.forEach(color => {
        const colorSquare = document.createElement('div');
        colorSquare.className = 'color-option';
        colorSquare.style.backgroundColor = color;

        // 初始选中第一个颜色 - 默认#000000
        if (color === selectedColor){
            colorSquare.classList.add('selected');
        }

        // 点击颜色方块：切换选中颜色
        colorSquare.addEventListener('click', function () {
            // 移除所有颜色方块的选中状态
            document.querySelectorAll('.color-option').forEach(square => {
                square.classList.remove('selected');
            })
            colorSquare.classList.add('selected');// 给当前点击的颜色方块添加选中状态
            selectedColor = color; // 更新选中的颜色
        })
        colorOptionsContainer.appendChild(colorSquare);
    })
}

// 4.2 生成像素画布
function renderPixelCanvas() {
    pixelCanvas.innerHTML = ''; // 清空画布

    // 循环创建方格 - CANVAS_SIZE * CANVASE_SIZE
    for (let i = 0; i < CANVAS_SIZE * CANVAS_SIZE; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';

        // 点击方格： 填充颜色
        pixel.addEventListener('click', function(){
            pixel.style.backgroundColor = selectedColor;
        });

        // 鼠标按住拖动填充颜色
        pixel.addEventListener('mousemove', function(){
            if (isDrawing){ // 只有按住鼠标时才绘图
                pixel.style.backgroundColor = selectedColor;
            }
        });

        pixelCanvas.appendChild(pixel); // 将方块渲染至容器
    }
}

// 4.3 清空画布
function clearCanvas (){
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = '#fafafa';
    });
}

// 4.4 处理绘图状态 - 鼠标按住/松开
function handleDrawingState(){
    // 鼠标按住进行绘图模式
    pixelCanvas.addEventListener('mousedown', function(){
        isDrawing = true;
    });

    // 鼠标松开：退出绘图模式
    pixelCanvas.addEventListener('mouseup', function(){
        isDrawing = false;
    });
    pixelCanvas.addEventListener('mouseleave', function(){
        isDrawing = false;
    });
}

// 绑定按钮清空事件
clearBtn.addEventListener('click', clearCanvas);


// 初始化页面
renderColorOptions(); // 初始化取色器
renderPixelCanvas();
handleDrawingState();
