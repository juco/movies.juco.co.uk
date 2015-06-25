var fs = require('fs');

module.exports = {
  sendFile: function(file, res, next) {
    fs.exists(file, function(exists) {
      if (exists) {
        fs.realpath(file, function(err, resolvedPath) {
          if (err) { next(); }
          res.sendFile(resolvedPath);
        });
      } else {
        next();
      }
    });
  }
};
