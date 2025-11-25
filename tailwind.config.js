/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'; // 1. 引入插件

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        // ...保持你原有的 theme 配置不变...
        extend: {
            colors: {
                primary: '#6366f1',
                dark: '#0f172a',
            }
        },
    },
    plugins: [
        typography, // 2. 在这里启用插件
        require('@tailwindcss/typography'),
    ],
}