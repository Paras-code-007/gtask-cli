const welcome= require('cli-welcome')
const checkNode= require('node-vercheck')
const unhandled= require('unhandle-error')
const pkgJSON= require('./../package.json')
const {dim: d}= require('chalk')

module.exports= (flags)=>{
    process.on('SIGINT',function () {
        console.log("\n\nSad!! You closed the process in between.....!!")
        console.log("Any Problem/query? Give feedback at https://www.domainname.tld\n")
    })

    unhandled()

    let clear= flags.clear

    !flags.minimal && welcome({
        title: "gtask-cli",
        tagLine: "By Paras Arora",
        bgColor: `#708090`,
        color: `#000000`,
        bold: true,
        clear,
        version: `${pkgJSON.version}`,
        description: pkgJSON.description
    })

    flags.minimal && flags.clear && process.stdout.write(process.platform==='win32'? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H' )
    flags.minimal && console.log(`\n${d('By Paras Arora')}\n`)

    checkNode('10')

}
