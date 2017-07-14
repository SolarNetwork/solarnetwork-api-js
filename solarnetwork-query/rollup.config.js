import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';

const includePathOptions = {
  include: {},
  paths: ['src'],
  external: [],
  extensions: ['.js']
};

export default {
  external: id => {
    return /(crypto-js|net\/|uri-js)/.test(id);
  },
  globals: {
    'net/urlHelper': 'sn.NetUrlHelper',
    'net/nodeUrlHelperMixin': 'sn.NetNodeUrlHelperMixin',
    'crypto-js/enc-hex': 'CryptoJS.Hex',
    'crypto-js/hmac-sha256': 'CryptoJS.HmacSHA256',
    'crypto-js/sha256': 'CryptoJS.SHA256',
    'uri-js': 'URI',
  },
  plugins: [
  	includePaths(includePathOptions),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      plugins: ['external-helpers'],
      presets: [
        ['env', {
          targets: {
            browsers: ['last 2 versions'],
            node: 'current',
          },
          modules: false,
        }]
      ]
    })]
};
