import { useState } from "react";
import { Icon } from "@iconify/react";
import coolstory from "coolstory.js";
import "./App.css";
import Notation from "./Notation/Notation";
import { note_types } from "./Modules/note_types";
import Matrix from "./Matrix/Matrix";
import generate_matrix from "./Matrix/GenerateMatrix";
import make_abc from "./Notation/MakeAbc";

function App() {
    const [noteType, setNoteType] = useState("flats");
    const [row, setRow] = useState([]); //Row array
    //array of conditionals for each note button, wheather it's been clicked and active
    const [noteButtonState, setNoteButtonState] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [rowNum, setRowNum] = useState(10);
    const [title, setTitle] = useState("Twelve Tone Piece");
    const [isShown, setIsShown] = useState(false);
    const [generateError, setGenerateError] = useState("");
    //values used when generate is clicked
    const [displayRow, setDisplayRow] = useState();
    const [displayNoteType, setDisplayNoteType] = useState("flats");
    const [abcNotes, setAbcNotes] = useState();

    //set random number
    const setRandomNumber = (e) => {
        e.preventDefault();

        setRowNum(Math.floor(Math.random() * 20) + 1); //random number from 1 to 20
    };

    //set random title
    const setRandomTitle = (e) => {
        e.preventDefault();

        setTitle(coolstory.title(100)); //random title under 100 characters
    };

    //sets note type
    const setNewNoteType = (type) => (e) => {
        e.preventDefault(); //prevents page from refreshing

        setNoteType(type);
    };

    //sets row to random values and fills noteButtonState with true
    const randomRow = (e) => {
        e.preventDefault(); //prevent page from refreshing

        var tempRow = [5, 2, 3, 4, 1, 0, 6, 7, 10, 11, 8, 9];
        shuffleRow(tempRow); //randomly shuffle the row
        setRow(tempRow);

        setNoteButtonState([
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
        ]);
    };

    //returns wheather the note type is active
    function isNoteTypeActive(type) {
        if (type === noteType) {
            return true;
        } else {
            return false;
        }
    }

    //resets Row to nothing and fills noteButtonState with false
    const resetRow = (e) => {
        e.preventDefault(); //prevent page from refreshing

        setRow([]);
        setNoteButtonState([
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]);
    };

    //remove last element from row array and update button state array
    const removeNoteArrays = (e) => {
        e.preventDefault(); //prevent page from refreshing

        if (row.length === 0) {
            //if no row elements exist, return
            return;
        } else {
            updateNoteState(row[row.length - 1], false); //make button clickable again

            let tempRow = row.slice(); //make temp row to modify
            tempRow.pop();
            setRow(tempRow);
        }
    };

    //updates the button state array and row array
    const updateNoteArrays = (index) => (e) => {
        e.preventDefault(); //prevent page refresh

        setRow([...row, index]); //push new note on to row

        updateNoteState(index, true); //set noteButtonState[index] to true
    };

    //change noteButtonState[index] to state
    function updateNoteState(index, state) {
        let newArr = [...noteButtonState]; //copy old daya to new array
        newArr[index] = state; //replace new value in new array
        setNoteButtonState(newArr); //replace old array with new array
    }

    //randomly shuffle an array
    function shuffleRow(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }

    //Generate a matrix and score
    const generate = (e) => {
        e.preventDefault(); //prevent refresh

        if (row.length < 12) {
            setGenerateError("Must use all 12 notes!");
        } else {
            setGenerateError("");
            setDisplayNoteType(noteType);
            setDisplayRow(row.slice());
            if (displayRow) {
                setAbcNotes(
                    make_abc(
                        generate_matrix(displayRow),
                        noteType,
                        rowNum,
                        title
                    )
                );
            } else {
                setAbcNotes(
                    make_abc(
                        generate_matrix(row.slice()),
                        noteType,
                        rowNum,
                        title
                    )
                );
            }
            setIsShown(true);
        }
    };

    return (
        <div className="App">
            <div className="App__firsthalf">
                <div className="App__info">
                    <h1>Twelve Tone Piece Generator</h1>
                    <h2>Row</h2>
                    <div className="App__row">
                        {row.map((i) => (
                            <p
                                key={note_types[noteType][i]}
                                className="App__rowElement"
                            >
                                {note_types[noteType][i]}
                            </p>
                        ))}
                    </div>
                    <div className="App__noteButtonRow">
                        {noteButtonState.map((value, i) => (
                            <button
                                key={note_types[noteType][i]}
                                disabled={value}
                                onClick={updateNoteArrays(i)}
                            >
                                {note_types[noteType][i]}
                            </button>
                        ))}
                        <button onClick={removeNoteArrays}>
                            <Icon icon="akar-icons:trash-can" />
                        </button>
                        <button onClick={resetRow}>
                            <Icon icon="bx:reset" />
                        </button>
                        <button onClick={randomRow}>
                            <Icon icon="icomoon-free:dice" />
                        </button>
                    </div>
                    <div className="App__noteTypeFlex">
                        <button
                            onClick={setNewNoteType("flats")}
                            disabled={isNoteTypeActive("flats")}
                        >
                            ♭
                        </button>
                        <button
                            onClick={setNewNoteType("sharps")}
                            disabled={isNoteTypeActive("sharps")}
                        >
                            ♯
                        </button>
                        <button
                            onClick={setNewNoteType("numbers")}
                            disabled={isNoteTypeActive("numbers")}
                        >
                            0
                        </button>
                        <button
                            onClick={setNewNoteType("numberste")}
                            disabled={isNoteTypeActive("numberste")}
                        >
                            t
                        </button>
                    </div>
                    <form>
                        <div className="App__flex">
                            <label htmlFor="RowNum">Number of Rows: </label>
                            <input
                                type="number"
                                placeholder="1-20"
                                value={rowNum}
                                min={1}
                                max={20}
                                onChange={(e) => setRowNum(e.target.value)}
                            />
                            <button onClick={setRandomNumber}>
                                <Icon icon="icomoon-free:dice" />
                            </button>
                        </div>
                        <div className="App__flex">
                            <label htmlFor="Title">Title: </label>
                            <input
                                type="text"
                                value={title}
                                maxlength={100}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button onClick={setRandomTitle}>
                                <Icon icon="icomoon-free:dice" />
                            </button>
                        </div>
                    </form>
                    <button onClick={generate}>Generate</button>
                    <p>{generateError}</p>
                    {isShown && (
                        <Matrix
                            matrix={generate_matrix(displayRow)}
                            type={displayNoteType}
                        />
                    )}
                </div>
            </div>
            <div className="App__otherhalf">
                {isShown && <div className="App__notation">
                    {abcNotes && <Notation notation={abcNotes} />}
                </div>}
            </div>
        </div>
    );
}

export default App;
