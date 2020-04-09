const fs = require('fs');
const dir = './.cache/caches/gatsby-source-prismic-graphql';

exports.onPreBootstrap = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
