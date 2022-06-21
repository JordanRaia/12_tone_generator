import React from "react";
import "./Matrix.css";

import { note_types } from "../Modules/note_types"

function Matrix({ matrix, type }) {
    
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
                                    return <td>{note_types[type][child]}</td>;
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
