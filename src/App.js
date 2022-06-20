import "./App.css";
import Matrix from "./Matrix/Matrix";
import generateMatrix from "./Matrix/GenerateMatrix";

function App() {
    var row = [5, 2, 3, 4, 1, 0, 6, 7, 10, 11, 8, 9];

    var matrix = generateMatrix((row = { row }));

    return (
        <div className="App">
            <h1>Matrix</h1>
            <Matrix matrix={matrix} />
        </div>
    );
}

export default App;
