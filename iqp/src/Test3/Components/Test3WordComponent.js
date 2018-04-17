import React from 'react';

export class Test3WordComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            textDecoration: 'none',
            color: 'white'
        }

        this.handleLetterClick = this.handleLetterClick.bind(this);
    }

    handleLetterClick(e, data){
        e.preventDefault()
        let updateAnswer3Mapping = this.props.handleClick;
        this.setState({
            textDecoration: this.state.textDecoration === 'none' ? 'line-through' : 'none',
            color: this.state.color === 'white' ? 'aqua' : 'white'
        })
        updateAnswer3Mapping(e.target.getAttribute("id"))
    }

    render(){
        return(
            <span id={this.props.letterId} onClick={this.handleLetterClick} style={{
                                                                                display : 'inline-block',
                                                                                margin: '3px',
                                                                                textDecoration: this.state.textDecoration,
                                                                                background: this.state.color
                                                                                }}>
            {this.props.letter}
            </span>
        )
    }
}