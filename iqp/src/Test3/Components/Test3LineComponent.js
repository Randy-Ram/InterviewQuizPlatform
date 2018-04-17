import React from 'react';
import { Test3WordComponent } from './Test3WordComponent';

export class Test3LineComponent extends React.Component {

    render(){
        let lineSplit = this.props.line;
        let line_num = this.props.line_num;
        return(
            <p>
                {lineSplit.map((letter, index) =>
                    <Test3WordComponent handleClick={this.props.handleClick}
                                        letterId={'line_' + line_num.toString() + "_letter_" + (index + 1).toString()}
                                        letter={letter}
                                        key={'line_' + line_num.toString() + "_letter_" + (index + 1).toString()}
                    />
                )}
            </p>
        )
    }
}