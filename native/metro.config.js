const path = require('path');

const paths = [
  'components',
  'forms',
  'helpers',
  'hooks',
  'navigation',
  'theme',
  'pages',
];

const extraNodeModules = paths.reduce((res, name) => {
  let p = path.resolve(__dirname + `/../web/common/src/${name}`);

  if (name === 'pages') p = path.resolve(__dirname + `/../web/${name}`);

  return { ...res, [`@common/${name}`]: p };
}, {});

const watchFolders = Object.values(extraNodeModules);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from web/ to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};
