
// 初始化变量 + 获取页面元素
const starCanvas = document.getElementById('star-canvas');
const countedownElement = document.getElementById('countdown');
const scoreElement = document.getElementById('score');
const gameStatusElement = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');

let countedownTime = 10;
let score = 0;
let starTimer = null;
let countedownTimer = null;
let isGameRunning = false;

/* +++ function 开始游戏  +++ */
function startGame() {
    if (isGameRunning) return; // 防止重复启动游戏

    // 初始化游戏状态
    score = 0;
    scoreElement.textContent = score;

    countedownTime = 10;
    countedownElement.textContent = countedownTime;

    isGameRunning = true;
    gameStatusElement.textContent = `游戏开始, 点击星星得分~`;
    starCanvas.innerHTML = '' // 清空画布
    restartBtn.style.display = 'none';

    // 启动倒计时
    clearInterval(countedownTimer); // 先清除可能的旧定时器
    countedownTimer = setInterval(() => {
        countedownTime--;
        countedownElement.textContent = countedownTime;

        // 倒计时结束：游戏结束 - 清除定时器 + 重置状态
        if (countedownTime <= 0) {
            clearInterval(countedownTimer);
            clearInterval(starTimer);
            isGameRunning = false;
            gameStatusElement.textContent = `游戏结束! 最终得分：${score}`;
            starCanvas.innerHTML = '' // 清空画布
            restartBtn.style.display = 'block';
        }
    }, 1000);

    // 启动星星生成 - 每秒生成一个
    clearInterval(starTimer); // 清除旧的定时器
    starTimer = setInterval(() => {
        createStar();
    }, 1000);
}

/* +++ function resetGame +++ */
function resetGame (){
    // 清除定时器
    clearInterval(starTimer);
    clearInterval(countedownTimer);

    // 重置游戏设置
    score = 0;
    countedownTime = 10;
    isGameRunning = false;

    scoreElement.textContent = score;
    countedownElement.textContent = countedownTime;
    gameStatusElement.textContent = "点击画布开始游戏! "
    starCanvas.innerHTML = '' // 清空画布
    restartBtn.style.display = 'none';
}

/* +++ function 生成星星 +++ */
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.textContent = '★';

    // 计算随机位置
    const maxLeft = starCanvas.offsetWidth - 30; // 画布宽度 - 星星宽度， 避免星星右边超出
    const maxTop = starCanvas.offsetHeight - 30; // 画布高度 - 星星高度， 避免星星下边超出
    const randomLeft = Math.floor(Math.random() * maxLeft) // 随机左边距
    const randomTop = Math.floor(Math.random() * maxTop) // 随机上边距 

    star.style.left = `${randomLeft}px`;
    star.style.top = `${randomTop}px`;

    starCanvas.appendChild(star); // 将star插入到DOM
}

/* +++ function 点击星星得分并删除星星 +++ */
function deleteStar (e){
    if (e.target.classList.contains('star')){
        score++;
        scoreElement.textContent = score; // 更新得分显示
        starCanvas.removeChild(e.target); // 删除星星
    }
}

starCanvas.addEventListener('click', startGame);
starCanvas.addEventListener('click', deleteStar);
restartBtn.addEventListener('click', function () {
    resetGame();
    startGame();
});
resetGame();