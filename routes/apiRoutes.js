// Data
// var notesData = require("../db/<db.json>");
const fs = require("fs");

module.exports = function (app) {

    const notesArr = [
        {
            title: "Lame Test Title",
            text: "Test Note, also lame",
            id: "0"
        }
    ]

    // GET: when user asks for the Notes list
    app.get("/api/notes", function (request, response) {
        return response.json(notesArr);
    });

    // POST: when user adds to the Notes list
    app.post("/api/notes", function (request, response) {
        // make a new note from incoming request.body data
        const data = request.body;
        
        // use timestamp to create an id for the new note
        const newNote = {
            title: data.title,
            text: data.text,
            id: Date.now().toString()
        }
        
        // add new Note to the list
        notesArr.push(newNote);

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
