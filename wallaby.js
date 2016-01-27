module.exports = function () {
    return {
        "files": [
            //{
            //    "pattern": "node_modules/chai/lib/chai.js",
            //    "instrument": "false"
            //},
            "scripts/*.js",
            "scripts/**/*.js",
            "scripts/**/**/*.js",
        ],
        "tests": [
            "tests/*.test.js"
        ],
        "testFramework": "mocha",
        env: {
            // use 'node' type to use node.js
            type: 'node',

            // if runner property is not set, then the wallaby.js embedded node version is used
            // you can specifically set the node version by specifying 'node' (or any other command)
            // that resolves your default node version, or just specify the path
            // to your node installation, like

            // runner: 'node'
            // or
            // runner: 'path to the desired node version'

            params: {
                runner: '--harmony --harmony_arrow_functions',
                env: 'PARAM1=true;PARAM2=false'
            }
        },
        "preprocessors": {
            '**/*.jsx`': file => require('react-tools').transformWithDetails(file.content, {sourceMap: true, harmony: true}),
            '**/*.js': file => require('babel-core').transform(file.content, {sourceMap: true, presets: ['es2015']})
        }
    };
};