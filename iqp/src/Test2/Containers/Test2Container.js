import React from 'react';
import { passage } from './Test2Passage'
import { Test2PassageComponent } from '../Components/Test2PassageComponent';
import { Alert, Grid, Row, Col } from 'react-bootstrap';

let newPassage = passage.replace(/\n\n/g,"\n").split("\n");
let allParagraphs = []
for(var x=0; x < newPassage.length; x++){
    if(newPassage[x] !== "") {
        allParagraphs.push(newPassage[x]);
    }
}

let test2AnswerMapping = {}
let curr_paragraph = 1
for(var i=0; i < allParagraphs.length; i++){
    var splitParagraph = allParagraphs[i].split(" ");
    for(var j=0; j < splitParagraph.length; j++){
        test2AnswerMapping['para_' + curr_paragraph.toString() + "_word_" + (j+1).toString()] = 0
    }
    curr_paragraph++
}
// console.log(test2AnswerMapping);

export class Test2Container extends React.Component {
    constructor(props){
        super(props);

        this.handleWordClick = this.handleWordClick.bind(this);
    }

    handleWordClick(word_id){
        //console.log(word_id);
        test2AnswerMapping[word_id] = test2AnswerMapping[word_id] === 0 ? 1 : 0
        //console.log(test2AnswerMapping)
        this.props.answerMapping['test2AnswerMapping'] = test2AnswerMapping;
    }



    render(){
        let paragraphMapping =  allParagraphs.map((paragraph, para_num) =>
                                <Test2PassageComponent  paragraph={paragraph.split(" ")}
                                                        para_num={para_num + 1}
                                                        handleWordClick={this.handleWordClick}
                                                        key={para_num}
                                />
                                )
        return(
            <Grid>
                <div>
                    <Alert id="test_instructions" bsStyle="warning">In the following passage, when you click on a word it becomes
                        highlighted. You are to click on all <strong><u>incorrectly spelt</u></strong> words. 
                        Both speed and accuracy are important.
                    </Alert>
                    <div id='test2-container'>
                        {paragraphMapping}
                    </div>
                </div>
          </Grid>
        )
    }
}