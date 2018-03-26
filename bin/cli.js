#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const log = require('../lib/log');

const _ = require('lodash');
const ArgumentParser = require('argparse').ArgumentParser;

const yargs = require('yargs');
const argv = yargs.argv;

const packageConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

// http://nodeca.github.io/argparse/#HelpFormatter.prototype.addArgument
const cliParser = new ArgumentParser({
    version: packageConfig.version,
    addHelp:true,
    description: 'my-npm-pub cli example'
});

cliParser.addArgument([ '-c', '--config' ], {
    help: 'verdaccio configuration file path'
});

cliParser.addArgument([ '-f', '--force' ], {
    required: false,
    defaultValue: false,
    help: 'Force the installation of the package.'
});

const args = cliParser.parseArgs();

// verdaccio config.yaml file path
const config = argv.c || argv.config;
// 패키지 설치 강제 여부
const force = argv.f || argv.force;

if (_.isEmpty(config)) log.fatal('not found config argument');

new (require('../index.js'))({config: config, force: force}).start();