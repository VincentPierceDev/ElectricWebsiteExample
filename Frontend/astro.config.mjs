import { defineConfig } from 'astro/config';

export default defineConfig({

    devToolbar: {
        enabled: false
    },

    build: {
        inlineStylesheets: 'never',
        inlineScripts: 'never',
    },

    server: {
        host: true,
    },

    trailingSlash: 'ignore',
    base: '/',
    output: 'static',

});
