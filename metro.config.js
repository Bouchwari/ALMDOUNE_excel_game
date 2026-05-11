const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Support WebP assets
config.resolver.assetExts.push('webp');

// Enable minification for production bundles
config.transformer.minifierConfig = {
  mangle: { toplevel: false },
  output: { quote_style: 3 },
  sourceMap: { includeSources: false },
  toplevel: false,
  compress: {
    reduce_funcs: false,
  },
};

module.exports = config;
