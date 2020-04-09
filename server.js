// Dependencies (npm packages)
const express = require("express");

// Setup the Express server and an initial PORT
const app = express();
const PORT = process.env.PORT || 3000;

// Setup Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server to begin listening
app.listen(PORT, function () {
    console.log(`Note Taker is listening on PORT ${PORT}`);
});
