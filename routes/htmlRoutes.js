const path = require("path");

module.exports = function (app) {

    // when user navigates to the home page
    app.get("/", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // when user navigates to the saved Notes page
    app.get("/notes", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/notes.html"));
    });
}
