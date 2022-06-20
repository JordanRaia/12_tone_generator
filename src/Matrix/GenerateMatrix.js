import React from "react";

function generate_matrix({ row }) {
    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    var matrix = Array.from(Array(row.length), () => Array(row.length).fill(0)); //matrix that will be made from row

    matrix[0] = row;

    //set the diagonal values of matrix
    for (let i = 0; i < row.length; i++) {
        matrix[i][i] = matrix[0][0];
    }

    //set rest of values
    for (let i = 1; i < row.length; i++) {
        let difference = matrix[i][i] - matrix[0][i]; //find distance between this row and initial row
        for (let j = 0; j < row.length; j++) {
            matrix[i][j] = mod(matrix[0][j]+difference, row.length);
        }
    }

    return matrix;
}

export default generate_matrix;
