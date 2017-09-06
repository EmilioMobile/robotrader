// repository.js
'use strict'
// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.
const repository = (db) => {
  
  // since this is the users-service, we already know
  // that we are going to query the `users` collection
  // in all of our functions.
  const collection = db.collection('users')
  
  const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      const users = []
      const cursor = collection.find()
      const addUsers = (user) => {
        users.push(user)
      }
      const sendUsers = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all users, err:' + err))
        }
        resolve(users.slice())
      }
      cursor.forEach(addUsers, sendUsers)
    })
  }

  const getUser = function() {
    return new Promise((resolve, reject) => {
        var cursor =users.find( { "username": "emilio" } );
        cursor.each(function(err, doc) {
          if (err){
            assert.equal(err, null); 
            console.log("DB User find error: ", err);                    
            resolve("DB Error");                    
          }
        if (doc != null) {
          console.log("DB User found: ", doc);                              
          resolve(doc);
        } else {
          console.log("DB User Not found: ", doc);                                        
          resolve("DB No results")
        }
      });
    });  
  }

  const getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendUser = (err, user) => {
        if (err) {
          reject(new Error(`An error occured fetching a user with id: ${id}, err: ${err}`))
        }
        resolve(user)
      }
      // fetch a movie by id -- mongodb syntax
      collection.findOne({id: id}, projection, sendUser)
    })
  }

  const createUser = function() {
    var name = "emilio"
    return new Promise((resolve, reject) => {  
      collection.insertOne( {
            "username": name, 
            "password": "MayersMayers", 
            "admin": "false",
            "uuid": "0000xxxxx000",
            "firstName": "Mike",
            "lastName": "Mayers",
            "nickName": "The OnE",
            "dateOfBirth": new Date("2014-01-16T00:00:00Z"),
            "mail": "mike@mike.es",
            "phone": "09000223334",
            "location_coord":  [ -73.9557413, 40.7720266 ] 
        }, function(err, result) {
            if (err){
                assert.equal(err, null); 
                console.log("DB create user Error: ", err);                    
                resolve(false);                    
            }
            console.log("create a user into the users collection.");
            resolve(true);
        });
    });
  };

  const updateUser = function() {
    return new Promise((resolve, reject) => { resolve(true) });
  };

  const deleteUser = function() {
    return new Promise((resolve, reject) => { resolve(true) });
  };

  const authenticateUser = function() {
    return new Promise((resolve, reject) => { resolve(true)});  
  }

  const activateUser = function() {
    return new Promise((resolve, reject) => { resolve(true)});  
  }

  const deactivateUser = function() {
    return new Promise((resolve, reject) => { resolve(true)});  
  }

  const passwordRefresh = function() {
    return new Promise((resolve, reject) => { resolve(true)});  
  }

  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllUsers,
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,        
    activateUser,
    deactivateUser,
    passwordRefresh,    
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}
// this only exports a connected repo
module.exports = Object.assign({}, {connect})

/*

module.exports = mongoose.model('Location', new Schema({ 
    uuid: String,
    Country: String,    
    City: String,
    Office: String,
    Department: String,
    GPSCoordinates: String
}));

const getMoviePremiers = () => {
  return new Promise((resolve, reject) => {
    const movies = []
    const currentDay = new Date()
    const query = {
      releaseYear: {
        $gt: currentDay.getFullYear() - 1,
        $lte: currentDay.getFullYear()
      },
      releaseMonth: {
        $gte: currentDay.getMonth() + 1,
        $lte: currentDay.getMonth() + 2
      },
      releaseDay: {
        $lte: currentDay.getDate()
      }
    }

    const cursor = collection.find(query)
    const addMovie = (movie) => {
      movies.push(movie)
    }
    const sendMovies = (err) => {
      if (err) 
        reject(new Error('An error occured fetching all movies, err:' + err))
      }
      resolve(movies)
    }
    cursor.forEach(addMovie, sendMovies)
  })
}*/