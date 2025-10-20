const colorBlock = document.querySelector('.color-block');

        // 监听鼠标移动事件
        document.addEventListener('mousemove', function(event){
            // 1. 获取鼠标坐标
            const mouseX = event.clientX;
            const mouseY = event.clientY;
           
            // 2. 计算色块位置，设定为在鼠标右下方50px处
            colorBlock.style.left = `${mouseX + 50}px`;
            colorBlock.style.top = `${mouseY + 50}px`;

            // 3. 根据鼠标X坐标计算颜色
            const windowWidth = window.innerWidth;
            const red = 255 - Math.floor((mouseX / windowWidth) * 255)
            const blue = Math.floor((mouseX / windowWidth) * 255);

            colorBlock.style.backgroundColor = `rgb(${red}, 100, ${blue})`;

            // 4. 根据鼠标Y坐标计算大小
            const windowHeight = window.innerHeight;
            const size = 50 + Math.floor((mouseY / windowHeight) * 150);
            colorBlock.style.width = `${size}px`;
            colorBlock.style.height = `${size}px`;  
        });

        document.dispatchEvent(new MouseEvent('mousemove', {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2
            }));
