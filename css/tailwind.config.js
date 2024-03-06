// /** @type {import('tailwindcss').Config} */
// export default {
//     theme: {
//       extend: {
//         // ...
//       },
//     },
//     plugins: [],
//   }
  
module.exports = {
    content: [
      "./public/**/*.html", // Paths to your static HTML files
      "./src/**/*.{js,jsx,ts,tsx,vue}", // Paths to your JavaScript/TypeScript/React/Vue files
    ],
    theme: {
      extend: {
        // Customizations that extend the default Tailwind CSS theme
        // For example, adding new colors or fonts
        colors: {
          'custom-color': '#123456',
        },
        fontFamily: {
          'custom-font': ['CustomFontName', 'sans-serif'],
        },
      },
    },
    plugins: [
      // List any Tailwind CSS plugins you are using here
      // For example: require('@tailwindcss/forms'),
    ],
    // Optionally, you can enable features or configure other aspects of Tailwind CSS
    // For example, to enable JIT mode you can add the following line:
    // mode: 'jit',
  }
  

