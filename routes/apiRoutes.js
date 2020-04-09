// Data
// var notesData = require("../db/<db.json>");

module.exports = function (app) {

    const notesArr = [
        {
            title: "Test Title",
            text: "Test Note",
            id: 0
        }
    ]

    // GET: when user asks for the Notes list
    app.get("/api/notes", function (request, response) {
        return response.json(notesArr);
    });

    // POST: when user adds to the Notes list
    app.post("/api/notes", function (request, response) {
        // make a new note
        const data = request.body;
        console.log(data);

        // add it to the list
        // return the updated list 
        return response.json(notesArr);
    });

    // DELETE: when user deletes from the Notes list
    app.delete("api/notes:id", function (request, response) {
        // find the existing note
        var chosen = request.params.id;

        console.log(chosen);
        // remove it from the list
        // return the updated list
        return response.json(noteArr);
    });
}
