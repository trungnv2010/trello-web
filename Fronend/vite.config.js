import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(),
    svgr({
      svgrOptions: {
        icon: true, // Coi các SVG như icon (giúp với màu sắc)
        svgProps: {
          fill: 'currentColor', // Mặc định fill là currentColor
        },
        // Loại bỏ thuộc tính fill từ các phần tử SVG
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|stroke)'
              }
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [{fill: 'currentColor'}]
              }
            }
          ]
        }
      }
    })],
  resolve: {
    alias: [
      {find: '~', replacement: '/src'}
    ]
  }
})
