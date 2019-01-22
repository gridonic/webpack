const merge = require('webpack-merge');
const delve = require('dlv');

const defaults = {
    test: /\.(jpe?g|png|gif|svg)$/,
    limit: 25000,
    plugins: {
        gifsicle: {
            interlaced: false
        },
        mozjpeg: {
            progressive: true,
            arithmetic: false
        },
        pngquant: {
            floyd: 0.5,
            speed: 2
        },
        svgo: {
            plugins: [
                { removeTitle: true },
                { convertPathData: false }
            ]
        }
    }
};

module.exports = (options = {}) => {
    const result = {
        module: {
            rules: [{
                test: delve(options, 'test', defaults.test),
                use: [

                    // @see https://github.com/webpack-contrib/url-loader
                    {
                        loader: 'url-loader',
                        options: {

                            // @see https://github.com/webpack-contrib/file-loader
                            // @todo Maybe https://github.com/herrstucki/responsive-loader is more interesting?
                            fallback: 'file-loader',

                            limit: delve(options, 'limit', defaults.limit)
                        }
                    },

                    // @see https://github.com/vanwagonet/img-loader
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: []
                        }
                    }
                ]
            }]
        }
    };

    // Only optimize images in production build
    if (options.mode !== 'production') {
        return result;
    }

    const gif = delve(options, 'gif');
    const jpg = delve(options, 'jpg');
    const png = delve(options, 'png');
    const svg = delve(options, 'svg');

    if (gif !== false) {
        result.module.rules[0].use[1].options.plugins.push(
            require('imagemin-gifsicle')(merge(defaults.plugins.gifsicle, gif))
        );
    }

    if (jpg !== false) {
        result.module.rules[0].use[1].options.plugins.push(
            require('imagemin-mozjpeg')(merge(defaults.plugins.mozjpeg, jpg))
        );
    }

    if (png !== false) {
        result.module.rules[0].use[1].options.plugins.push(
            require('imagemin-pngquant')(merge(defaults.plugins.pngquant, png))
        );
    }

    if (svg !== false) {
        result.module.rules[0].use[1].options.plugins.push(
            require('imagemin-svgo')(merge(defaults.plugins.svgo, svg))
        );
    }

    return result;
};
