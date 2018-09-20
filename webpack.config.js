module.exports = {
    entry: './src/entry.js',
    mode: 'production',
    optimization: {
        concatenateModules: !!parseInt(process.env.WEBPACK_CONCAT_MODULES)
    }
}