const alert= require('clialerting')

module.exports= (isDebug,flags,inputs)=>{
    if(!isDebug){
        return
    }

    alert({type: 'warning', msg: 'here is cli debug data⬇' ,name: 'Debugging' })
    console.log('cli.flags',flags)
    console.log('cli.input',inputs)
    console.log()
}