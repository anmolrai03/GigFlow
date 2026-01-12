import {app} from './app.js'
import dotenv from 'dotenv';

import connectDb from './config/db.js';
// import createUser from './tests/createDummyUser.js';

dotenv.config({
  path: './.env'
});

//CONNECT THE DB
connectDb()
  .then( () => {
    // LISTENING TO ERRORS
    app.on('error' , (error)=>{
      console.error(`Error: ${error}`)
    })

    // LISTENING ON PORT
    app.listen(process.env.PORT || 3000 , () =>{
      // createUser();
      console.log(`Server running on the http://localhost:${process.env.PORT || 3000}`);
    })
  })
  .catch( (err) => {
    console.error(`MonogoDb connection error: ${err}`)
  })