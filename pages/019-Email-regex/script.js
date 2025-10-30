const emailInput = document.getElementById('emailInput');
            const result = document.getElementById('result');

            // regex
            const regex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

                // 验证函数
                function validateEmail() {
                    const email = emailInput.value.trim();

                    if (!email) {
                        result.textContent = "请输入邮箱地址";
                        result.textContent = "result invalid";
                        return;
                    }

                    // 用正则表达式匹配
                    if (regex.test(email)){
                        result.textContent = "✅ 邮箱格式正确";
                        result.className = "result valid";
                    } else {
                        let errorMsg = "❌ 邮箱格式错误！";
                        if (!email.includes('@')){
                            errorMsg += "缺少@符号";
                        }
                        result.textContent = errorMsg;
                        result.className = "result invalid";
                    }
                }

                // 绑定事件
                emailInput.addEventListener('input', validateEmail);
                emailInput.addEventListener('blur', validateEmail);