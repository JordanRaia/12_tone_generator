import { scientificToAbcNotation, distance } from "@tonaljs/abc-notation";
import { notesb } from "../Modules/note_types";

function make_abc(matrix, type, rowNum, title) {
    //finds the location of a value at the beginning of a row
    function find_row_location(RowType, value) {
        var x; //0 or 11 depending on which side of matrix
        var direction; //direction to search for row, should be opposite of direciton of row

        switch (RowType) {
            case "P":
                x = 0;
                direction = "vertical";
                break;
            case "R":
                x = 11;
                direction = "vertical";
                break;
            case "I":
                x = 0;
                direction = "horizontal";
                break;
            case "RI":
                x = 11;
                direction = "horizontal";
                break;
            default:
                console.log(
                    RowType,
                    " is an invalid row type! (P, R, I, and RI are valid)"
                );
                return;
        }

        //perform search for location
        switch (direction) {
            case "horizontal":
                for (let i = 0; i < 12; i++) {
                    if (matrix[x][i] === value) {
                        return i;
                    }
                }
                break;
            case "vertical":
                for (let i = 0; i < 12; i++) {
                    if (matrix[i][x] === value) {
                        return i;
                    }
                }
                break;
            default:
                console.log(
                    direction,
                    " is an invalid direction (horizontal and vertical are valid)"
                );
                return;
        }
    }

    var new_type;
    //if type is not flats or sharps set to flats
    switch (type) {
        case "flats":
        case "sharps":
            new_type = type;
            break;
        default:
            new_type = "flats";
            break;
    }

    var rowType = ["P", "R", "I", "RI"]; //different types of rows on matrix

    function addNotes(noteArr, startInterval) {
        for (let i = 0; i < rowNum; i++) {
            let randomRowType = rowType[Math.floor(Math.random() * 4)]; //random row Type
            let randomRowNum = Math.floor(Math.random() * 11) + 1; //random row Number
            noteArr.push(`"^${randomRowType + randomRowNum}"`); //push text of row's name
            addRow(
                noteArr,
                randomRowType,
                find_row_location(randomRowType, randomRowNum),
                startInterval
            );
        }
    }

    function addRow(noteArr, rowType, rowLocation, startInterval) {
        switch (rowType) {
            case "P":
            case "I":
                for (let i = 0; i < 12; i++) {
                    pushNote(noteArr, rowType, rowLocation, i, startInterval);
                }
                break;
            case "R":
            case "RI":
                for (let i = 11; i >= 0; i--) {
                    pushNote(noteArr, rowType, rowLocation, i, startInterval);
                }
                break;
        }
    }

    function pushNote(noteArr, rowType, rowLocation, i, startInterval) {
        switch (noteArr.length) {
            //first note
            case 1:
                noteArr.push(
                    pushMatrix(noteArr, rowType, rowLocation, i, startInterval)
                );
                break;
            //not first note
            default:
                switch (i) {
                    //first of row
                    case 0:
                        switch (rowType) {
                            case "R":
                            case "RI":
                                noteArr.push(
                                    pushMatrix(
                                        noteArr,
                                        rowType,
                                        rowLocation,
                                        i,
                                        findLowest(
                                            noteArr[noteArr.length - 1],
                                            pushMatrix(
                                                noteArr,
                                                rowType,
                                                rowLocation,
                                                i
                                            )
                                        )
                                    )
                                );
                                break;
                            default:
                                noteArr.push(
                                    pushMatrix(
                                        noteArr,
                                        rowType,
                                        rowLocation,
                                        i,
                                        findLowest(
                                            noteArr[noteArr.length - 2],
                                            pushMatrix(
                                                noteArr,
                                                rowType,
                                                rowLocation,
                                                i
                                            )
                                        )
                                    )
                                );
                                break;
                        }
                        break;
                    case 11:
                        switch (rowType) {
                            case "P":
                            case "I":
                                noteArr.push(
                                    pushMatrix(
                                        noteArr,
                                        rowType,
                                        rowLocation,
                                        i,
                                        findLowest(
                                            noteArr[noteArr.length - 1],
                                            pushMatrix(
                                                noteArr,
                                                rowType,
                                                rowLocation,
                                                i
                                            )
                                        )
                                    )
                                );
                                break;
                            default:
                                noteArr.push(
                                    pushMatrix(
                                        noteArr,
                                        rowType,
                                        rowLocation,
                                        i,
                                        findLowest(
                                            noteArr[noteArr.length - 2],
                                            pushMatrix(
                                                noteArr,
                                                rowType,
                                                rowLocation,
                                                i
                                            )
                                        )
                                    )
                                );
                                break;
                        }
                        break;
                    //not first of row
                    default:
                        //push next note with shortest distance
                        noteArr.push(
                            pushMatrix(
                                noteArr,
                                rowType,
                                rowLocation,
                                i,
                                findLowest(
                                    noteArr[noteArr.length - 1],
                                    pushMatrix(noteArr, rowType, rowLocation, i)
                                )
                            )
                        );
                        break;
                }
                break;
        }
    }

    function pushMatrix(noteArr, type, location, i, interval = "") {
        switch (type) {
            //left to right
            case "P":
                return notesb[new_type][matrix[location][i]] + interval;
            //up to down
            case "I":
                return notesb[new_type][matrix[i][location]] + interval;
            //right to left
            case "R":
                return notesb[new_type][matrix[location][i]] + interval;
            //down to up
            case "RI":
                return notesb[new_type][matrix[i][location]] + interval;
        }
    }

    //returns the note with the lowest interval from note1 to the note2
    //note1 will have interval number, example: "C4". Note2 will just be a note, example: "G"
    function findLowest(Note1, Note2) {
        let intervalNum = parseInt(Note1.slice(-1)); //grabs number at the end and converts to an integer

        let below = intervalNum - 1; //interval below
        let same = intervalNum; //same interval
        let above = intervalNum + 1; //interval above

        const intervalArray = [`${below}`, `${same}`, `${above}`];

        //array of distances between all 3 potential notes
        const distanceArr = [
            Math.abs(
                parseInt(
                    distance(
                        scientificToAbcNotation(Note1),
                        scientificToAbcNotation(Note2 + below)
                    ).slice(0, -1)
                )
            ),
            Math.abs(
                parseInt(
                    distance(
                        scientificToAbcNotation(Note1),
                        scientificToAbcNotation(Note2 + same)
                    ).slice(0, -1)
                )
            ),
            Math.abs(
                parseInt(
                    distance(
                        scientificToAbcNotation(Note1),
                        scientificToAbcNotation(Note2 + above)
                    ).slice(0, -1)
                )
            ),
        ];

        const min = Math.min(...distanceArr);
        const index = distanceArr.indexOf(min);

        return intervalArray[index];
    }

    var treble = [];
    var bass = [];

    var notation = `
X: 1
T: ${title}
M: 4/4
L: 1/8
Q: 100
K: Cmaj
V: 1 clef=treble
`;

    addNotes(treble, 4);
    addNotes(bass, 3);

    let beat = 0;
    let measureBeat = 0;
    let measure = 0;
    let voice = 0;
    var usedNotes = [];

    for (let i = 0; i < treble.length; i++) {
        //annotation
        if (treble[i].charAt(0) === `"`) {
            notation += " " + treble[i] + " ";
        } //note
        else {
            beat++;
            measureBeat++;

            //note used before
            if(usedNotes.includes(removeAccidental(treble[i])))
            {
                //new note has a # or b
                if(treble[i].includes("#") || treble[i].includes("b"))
                {
                    notation += scientificToAbcNotation(treble[i]);
                }
                else    //natural note
                {
                    notation += "=" + scientificToAbcNotation(treble[i]);
                }
            }
            else    //note not used before
            {
                notation += scientificToAbcNotation(treble[i]);
                usedNotes.push(removeAccidental(treble[i]));    //add note to used notes array
            }
            

            if (beat === 2) {
                //two eighth notes
                beat = 0;
                notation += " ";
            }
            if (measureBeat === 8) {
                //one full measure
                measure++;
                measureBeat = 0;
                notation += " |";
                usedNotes = [];
            }
            if (measure === 3) {
                //three full measures
                measure = 0;
                if (i !== treble.length - 1)
                {
                    notation += "\n";
                }
            }

            if (i === treble.length - 1) {
                //final note
                if (measureBeat !== 0) {
                    let remaning = 8 - measureBeat;
                    for (let i = 0; i < remaning; i++) {
                        notation += " z ";
                    }
                    notation += "|";
                }

                notation += "]";
            }
        }
    }

    function removeAccidental(note)
    {
        return note.replace("#","").replace("b","");
    }

    return notation;
}

export default make_abc;
