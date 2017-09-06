// User profiles repository.js
'use strict'
// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.
const auth_repository = (db) => {
  
    // since this is the profiles-service, we already know
    // that we are going to query the `movies` collection
    // in all of our functions.
    const collection = db.collection('profiles')

    // Authentication Modules
    const signIn = (username, password) => {
        return new Promise((resolve, reject) => {
            
            // Check if the user exist in the DB
            collection.findOne({'username' : username})
                .then(function (result) {
                if (null == result) {
                    console.log("USERNAME NOT FOUND:", username);
                    resolve(false);
                }
                else {
                    // Compared the encrypted password
                    var hash = result.password;
        
                    console.log("FOUND USER: " + result.username);
        
                    if (bcrypt.compareSync(password, hash)) {
                        resolve(result);
                    } else {
                        console.log("AUTHENTICATION FAILED");
                        resolve(false);
                    }
                }
            });
        });
    }   

    const signOut = (id) => {
        return new Promise((resolve, reject) => {
            resolve(true)
        })
    }

    // this will close the database connection
    const disconnect = () => {
        db.close()
    }

    return Object.create({
        signIn,
        signOut,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
    if (!connection) {
        reject(new Error('connection db not supplied!'))
    }
    resolve(auth_repository(connection))
    })
}
// this only exports a connected repo
module.exports = Object.assign({}, {connect})