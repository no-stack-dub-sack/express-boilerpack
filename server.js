import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.dev.js';
import webpack from 'webpack';
import express from 'express';
import path from 'path';

const app = express();
const compiler = webpack(config);

const DIST_DIR = path.join(__dirname, 'dist');
const FILE_NAME = path.join(DIST_DIR, "index.html");

const isDev = process.env.NODE_ENV !== 'production';

app.set('port', process.env.PORT || 3000);

if (isDev) {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

    app.get('*', (req, res, next) => {
        compiler.outputFileSystem.readFile(FILE_NAME, (err, result) => {
        if (err) {
            return next(err);
        }

        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
        });
    });
} else {
    app.use(express.static(DIST_DIR));
    app.get('*', (req, res) => res.sendFile(FILE_NAME));
}

app.listen(app.get('port'), () => {
    console.log(`express server is listening on port ${app.get('port')}!`);
});
