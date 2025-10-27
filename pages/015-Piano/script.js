// 创建Web Audio上下文（声音处理的核心）
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 获取所有琴键
const keys = document.querySelectorAll('.white-key, .black-key');

// 给每个琴键绑定点击事件
keys.forEach(key => {
    key.addEventListener('click', () => {
        // 获取该琴键对应的频率（Hz）
        const frequency = parseFloat(key.getAttribute('data-frequency'));
        // 播放对应频率的声音
        playTone(frequency);
    });
});

// 生成并播放指定频率的声音
function playTone(frequency) {
    // 1. 创建振荡器（产生音频信号）
    const oscillator = audioContext.createOscillator();
    // 2. 创建增益节点（控制音量）
    const gainNode = audioContext.createGain();

    // 3. 连接节点（振荡器 → 增益 → 扬声器）
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 4. 配置声音参数
    oscillator.type = 'sine'; // 波形类型（sine=正弦波，类似钢琴音色）
    oscillator.frequency.value = frequency; // 设置频率（决定音高）
    gainNode.gain.value = 0.1; // 音量（0-1，避免过大刺耳）

    // 5. 开始播放
    oscillator.start();

    // 6. 0.8秒后停止（模拟钢琴按键的短暂声音）
    setTimeout(() => {
        // 渐弱效果（更自然）
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
        oscillator.stop(audioContext.currentTime + 0.5);
    }, 500);
}
