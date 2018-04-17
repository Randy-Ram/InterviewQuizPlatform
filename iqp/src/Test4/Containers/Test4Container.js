import React from 'react';
import { letterCombinations } from './Test4Letters';
import { Test4TableComponent } from '../Components/Test4TableComponent';
import { Grid, Alert, Table, Row, Col } from 'react-bootstrap';
import Sticky from 'react-sticky-el';

let answer4Mapping = {}
let columnValues = []

for (var index in letterCombinations){
    //console.log(letterCombinations[index].join(""))
    answer4Mapping[letterCombinations[index].join("")] = "";
    columnValues.push(letterCombinations[index].join("  "));
}

// console.log(columnValues);

export class Test4Container extends React.Component {
    constructor(props){
        super(props)

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(letter_id, userValue){
        answer4Mapping[letter_id] = userValue;
        console.log(answer4Mapping)
    }

    render(){
        return(
            <div>
                <Alert id="test_instructions" bsStyle="warning">Each number in the below list is represented by a letter. Disover
                which letter is used for each number, then type the proper numbers in the blank spaces next to the number. The first
                two numbers are already filled in correctly. Both speed and accuracy is important.
                </Alert>
                <Grid>
                <Row>
                    <Col xs={3}>
                    <Sticky>
                    <Table>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>C</td>
                            <td>J</td>
                            <td>L</td>
                            <td>S</td>
                            <td>T</td>
                            <td>U</td>
                            <td>V</td>
                            <td>X</td>
                            <td>Z</td>
                            <td>O</td>
                        </tr>
                        </tbody>
                    </Table>
                    </Sticky>
                    </Col>
                    <Col xs={9}>
                    <div>
                        <Test4TableComponent rows={columnValues} onValueChange={this.handleUserInput}/>
                    </div>
                    </Col>
                </Row>
                </Grid>
            </div>
        )
    }
}
