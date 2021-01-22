const Dotenv = require('dotenv-webpack');
 
module.exports = {
  plugins: [
      // configue the instance
    new Dotenv({
        path:'./.env', // path to the environment variables
        safe: true, // verify that the '.env' variables are all set
        allowEmptyValues: true, // treat empty variables as empty, not missing
        systemvars: true, // load all the predefined 'process.env' variables
        silent: true, // hide any errors
        defaults: false // load '.env.defaults' as the default values if empty
    })
  ]
};