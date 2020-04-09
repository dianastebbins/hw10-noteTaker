// Data
// var notesData = require("../db/<db.json>");
const fs = require("fs");

module.exports = function (app) {

    // an array to hold all the saved data locally
    const notesArr = [];

    // GET: when user asks for the Notes list
    app.get("/api/notes", function (request, response) {
        fs.readFile("./db/db.json", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            // for every element in db.json, create a note object and save it to notes Arr
            notesArr.length = 0;
            let tempArr = JSON.parse(data);
            tempArr.forEach(element => {
                const newNote = {
                    title: element.title,
                    text: element.text,
                    id: element.id
                }
                notesArr.push(newNote);
            });

            return response.json(notesArr);
        });
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

        // add new Note to the list, and persist the new list
        notesArr.push(newNote);
        persist();

        // return the updated list 
        return response.json(notesArr);
    });

    function persist() {
        fs.writeFile("./db/db.json", JSON.stringify(notesArr), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`Saved`);
        });
    }

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
