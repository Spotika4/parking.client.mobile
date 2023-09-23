let fs = require('fs');
const path = require('path');

// получаем входные параметры
let argv = require('minimist')(process.argv.slice(2));
argv.env = (!argv?.env) ? argv.env = 'PRODUCTION' : argv.env.toUpperCase();
argv.platform = (!argv?.platform) ? argv.platform = 'web' : argv.platform.toLowerCase();

// получаем дефолтный конфиг
let config = fs.readFileSync('./config/default.json');
try {
    config = JSON.parse(config);
} catch (err) {
    console.log('There has been an error parsing your JSON.');
    console.log(err);
}

// получаем настрйоки отдельных платформ
let platform_config = './config/platform/' + argv?.platform + '.json';
fs.exists(platform_config, function(exists) {
    if (exists) {
        config.platform = fs.readFileSync(platform_config);
        try {
            config.platform = JSON.parse(config.platform);
        } catch (err) {
            console.log('There has been an error parsing your JSON.');
            console.log(err);
        }
    }else{
        config.platform = Object;
        config.platform[argv.env] = config[argv.env];
    }
});

// готовим .env
fs.readFile('./env-default', 'utf8', function (err, data) {

    let result = data;

    if (err) {
        return console.log(err);
    }

    result = result.replace(/%APP_VERSION%/g, config.APP_VERSION);
    result = result.replace(/%APP_VERSION_TYPE%/g, config.APP_VERSION_TYPE);
	result = result.replace(/%APP_NAME%/g, config.APP_NAME);
	result = result.replace(/%APP_DESCRIPTION%/g, config.APP_DESCRIPTION);
	result = result.replace(/%APP_AUTHOR%/g, config.APP_AUTHOR);
	result = result.replace(/%APP_AUTHOR_HREF%/g, config.APP_AUTHOR_HREF);
    result = result.replace(/%PROTOCOL%/g, config[argv.env].PROTOCOL);
    result = result.replace(/%DOMAIN%/g, config[argv.env].DOMAIN);
    result = result.replace(/%APP_PATH%/g, config[argv.env].PATH);
    result = result.replace(/%PUBLIC_URL%/g, config.platform[argv.env].PUBLIC_URL);

    fs.writeFile('./.env', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

// готовим config.xml
fs.readFile('./config-default.xml', 'utf8', function (err, data) {

    let result = data;

    if (err) {
        return console.log(err);
    }

    result = result.replace(/%APP_ID%/g, config.APP_ID);
    result = result.replace(/%APP_NAME%/g, config.APP_NAME);
    result = result.replace(/%APP_DESCRIPTION%/g, config.APP_DESCRIPTION);
    result = result.replace(/%APP_AUTHOR%/g, config.APP_AUTHOR);
    result = result.replace(/%APP_AUTHOR_EMAIL%/g, config.APP_AUTHOR_EMAIL);
    result = result.replace(/%APP_AUTHOR_HREF%/g, config.APP_AUTHOR_HREF);
    result = result.replace(/%DOMAIN%/g, config[argv.env].DOMAIN);

    fs.writeFile('./config.xml', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

// готовим manifest.json
fs.readFile('./manifest-default.json', 'utf8', function (err, data) {

    let result = data;

    if (err) {
        return console.log(err);
    }

    result = result.replace(/%APP_NAME%/g, config.APP_NAME);
    result = result.replace(/%APP_DESCRIPTION%/g, config.APP_DESCRIPTION);
    result = result.replace(/%START_URL%/g, config[argv.env].START_URL);

    fs.writeFile('./public/manifest.json', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
