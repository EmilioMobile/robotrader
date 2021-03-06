// simple configuration file
/*
Here is our config file, mostly all config codes are hard coded, but as you can see some attributes uses environment variables as an option. 
Environment variables are considered best practices, 
because this can hide database credentials, server parameters, etc.
*/
// database parameters
const dbSettings = {
    db: process.env.DB || 'robotrader',
    user: process.env.DB_USER || 'cristian',
    pass: process.env.DB_PASS || 'cristianPassword2017',
    repl: process.env.DB_REPLS || 'rs1',
    servers : ['127.0.0.1:27017']
   // servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
   //   '127.0.0.1:27017',
   //   '127.0.0.1:27017',
   //   '127.168.0.1:27017'
   // ]
  /*  dbParameters: () => ({
      w: 'majority',
      wtimeout: 10000,
      j: true,
      readPreference: 'ReadPreference.SECONDARY_PREFERRED',
      native_parser: false
    }),
    serverParameters: () => ({
      autoReconnect: true,
      poolSize: 10,
      socketoptions: {
        keepAlive: 300,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      }
    })
      replsetParameters: (replset = 'rs1') => ({
      replicaSet: replset,
      ha: true,
      haInterval: 10000,
      poolSize: 10,
      socketoptions: {
        keepAlive: 300,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      }
    })*/
  }
  
  // server parameters
  const serverSettings = {
    port: process.env.PORT || 3000
  }
  
  //module.exports = {
  //  
  //      'secret': 'ilovescotchyscotch',
  //      'database': 'mongodb://noder:noderauth&54;proximus.modulusmongo.net:27017/so9pojyN'
    
  //};

  module.exports = Object.assign({}, { dbSettings, serverSettings })