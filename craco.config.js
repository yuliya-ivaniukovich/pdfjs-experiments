const { isEqual } = require("lodash");

module.exports = {
    webpack: {
        configure(webpackConfig) {
            // The code below added to fix warnings coming from pdfjs-dist/build/pdf.js:
            //     Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
            // Solution taken from https://github.com/wojtekmaj/react-pdf/issues/280#issuecomment-468276055
            webpackConfig.module.rules = webpackConfig.module.rules.filter(
                rule => !isEqual(rule, { parser: { requireEnsure: false } })
            );
            return webpackConfig;
        }
    }
};
