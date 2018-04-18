import React from 'react';
import { test6TableContent } from './Test6TableContent';
import { Test6TableComponent } from '../Components/Test6TableComponent';
import { Grid, Row, Col, Alert } from 'react-bootstrap';


let answer6Mapping = {}
for(var index in test6TableContent){
    for(var index2 in test6TableContent[index]){
        let newCol = parseInt(index2, 10) + 3
        answer6Mapping["row_" + index.toString() + "_col_" + newCol.toString()] = 0
    }
}

// console.log(answer6Mapping);
export class Test6Container extends React.Component {
    constructor(props){
        super(props);

        this.handleAnswerMapping = this.handleAnswerMapping.bind(this);
    }

    handleAnswerMapping(row, col){
        console.log(row, col)
        answer6Mapping["row_" + row.toString() + "_col_" + col.toString()] = answer6Mapping["row_" + row.toString() + "_col_" + col.toString()] === 0 ? 1 : 0
        console.log(answer6Mapping);
    }

    render(){
        return(
            <Grid>
                <Row>
                    <Col xs={4}>
                        <Alert id="test_instructions" bsStyle="warning">
                            In the column marked 1, click on the cells opposite <strong>every fire or accident policy of 
                            $1500 to $4500 inclusive, issued between March 15, 1916 and May 10, 1917.</strong>
                        </Alert>
                    </Col>
                    <Col xs={4}>
                        <Alert id="test_instructions" bsStyle="success">
                            In the column marked 2 click on the cells opposite <strong>life or accident insurance policy
                                up to and including $3000, issued between October 15, 1916 and August 20, 1917.
                            </strong>
                        </Alert>
                    </Col>
                    <Col xs={4}>
                        <Alert id="test_instructions" bsStyle="info">
                            In the column marked 3 click on the cells opposite <strong> every fire or life insurance policy
                                of $2000 to $5000 inclusive, issued between February 10, 1916 and June 15, 1917.
                            </strong>
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} xsOffset={2}>
                        <Test6TableComponent rows={test6TableContent} onCellClick={this.handleAnswerMapping}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}