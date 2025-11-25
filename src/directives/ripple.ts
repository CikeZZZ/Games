// src/directives/ripple.ts
import type { Directive } from 'vue';

const ripple: Directive = {
    mounted(el, binding) {
        // 1. 强制元素相对定位，否则波纹会跑偏
        el.style.position = el.style.position === 'absolute' || el.style.position === 'fixed' ? el.style.position : 'relative';
        el.style.overflow = 'hidden';

        // 2. 创建波纹容器（如果不存在）
        let container = el.querySelector('.ripple-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'ripple-container';
            el.appendChild(container);
        }

        // 3. 监听点击
        el.addEventListener('click', (e: MouseEvent) => {
            // 计算点击位置
            const rect = el.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            // 创建波纹元素
            const ripple = document.createElement('span');
            ripple.className = 'ripple-circle';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // 如果指令传了颜色参数 v-ripple="'rgba(0,0,0,0.2)'"
            if (binding.value) {
                ripple.style.background = binding.value;
            }

            // 添加到容器
            container?.appendChild(ripple);

            // 动画结束后移除 DOM
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
};

export default ripple;