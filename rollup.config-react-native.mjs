import {babel} from '@rollup/plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import {uglify} from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

export default {
    input: 'src/exports.js',
    treeshake: {
        moduleSideEffects: [
            'src/business/data-layer/data-layer.js',
            'src/business/consent/consent.js'
        ],
    },
    plugins: [
        eslint({
            configFile: './src/.eslintrc.json'
        }),
        replace({
            BUILD_BROWSER: 'false',
            '@piano-sdk/storage': '../storage/storage.js',
            delimiters: ['', '']
        }),
        babel({babelHelpers: 'bundled'}),
        process.env.NODE_ENV === 'production' && uglify()
    ],
    external: [
        'react-native',
        '@react-native-async-storage/async-storage',
    ],
    output: [
        {
            file: 'dist/browserless/piano-analytics.react-native.umd.js',
            format: 'umd',
            name: 'pianoAnalytics',
            globals: {
                'react-native': 'reactNative',
                '@react-native-async-storage/async-storage': 'AsyncStorageModule',
            }
        }
    ]
};
