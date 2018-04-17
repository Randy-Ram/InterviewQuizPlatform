import React from 'react';
import { Test2WordComponent } from './Test2WordComponent';

export class Test2PassageComponent extends React.Component {
    render(){
        let paragraph = this.props.paragraph;
        let para_num = this.props.para_num;
        // console.log(paragraph);
        return(
            <p>
                {paragraph.map((word, index) => 
                    <Test2WordComponent key={'para_' + para_num.toString() + "_word_" + (index + 1).toString()}
                                        wordId={'para_' + para_num.toString() + "_word_" + (index + 1).toString()}
                                        onClick={this.props.handleWordClick}
                                        word={word}
                    />
                )}
            </p>
        )
    }
}