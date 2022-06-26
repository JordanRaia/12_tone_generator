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
                    <tbody>
                        <tr>
                            <td className="matrix__topLeft"></td>
                            {matrix[0].map((i_value) => {
                                return (
                                    <td key={"I" + i_value}>
                                        I<sup>{i_value}</sup>
                                    </td>
                                );
                            })}
                            <td className="matrix__topRight"></td>
                        </tr>
                        {matrix.map((array) => {
                            return (
                                <tr key={"P" + array[0]}>
                                    <td>
                                        P<sup>{array[0]}</sup>
                                    </td>
                                    {array.map((child) => {
                                        return <td key={note_types[type][child]}>{note_types[type][child]}</td>;
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
                                    <td key={"RI" + ri_value}>
                                        RI<sup>{ri_value}</sup>
                                    </td>
                                );
                            })}
                            <td className="matrix__bottomRight"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Matrix;
