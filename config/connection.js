const { connect, connection } = require('mongoose');

connect('mongodb://localhost/zuckerAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;