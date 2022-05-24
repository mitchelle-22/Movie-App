const app = require('./app');

const port = process.env.PORT || 4000;

console.log("Server running on port", port);

app.listen(port);