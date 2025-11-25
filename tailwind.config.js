/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    // 关键点：这一行决定了 Tailwind 去哪里找 class
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                dark: '#0f172a',
            }
        },
    },
    plugins: [],
}