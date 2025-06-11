/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"], // Include JSX files
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",    // Dark navy blue
        secondary: "#F97416",   // Orange
        third: "#54D6BB",       // Light teal
      },
      screens: {
        sm: '360px',            // Small devices (landscape phones)
        md: '768px',            // Medium devices (tablets)
        lg: '1024px',           // Large devices (desktops)
        xl: '1280px',           // Extra large devices (large desktops)
        '2xl': '1536px',        // 2X extra large devices
      }
    },
  },
  plugins: [],
}
