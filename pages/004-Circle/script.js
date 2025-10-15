/* ---- 1. 把 viewBox 设成窗口实际像素 ---- */
const svg = document.querySelector('#s');
const c = document.querySelector('#c');
const r = Number(c.getAttribute('r')); // 获取circle半径
let x = 0, y = 0;
let dx = 5, dy = 4; //设置移动速度

function resetViewBox() {
    const W = innerWidth;
    const H = innerHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    x = Math.max(r, Math.min(W - r, x));
    y = Math.max(r, Math.min(H - r, y));

    c.setAttribute('cx', x);
    c.setAttribute('cy', y);
}
resetViewBox();
window.addEventListener('resize', resetViewBox);

/* ---- 2. 按像素移动  ---- */
function move() {
    x += dx;
    y += dy;
    /* 3. 碰边反弹 */
    if (x <= r || x >= innerWidth - r) dx = -dx;
    if (y <= r || y >= innerHeight - r) dy = -dy;
    c.setAttribute('cx', x);
    c.setAttribute('cy', y);
    requestAnimationFrame(move);
}
move();
