/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                canvas: "#080D1A",
                surface: "#121B2D",
                surfaceSub: "#18243B",
                retroBlack: "#000000",
                pixelGreen: "#22C55E",
                pixelYellow: "#FACC15",
                pixelCyan: "#38BDF8",
                pixelRed: "#EF4444",
            },
        },
    },
    plugins: [],
};