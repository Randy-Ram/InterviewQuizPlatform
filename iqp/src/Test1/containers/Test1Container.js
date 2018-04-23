import React from 'react';
import { EquationRow } from '../components/Test1EquationRow';
import { questionList } from './Test1Equations';
import { Grid, Alert } from 'react-bootstrap';

// const questionList = ['17 + 4 = 21', "13 + 3 = 30", "13 - 7 = 6"]

let test1AnswerMapping = {}
for (var i = 0; i < questionList.length; i++) {
    test1AnswerMapping[questionList[i]] = 0
}


export class Test1Container extends React.Component {
    constructor(props) {
        super(props);
        //console.log(test1AnswerMapping)
        this.toggleCheckbox = this.toggleCheckbox.bind(this);

    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
      }

      toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
          test1AnswerMapping[label] = 0;
          //console.log(test1AnswerMapping);
        } else {
          this.selectedCheckboxes.add(label);
          test1AnswerMapping[label] = 1;
          //console.log(test1AnswerMapping);
        }
        this.props.answerMapping['test1AnswerMapping'] = test1AnswerMapping;
      }

    render(){
        let equationRows = []
        let final_rows = []
        let curr_value = 0
        for (var item in questionList) {
            if (curr_value === 3){
                equationRows.push(questionList[item]);
                final_rows.push(equationRows);
                equationRows = []
                curr_value = 0
            } else {
                equationRows.push(questionList[item]);
                curr_value++;
            }
        }

        let rowMapping = final_rows.map((equationRow, index) => 
                <EquationRow key={equationRow.join()} handleCheckboxChange={this.toggleCheckbox}
                equationRow={equationRow}/>
                )   
        
        //console.log(final_rows)
        return (
            <Grid>
                <Alert id="test_instructions" bsStyle="warning">This is a test of concentration in checking for errors. 
              Check all <strong><u>incorrect</u></strong> answers. Both speed and accuracy are important</Alert>
            
            {rowMapping}
            </Grid>
            )
    }
}



