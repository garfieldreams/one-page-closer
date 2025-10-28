// 1. 获取DOM元素
const textInput = document.getElementById('textInput');
const charCountWithSpace = document.getElementById('charCountWithSpace');
const charCountWithoutSpace = document.getElementById('charCountWithoutSpace');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const longestWord = document.getElementById('longestWord');
const longestWordLength = document.getElementById('longestWordLength');

// 2. 统计函数
function calculateStats(text) {
    // 2.1 总字符数 - 含空格
    const withSpace = text.length;

    // 2.2 总字符数 - 不含空格
    const withoutSpace = text.replace(/\s/g, '').length;

    // 2.3 计算单词总数
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    const wordTotal = words.length;

    // 2.4 计算句子总数 -- 按照.!?分割
    const sentences = text.trim() === ''
        ? []
        : text.trim().split(/[.!?]+/g).map(s => s.trim()).filter(Boolean);
    const sentenceTotal = sentences.length;

    // 2.5 最长单词及长度
    // 2.5 最长单词及长度
    let longest = '';
    const candidateWords = text.trim().split(/[\s,.!?;:'"()]+/);

    candidateWords.forEach(word => {
        // 去除单词中的标点（如 "world!" → "world"）
        const cleanWord = word.replace(/[^\p{L}]/gu, '').toLowerCase();
        if (cleanWord && cleanWord.length > longest.length) {
            longest = cleanWord;
        }
    });

    // 返回统计结果
    return {
        withSpace,
        withoutSpace,
        wordTotal,
        sentenceTotal,
        longest,
        longestLength: longest.length
    };
}

// 3. 更新页面显示
function updateDisplay(stats) {
    charCountWithSpace.textContent = stats.withSpace;
    charCountWithoutSpace.textContent = stats.withoutSpace;
    wordCount.textContent = stats.wordTotal;
    sentenceCount.textContent = stats.sentenceTotal;
    longestWord.textContent = stats.longest || '-';
    longestWordLength.textContent = stats.longestLength;
}

// 4. 绑定事件 - 实时输入统计
textInput.addEventListener('input', function () {
    const text = textInput.value;
    const stats = calculateStats(text);
    updateDisplay(stats);
})