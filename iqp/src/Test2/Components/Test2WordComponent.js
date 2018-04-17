import React  from 'react';

export class Test2WordComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            color: 'white'
        }

        this.handleWordClick = this.handleWordClick.bind(this);
    }

    handleWordClick(e, data){
        e.preventDefault()
        let updateAnswer2Mapping = this.props.onClick;
        this.setState({
            color: this.state.color === 'white' ? 'yellow' : 'white'
        })
        updateAnswer2Mapping(e.target.getAttribute("id"))
    }

    render(){
        return(
            <span id={this.props.wordId} onClick={this.handleWordClick} style={{display : 'inline-block',
                                                                                margin: '1px',
                                                                                background: this.state.color
                                                                                }}>
                {this.props.word}
            </span>
        )
    }
}