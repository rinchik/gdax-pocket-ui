import uglify from 'rollup-plugin-uglify-es';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/client.js',
    external: [ 'fs' ],
    plugins: [
        babel(),
        uglify(),
        nodeResolve({
            module: true,
            browser: true
        })
    ],
    output: {
        file: 'client/build.js',
        format: 'iife',
        sourcemap: 'inline',

    },

};
