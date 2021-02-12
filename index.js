#! /usr/bin/env node

/*
* gtask-cli
* CLI interface to interact with Google Tasks
* @author Paras Arora <https://www.twitter.com/paras0025>
*/

const init = require('./utils/init')
const cli= require('./utils/cli')
const debug= require('./utils/debug')

;(async ()=>{
    
    init(cli.flags)
    // cli.input. and cli.flags.
    cli.input.includes('help') && cli.showHelp(0)
    debug(cli.flags.debug, cli.flags, cli.input)

})()