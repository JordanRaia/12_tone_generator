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

    function addNotes(noteArr, startInterval, minimum, maximum) {
        for (let i = 0; i < rowNum; i++) {
            let randomRowType = rowType[Math.floor(Math.random() * 4)]; //random row Type
            let randomRowNum = Math.floor(Math.random() * 11) + 1; //random row Number
            noteArr.push(`"^${randomRowType + randomRowNum}"`); //push text of row's name
            addRow(
                noteArr,
                randomRowType,
                find_row_location(randomRowType, randomRowNum),
                startInterval,
                minimum,
                maximum
            );
        }
    }

    function addRow(
        noteArr,
        rowType,
        rowLocation,
        startInterval,
        minimum,
        maximum
    ) {
        switch (rowType) {
            case "P":
            case "I":
                for (let i = 0; i < 12; i++) {
                    pushNote(
                        noteArr,
                        rowType,
                        rowLocation,
                        i,
                        startInterval,
                        minimum,
                        maximum
                    );
                }
                break;
            case "R":
            case "RI":
                for (let i = 11; i >= 0; i--) {
                    pushNote(
                        noteArr,
                        rowType,
                        rowLocation,
                        i,
                        startInterval,
                        minimum,
                        maximum
                    );
                }
                break;
        }
    }

    function pushNote(
        noteArr,
        rowType,
        rowLocation,
        i,
        startInterval,
        minimum,
        maximum
    ) {
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
                                            ),
                                            minimum,
                                            maximum
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
                                            ),
                                            minimum,
                                            maximum
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
                                            ),
                                            minimum,
                                            maximum
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
                                            ),
                                            minimum,
                                            maximum
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
                                    pushMatrix(
                                        noteArr,
                                        rowType,
                                        rowLocation,
                                        i
                                    ),
                                    minimum,
                                    maximum
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
    function findLowest(Note1, Note2, minimum, maximum) {
        const intervalNum = parseInt(Note1.slice(-1)); //grabs number at the end and converts to an integer

        const below = intervalNum - 1; //interval below
        const same = intervalNum; //same interval
        const above = intervalNum + 1; //interval above

        const potentialIntervals = [below, same, above];

        var intervalArray = [];

        //push all intervals that are not over maximum or under minimum
        for (let i = 0; i < potentialIntervals.length; i++) {
            if (
                potentialIntervals[i] >= minimum &&
                potentialIntervals[i] <= maximum
            ) {
                intervalArray.push(potentialIntervals[i]);
            }
        }

        var distanceArr = [];

        //make array of intervals in abcnotation format
        for (let i = 0; i < intervalArray.length; i++) {
            distanceArr.push(
                Math.abs(
                    parseInt(
                        distance(
                            scientificToAbcNotation(Note1),
                            scientificToAbcNotation(Note2 + intervalArray[i])
                        ).slice(0, -1)
                    )
                )
            );
        }

        const min = Math.min(...distanceArr); //find interval with minimum distance
        const index = distanceArr.indexOf(min); //get index of minimum distance interval

        return intervalArray[index];
    }

    var treble = [];
    var bass = [];

    addNotes(treble, 4, 4, 7);
    addNotes(bass, 3, 1, 4);

    function abcLines(clef) {
        let beat = 0;
        let measureBeat = 0;
        let measure = 0;
        var usedNotes = [];
        let tempLine = "";
        let abcLinesClef = [];

        for (let i = 0; i < clef.length; i++) {
            //annotation
            if (clef[i].charAt(0) === `"`) {
                tempLine += " " + clef[i] + " ";
            } //note
            else {
                beat++;
                measureBeat++;

                //note used before
                if (usedNotes.includes(removeAccidental(clef[i]))) {
                    //new note has a # or b
                    if (clef[i].includes("#") || clef[i].includes("b")) {
                        tempLine += scientificToAbcNotation(clef[i]);
                    } //natural note
                    else {
                        tempLine += "=" + scientificToAbcNotation(clef[i]);
                    }
                } //note not used before
                else {
                    tempLine += scientificToAbcNotation(clef[i]);
                    usedNotes.push(removeAccidental(clef[i])); //add note to used notes array
                }

                if (beat === 2) {
                    //two eighth notes
                    beat = 0;
                    tempLine += " ";
                }
                if (measureBeat === 8) {
                    //one full measure
                    measure++;
                    measureBeat = 0;
                    tempLine += " |";
                    usedNotes = [];
                }
                if (measure === 3) {
                    //three full measures
                    measure = 0;
                    if (i !== clef.length - 1) {
                        abcLinesClef.push(tempLine);
                        tempLine = "";
                    }
                }

                if (i === clef.length - 1) {
                    //final note
                    if (measureBeat !== 0) {
                        let remaning = 8 - measureBeat;
                        for (let i = 0; i < remaning; i++) {
                            tempLine += " z ";
                        }
                        tempLine += "|";
                    }

                    tempLine += "]";
                    abcLinesClef.push(tempLine);
                    tempLine = "";
                }
            }
        }
        return abcLinesClef;
    }

    function removeAccidental(note) {
        return note.replace("#", "").replace("b", "");
    }

    function createNotation(trebleLines, bassLines) {
        var notation = `
X: 1
T: ${title}
M: 4/4
L: 1/8
Q: 100
K: Cmaj
`;

        for (let i = 0; i < trebleLines.length; i++)
        {
            notation += `V: 1 clef=treble\n`;      //indicate treble clef
            notation += trebleLines[i] + "\n";     //treble line

            notation += `V: 2 clef=bass\n`;        //indicate bass clef
            notation += bassLines[i] + "\n";       //bass line
        }

        return notation;
    }

    //write to notation
    var abcLinesTreble = abcLines(treble);
    var abcLinesBass = abcLines(bass);

    const notation = createNotation(abcLinesTreble, abcLinesBass);

    return notation;
}

export default make_abc;
