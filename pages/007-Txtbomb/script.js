const container = document.querySelector('.text-container');
        const text = "textbomb";
        const charWidth = 60;
        const halfWidth = (text.length * charWidth) / 2;

        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text[i];
            charSpan.classList.add('char');
            charSpan.style.left = `${i * charWidth - halfWidth}px`;
            container.appendChild(charSpan);
        }

        document.addEventListener('click', function (event) {
            const chars = document.querySelectorAll('.char');

            if (event.target.classList.contains('char')) {
                chars.forEach(char => {
                    const randomX = Math.random() * 400 - 200;
                    const randomY = Math.random() * 400 - 200;
                    
                    const randomRotate = Math.random() * 360;
                    char.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
                    char.style.opacity = '0';
                });
            } else {
                chars.forEach((char, i) => {
                    char.style.transform = 'translate(0, 0) rotate(0)';
                    char.style.opacity = '1';
                    char.style.left = `${i * charWidth - halfWidth}px`;
                });
            }
        });
