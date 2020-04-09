// Data
// var notesData = require("../db/<db.json>");
const fs = require("fs");

module.exports = function (app) {

    // an array to hold all the saved data locally
    const notesArr = [];

    // GET: 
    app.get("/api/notes", function (request, response) {
        // retrieve list from memory and return fresh list to the page
        retrieveNotes();
        return response.json(notesArr);
    });

    // POST: adds new Note to the list
    app.post("/api/notes", function (request, response) {
        // create/save new Note and return the updated list to the page
        saveNewNote(request.body);
        return response.json(notesArr);
    });

    // DELETE: deletes a Note from the list
    app.delete("/api/notes/:id", function (request, response) {
        // delete Note designated by incoming id and return the updated list to the page
        deleteNote(request.params.id);
        return response.json(notesArr);
    });

    function saveNewNote(data) {
        // use timestamp to create an id for the new note
        const newNote = {
            title: data.title,
            text: data.text,
            id: Date.now().toString()
        }
        notesArr.push(newNote);
        console.log(`Added note id ${newNote.id}`);
        persist();
    }

    function deleteNote(idToDelete) {
        // find the existing note with the incoming note id
        const indexToDelete = findNoteById(idToDelete);

        // remove note from the list, and persist the edited list
        if (indexToDelete > -1) {
            notesArr.splice(indexToDelete, 1);
            console.log(`Removed note id ${idToDelete}`);
            persist();
        }
    }

    function findNoteById(idToFind) {
        for (let index = 0; index < notesArr.length; index++) {
            const element = notesArr[index];
            if (element.id === idToFind) {
                return index;
            }
        }
        // id not found
        return -1;
    }

    function retrieveNotes() {
        fs.readFile("./db/db.json", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            // for every element in db.json, create a note object and save it to notesArr
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
        });
    }

    function persist() {
        fs.writeFile("./db/db.json", JSON.stringify(notesArr), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`Updated db.json`);
        });
    }
}
