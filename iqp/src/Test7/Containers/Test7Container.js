import React from 'react';
import { questionList } from './Test7Questions';
import  MathJax  from 'react-mathjax2';
import { Test7TableComponent } from '../Components/Test7TableComponent';
import { Grid, Row, Col, Alert, Label } from 'react-bootstrap';

let tableQuestions = []
let answer7Mapping = {}

for (var index in questionList){
    if("tex" in questionList[index]){
        tableQuestions.push(<MathJax.Context><div><MathJax.Node inline>{questionList[index]['tex']}</MathJax.Node></div></MathJax.Context>)
    } else {
        //console.log(questionList[index])
        tableQuestions.push(<div>{questionList[index]['notex']}</div>)
    }
    answer7Mapping[index] = '-1'
}


//console.log(tableQuestions)

export class Test7Container extends React.Component {
    constructor(props){
        super(props);
        this.handleUserAnswer = this.handleUserAnswer.bind(this);
    }

    handleUserAnswer(questionNumber, userVal) {
        answer7Mapping[questionNumber] = userVal;
        //console.log(answer7Mapping)
        this.props.answerMapping['test7AnswerMapping'] = answer7Mapping;
    }

    render(){
    return (
        <Grid>
        <Row>
            <Col>
                <Alert id="test_instructions" bsStyle="warning">
                    Solve the following problems. Both speed and accuracy is important.
                </Alert>
            </Col>
        </Row>
        <Row>
            <Col xsOffset={4}>
                <h4>
                        <Label>*12ins. = 1 ft.</Label>
                </h4>
            </Col>
        </Row>
        <Row>
            <Col xs={12} xsOffset={2}>
                <Test7TableComponent rows={tableQuestions} onClick={this.handleUserAnswer}/>
            </Col>
        </Row>
    </Grid>
    );
    }
}