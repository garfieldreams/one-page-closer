const count = document.getElementById('count');
const rocket = document.getElementById('rocket');
const setBtn = document.getElementById('set');
const resetBtn = document.getElementById('reset');
const text = document.getElementById('text');
let timer = null;
let remaining = 10;
let isCompleted = false;

// 开始倒计时按钮
setBtn.addEventListener('click', function () {
    if (isCompleted) return;

    if (setBtn.textContent === '暂停') {
        clearInterval(timer);
        setBtn.textContent = '继续';
        text.textContent = '已暂停倒计时'
    } else {
        clearInterval(timer);
        timer = setInterval(() => {
            remaining--;
            count.textContent = remaining;

            if (remaining === 0) {
                clearInterval(timer);
                text.textContent = '发射成功!!!';
                setBtn.textContent = '成功';
                isCompleted = true;
                rocket.classList.add('launch')
            } else {
                setBtn.textContent = '暂停';
                text.textContent = '发射倒计时进行中...';
            }
        }, 1000);
    }
})
// 重置按钮
resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    // 重置剩余时间
    remaining = 10;
    count.textContent = remaining;
    setBtn.textContent = '开始';
    text.textContent = '准备发射倒计时';
    isCompleted = false;
    rocket.classList.remove('launch');
})