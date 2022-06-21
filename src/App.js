import { useEffect, useState } from "react";
import Notation from "./Notation/Notation";
import Matrix from "./Matrix/Matrix";
import generateMatrix from "./Matrix/GenerateMatrix";
import "./App.css";
import Midi from "./Notation/Midi";
import make_abc from "./Notation/MakeAbc";

function App() {
    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while ((currentIndex !== 0)) {
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

    const [Flats, setFlats] = useState(true);
    const [Sharps, setSharps] = useState(false);
    const [Numbers, setNumbers] = useState(false);
    const [NumbersTe, setNumbersTe] = useState(false);
    const [MatrixType, setMatrixType] = useState("flats");

    var row = [5, 2, 3, 4, 1, 0, 6, 7, 10, 11, 8, 9];

    shuffle(row);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const onPageLoad = () => {
            setLoading(false);
        };

        if (document.readyState === "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad);
        }
    }, []);

    var matrix;

    var abcNotes = `
    X: 1
    T: Twelve Tone
    M: 4/4
    L: 1/8
    K: Cmaj clef=treble`;

    if (!loading) {
        matrix = generateMatrix((row = { row }));
        abcNotes = make_abc(matrix, MatrixType, 12);
    }

    return (
        <div className="App">
            <h1>Matrix</h1>
            <Matrix matrix={matrix} type={MatrixType} />
            <form>
                <input
                    type="radio"
                    name="matrix_type"
                    value="flats"
                    checked={Flats}
                    onClick={function (event) {
                        setFlats(true);
                        setSharps(false);
                        setNumbers(false);
                        setNumbersTe(false);
                        setMatrixType("flats");
                    }}
                />
                <label htmlFor="flats">Flats</label>
                <input
                    type="radio"
                    name="matrix_type"
                    value="sharps"
                    checked={Sharps}
                    onClick={function (event) {
                        setFlats(false);
                        setSharps(true);
                        setNumbers(false);
                        setNumbersTe(false);
                        setMatrixType("sharps");
                    }}
                />
                <label htmlFor="sharps">Sharps</label>
                <input
                    type="radio"
                    name="matrix_type"
                    value="numbers"
                    checked={Numbers}
                    onClick={function (event) {
                        setFlats(false);
                        setSharps(false);
                        setNumbers(true);
                        setNumbersTe(false);
                        setMatrixType("numbers");
                    }}
                />
                <label htmlFor="numberste">Pitch Class</label>
                <input
                    type="radio"
                    name="matrix_type"
                    value="numberste"
                    checked={NumbersTe}
                    onClick={function (event) {
                        setFlats(false);
                        setSharps(false);
                        setNumbers(false);
                        setNumbersTe(true);
                        setMatrixType("numberste");
                    }}
                />
                <label htmlFor="numberste">Pitch Class (t, e)</label>
            </form>
            {loading ? (
                ""
            ) : (
                <div>
                    <Notation notation={abcNotes} />
                    <Midi notation={abcNotes} />
                </div>
            )}
        </div>
    );
}

export default App;
