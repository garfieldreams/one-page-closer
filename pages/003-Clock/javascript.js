const clock = document.getElementById('clock');

function tick() {
    const time = new Date();
    const hh = time.getHours().toString().padStart(2, '0');
    const mm = time.getMinutes().toString().padStart(2, '0');
    const ss = time.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hh} : ${mm} : ${ss}`;
}

tick();
setInterval(tick, 1000);