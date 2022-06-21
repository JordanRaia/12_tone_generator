import React from "react";
import "./Matrix.css";

function Matrix({ matrix, type }) {
    var types = {
        flats: [
            "C",
            "Db",
            "D",
            "Eb",
            "E",
            "F",
            "Gb",
            "G",
            "Ab",
            "A",
            "Bb",
            "B",
        ],
        sharps: [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B",
        ],
        numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        numberste: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "t", "e"],
    };
    if (matrix === undefined) {
        return <div>matrix undefined</div>;
    } else {
        return (
            <div className="matrix__table">
                <table>
                    <tr>
                        <td className="matrix__topLeft"></td>
                        {matrix[0].map((i_value) => {
                            return (
                                <td>
                                    I<sup>{i_value}</sup>
                                </td>
                            );
                        })}
                        <td className="matrix__topRight"></td>
                    </tr>
                    {matrix.map((array) => {
                        return (
                            <tr>
                                <td>
                                    P<sup>{array[0]}</sup>
                                </td>
                                {array.map((child) => {
                                    return <td>{types[type][child]}</td>;
                                })}
                                <td>
                                    R<sup>{array[array.length - 1]}</sup>
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="matrix__bottomLeft"></td>
                        {matrix[matrix.length - 1].map((ri_value) => {
                            return (
                                <td>
                                    RI<sup>{ri_value}</sup>
                                </td>
                            );
                        })}
                        <td className="matrix__bottomRight"></td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Matrix;
