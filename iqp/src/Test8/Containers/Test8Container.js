import React from 'react';
import { englishProverbs, arabianProverbs } from './Test8SentenceList';
import { Test8TableComponent } from '../Components/Test8TableComponent';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

let englishTable = []
let arabianTable = []
let answer8Mapping = {}

for (var index in englishProverbs){
    let currArr = []
    currArr.push(parseInt(index, 10) + 1)
    currArr.push(englishProverbs[index])
    englishTable.push(currArr)
    currArr = []
}

for(var index2 in arabianProverbs){
    let currArr = []
    if(index2 === "0"){
        currArr.push("4");
        answer8Mapping[index2] = "4"
    }
    else {
        currArr.push('')
        answer8Mapping[index2] = "-1"
    }
    currArr.push(arabianProverbs[index2])
    arabianTable.push(currArr)
    currArr = []
}
// console.log(englishTable)
// console.log(arabianTable)


export class Test8Container extends React.Component {
   constructor(props){
       super(props);

        this.handleUserAnswer = this.handleUserAnswer.bind(this);
   }

   handleUserAnswer(row, userAnswer){
        answer8Mapping[row] = userAnswer;
        console.log(answer8Mapping);
   }

    render(){
        return(
            <Grid>
                 <Row>
                    <Col>
                        <Alert id="test_instructions" bsStyle="warning">
                            Fill in the # column in Table 2 which corresponds to the number of the English proverb
                            in Table 1. The first item has already been done.
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Test8TableComponent editable={false} name="English Proverb" rows={englishTable}/>
                    </Col>
                    <Col xs={6}>
                        <Test8TableComponent editable={true} name="Arabian Proverb" rows={arabianTable} onClick={this.handleUserAnswer}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}