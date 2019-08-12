import svgToVue from 'svg-to-vue';
import { createFilter } from 'rollup-pluginutils';

export default function svg(options = {}) {
  const { svgo, include, exclude } = options;
  const filter = createFilter(include, exclude);

  return {
    name: 'vue-svg',
    async transform(content, id) {
      if (!id.endsWith('.svg') || !filter(id)) {
        return null;
      }

      const code = await svgToVue(content, {
        svgoConfig: svgo,
        svgoPath: id,
      });

      return {
        code,
        map: {
          mappings: '',
        },
      };
    },
  };
}
