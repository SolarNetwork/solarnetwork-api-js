import babel from 'rollup-plugin-babel';

export default {
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      plugins: ['external-helpers'],
      presets: [
        ["latest", {
          "es2015": {
            "modules": false
          }
        }]
      ]
    })]
};
