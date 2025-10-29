// 半音阶音名信息表
const pitchInfo = {
    "C": { semi: 0, type: "natural" },
    "G": { semi: 7, type: "sharp" },
    "D": { semi: 2, type: "sharp" },
    "A": { semi: 9, type: "sharp" },
    "E": { semi: 4, type: "sharp" },
    "B": { semi: 11, type: "sharp" },
    "F#": { semi: 6, type: "sharp" },
    "F": { semi: 5, type: "flat" },
    "Bb": { semi: 10, type: "flat" },
    "Eb": { semi: 3, type: "flat" },
    "Ab": { semi: 8, type: "flat" },
    "Db": { semi: 1, type: "flat" }
};

// 半音索引→音名映射表
const semiToPitch = {
    "sharp": ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    "flat": ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    "natural": ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]
};

// 自然大调音程偏移表
const majorScaleOffset = [0, 2, 4, 5, 7, 9, 11];

// 页面加载完成后初始化
window.onload = function() {
    document.getElementById("generate-btn").addEventListener("click", generateScale);
    generateScale();
};

// 生成音阶的核心函数
function generateScale() {
    try {
        const key = document.getElementById("key").value;
        const octave = parseInt(document.getElementById("octave").value);

        // 从合并表中获取调号信息（半音索引+类型）
        const keyInfo = pitchInfo[key];
        if (!keyInfo) throw `不支持的调号：${key}`;
        const baseSemi = keyInfo.semi;
        const pitchType = keyInfo.type;

        // 计算基准音MIDI编号
        const baseMidi = 60 + 12 * (octave - 4) + baseSemi;

        // 更新基准信息显示
        document.getElementById("base-info").textContent = 
            `调号基准：${key}大调（简谱1=${key}${octave}，MIDI编号${baseMidi}）`;

        // 获取对应类型的音名列表
        const pitchList = semiToPitch[pitchType];

        // 生成音阶音符
        const grid = document.getElementById("scale-grid");
        grid.innerHTML = "";

        majorScaleOffset.forEach((offset, index) => {
            const currentSemi = (baseSemi + offset) % 12;
            const currentMidi = baseMidi + offset;
            const jianpuNum = index + 1;
            const currentPitch = pitchList[currentSemi];

            const noteCard = document.createElement("div");
            noteCard.className = "scale-note";
            noteCard.innerHTML = `
                <div class="note-jianpu">简谱：${jianpuNum}</div>
                <div class="note-pitch">${currentPitch}${octave}</div>
                <div class="note-semi">半音索引：${currentSemi}</div>
                <div class="note-midi">MIDI：${currentMidi}</div>
            `;
            grid.appendChild(noteCard);
        });

    } catch (err) {
        console.error("生成失败：", err);
        document.getElementById("scale-grid").innerHTML = 
            `<div style="color: #e74c3c; padding: 20px; text-align: center;">生成失败：${err}</div>`;
    }
}
