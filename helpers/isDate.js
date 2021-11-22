const moment = require('moment')



const isDate = (value) => {

  if ( !value){
    return false
  }

  const start = moment(value)

  if( start.isValid){ 
    return true
  }else{ 
      return false
  }
}

module.exports = { isDate }