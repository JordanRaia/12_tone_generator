import { scientificToAbcNotation } from "@tonaljs/abc-notation";
import { note_types } from "../Modules/note_types";

function make_abc(matrix, type, rowNum) {
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

    var notation = `
X: 1
T: Twelve Tone
M: 4/4
L: 1/8
Q: 100
K: Cmaj
V: 1 clef=treble
`;

    let noteNum = 0; //number of notes played this measure
    let measureNum = 0; //number of measures printed on line
    let beatNum = 0;
    let treble = true;

    for (let i = 0; i < rowNum; i++) {
        let randomRowType = rowType[Math.floor(Math.random() * 4)]; //random row Type
        let randomRowNum = Math.floor(Math.random() * 11) + 1; //random row Number
        var location;
        var r;

        switch (randomRowType) {
            case "P":
                location = find_row_location(randomRowType, randomRowNum);
                notation += `"^${randomRowType + randomRowNum}"`;
                for (let i = 0; i < 12; i++) {
                    if (treble) {
                        r = 4;
                    } else {
                        r = 3;
                    }

                    notation +=
                        "=" +
                        scientificToAbcNotation(
                            note_types[new_type][matrix[location][i]] + r
                        );

                    beatNum++;
                    if (beatNum === 2) {
                        notation += " ";
                        beatNum = 0;
                    }

                    noteNum = noteNum + 1;
                    if (noteNum === 8) {
                        noteNum = 0;
                        notation += "| ";
                        measureNum++;
                        if (measureNum === 3) {
                            notation += "\n";
                            if (treble) {
                                notation += "V: 2 clef=bass \n";
                                treble = false;
                            } else {
                                notation += "V: 1 clef=treble \n";
                                treble = true;
                            }
                            measureNum = 0;
                        }
                    }
                }
                break;
            case "R":
                location = find_row_location(randomRowType, randomRowNum);
                notation += `"^${randomRowType + randomRowNum}"`;
                for (let i = 11; i >= 0; i--) {
                    if (treble) {
                        r = 4;
                    } else {
                        r = 3;
                    }

                    notation +=
                        "=" +
                        scientificToAbcNotation(
                            note_types[new_type][matrix[location][i]] + r
                        );

                    beatNum++;
                    if (beatNum === 2) {
                        notation += " ";
                        beatNum = 0;
                    }

                    noteNum = noteNum + 1;
                    if (noteNum === 8) {
                        noteNum = 0;
                        notation += "| ";
                        measureNum++;
                        if (measureNum === 3) {
                            notation += "\n";
                            if (treble) {
                                notation += "V: 2 clef=bass \n";
                                treble = false;
                            } else {
                                notation += "V: 1 clef=treble \n";
                                treble = true;
                            }
                            measureNum = 0;
                        }
                    }
                }
                break;
            case "I":
                location = find_row_location(randomRowType, randomRowNum);
                notation += `"^${randomRowType + randomRowNum}"`; //anotate the row
                for (let i = 0; i < 12; i++) {
                    if (treble) {
                        r = 4;
                    } else {
                        r = 3;
                    }

                    notation +=
                        "=" +
                        scientificToAbcNotation(
                            note_types[new_type][matrix[i][location]] + r
                        );

                    beatNum++;
                    if (beatNum === 2) {
                        notation += " ";
                        beatNum = 0;
                    }

                    noteNum = noteNum + 1;
                    if (noteNum === 8) {
                        noteNum = 0;
                        notation += "| ";
                        measureNum++;
                        if (measureNum === 3) {
                            notation += "\n ";
                            if (treble) {
                                notation += "V: 2 clef=bass \n";
                                treble = false;
                            } else {
                                notation += "V: 1 clef=treble \n";
                                treble = true;
                            }
                            measureNum = 0;
                        }
                    }
                }
                break;
            case "RI":
                location = find_row_location(randomRowType, randomRowNum);
                notation += `"^${randomRowType + randomRowNum}"`;
                for (let i = 11; i >= 0; i--) {
                    if (treble) {
                        r = 4;
                    } else {
                        r = 3;
                    }

                    notation +=
                        "=" +
                        scientificToAbcNotation(
                            note_types[new_type][matrix[i][location]] + r
                        );

                    beatNum++;
                    if (beatNum === 2) {
                        notation += " ";
                        beatNum = 0;
                    }

                    noteNum = noteNum + 1;
                    if (noteNum === 8) {
                        noteNum = 0;
                        notation += "| ";
                        measureNum++;
                        if (measureNum === 3) {
                            notation += "\n ";
                            if (treble) {
                                notation += "V: 2 clef=bass \n";
                                treble = false;
                            } else {
                                notation += "V: 1 clef=treble \n";
                                treble = true;
                            }
                            measureNum = 0;
                        }
                    }
                }
                break;
            default:
                console.log(
                    randomRowType,
                    " is an invalid row type! (P, R, I, and RI are valid)"
                );
                return;
        }
    }

    console.log(notation);
    return notation;
}

export default make_abc;
