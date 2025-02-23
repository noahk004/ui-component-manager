import type { Config } from "tailwindcss";

import tailwindRAC from "tailwindcss-react-aria-components"
import tailwindAnimate from "tailwindcss-animate"

export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [
        tailwindRAC, tailwindAnimate,
    ],
} satisfies Config;
