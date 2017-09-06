// User profiles repository.js
'use strict'
// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.
const profiles_repository = (db) => {
  
  // since this is the profiles-service, we already know
  // that we are going to query the `movies` collection
  // in all of our functions.
  const collection = db.collection('profiles')

  // Profiles typical CRUD operations
  const getAllProfiles = () => {
    return new Promise((resolve, reject) => {
      const profiles = []
      const cursor = collection.find({}, {title: 1, id: 1})
      const addProfile = (profile) => {
        profiles.push(profile)
      }
      const sendProfiles = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all profiles, err:' + err))
        }
        resolve(profiles.slice())
      }
      cursor.forEach(addProfile, sendProfiles)
    })
  }

  const getProfileById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendProfile = (err, movie) => {
        if (err) {
          reject(new Error(`An error occured fetching a profile with id: ${id}, err: ${err}`))
        }
        resolve(profile)
      }
      // fetch a profile by id -- mongodb syntax
      collection.findOne({id: id}, projection, sendProfile)
    })
  }

  const newProfile = (username, password) => {
    return new Promise((resolve, reject) => {
        // Check fields integrity against the rules
        
        // TODO

        // Check if username is already assigned in our database
        collection.findOne({'username' : username})
            .then(function (result) {
                if (null != result) {
                    console.log("USERNAME ALREADY EXISTS:", result.username);
                    resolve(false); // username exists
                }
                else  {
                    var hash = bcrypt.hashSync(password, 8);
                    var user = {
                        "username": username,
                        "password": hash,
                        "avatar": "http://placepuppy.it/images/homepage/Beagle_puppy_6_weeks.JPG"
                }

                console.log("CREATING USER:", username);
                
                // TODO : Error handling
                collection.insert(user)
                    .then(function () {
                    resolve(user);
                });
            }
        }); 
    })
  }

  const updateProfile = () => {
    return new Promise((resolve, reject) => {
      const profiles = []
      const cursor = collection.find({}, {title: 1, id: 1})
      const addProfile = (profile) => {
        profiles.push(profile)
      }
      const sendProfiles = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all profiles, err:' + err))
        }
        resolve(profiles.slice())
      }
      cursor.forEach(addProfile, sendProfiles)
    })
  }

  const deleteProfile = () => {
    return new Promise((resolve, reject) => {
      const profiles = []
      const cursor = collection.find({}, {title: 1, id: 1})
      const addProfile = (profile) => {
        profiles.push(profile)
      }
      const sendProfiles = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all profiles, err:' + err))
        }
        resolve(profiles.slice())
      }
      cursor.forEach(addProfile, sendProfiles)
    })
  }

  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllProfiles,
    getProfileById,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(profiles_repository(connection))
  })
}
// this only exports a connected repo
module.exports = Object.assign({}, {connect})