/**
 * Paths which will be ignored by bowerFiles automatic injection
 */

module.exports = {
        overrides: {
          "bootstrap":{
           "main": [
              "dist/css/bootstrap.min.css",
              "dist/js/bootstrap.js"
            ]
          },
          "font-awesome":{
            "main": [
              "css/font-awesome.min.css"
            ]
          }
        }
      };
