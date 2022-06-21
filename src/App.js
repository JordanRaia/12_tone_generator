import { useState } from "react";
import Notation from "./Notation/Notation";
import Matrix from "./Matrix/Matrix";
import generateMatrix from "./Matrix/GenerateMatrix";
import "./App.css";
import Midi from "./Notation/Midi";

let notationtest = `
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Cmaj
|:D2|"Em"EBBA B2 EB|\
    ~B2 AB dBAG|\
    "D"FDAD BDAD|\
    FDAD dAFD|
"Em"EBBA B2 EB|\
    B2 AB defg|\
    "D"afe^c dBAF|\
    "Em"DEFD E2:|
|:gf|"Em"eB B2 efge|\
    eB B2 gedB|\
    "D"A2 FA DAFA|\
    A2 FA defg|
"Em"eB B2 eBgB|\
    eB B2 defg|\
    "D"afe^c dBAF|\
    "Em"DEFD E2:|
`;

function App() {
    const [Flats, setFlats] = useState(true);
    const [Sharps, setSharps] = useState(false);
    const [Numbers, setNumbers] = useState(false);
    const [NumbersTe, setNumbersTe] = useState(false);
    const [MatrixType, setMatrixType] = useState("flats");

    var row = [5, 2, 3, 4, 1, 0, 6, 7, 10, 11, 8, 9];

    var matrix = generateMatrix((row = { row }));

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
            <Notation notation={notationtest}/>
            <Midi notation={notationtest}/>
        </div>
    );
}

export default App;
