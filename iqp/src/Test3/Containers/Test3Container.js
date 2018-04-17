import React from 'react';
import { lines } from './Test3Lines';
import { Test3LineComponent } from '../Components/Test3LineComponent';
import { Alert } from 'react-bootstrap';

let test3AnswerMapping = {}
let currentLine = 1
for(var i=0; i < lines.length; i++){
    var lineSplit = lines[i].split(",")
    for (var j=0; j<lineSplit.length; j++){ 
        test3AnswerMapping['line_' + currentLine.toString() + "_letter_" + (j + 1).toString()] = 0
    }
currentLine++
}

//console.log(test3AnswerMapping)

export class Test3Container extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        window.addEventListener("keydown", function (e) {
            if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.keyCode === 91 && e.keyCode === 70) 
                // || e.keyCode === 91
            ) { 
                e.preventDefault();
                alert("The exam tests speed and accuracy in finding the letters, not cheating by using browser shortcuts!")
            }
        })
    }

    handleClick(letter_id){
        test3AnswerMapping[letter_id] = test3AnswerMapping[letter_id] === 0 ? 1 : 0;
        //console.log(test3AnswerMapping);
    }

    render(){
        let lineMapping =  lines.map((line, index) =>
                                <Test3LineComponent line={line.split(",")}
                                                    line_num={index + 1}
                                                    handleClick={this.handleClick}
                                                    key={index}
                                />
                            )
        return (
            <div>
                <Alert id="test_instructions" bsStyle="warning">In the following list of letters you are to click on the letters 
                <strong><u> Z, X, U and C</u></strong> but not any other letters. Both speed and accuracy is important. 
                Both speed and accuracy is important.
            </Alert>
                <div id='test3-container'>
                {lineMapping}
                </div>
            </div>
        )
    }
}