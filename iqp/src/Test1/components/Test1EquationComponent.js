import React from 'react';
import { Col, Checkbox } from 'react-bootstrap';

export class EquationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
          }

          this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    }

    toggleCheckboxChange = () => {
        const handleCheckboxChange = this.props.handleCheckboxChange;
        const equation = this.props.equation;
    
        this.setState(({ isChecked }) => (
          {
            isChecked: !isChecked,
          }
        ));
    
        handleCheckboxChange(equation);
      }

    render(){
        return (
            <Col xs={3} md={3}>
                {/* <label>
                    <input
                    name={this.props.equation}
                    type="checkbox"
                    checked={this.isChecked}
                    onChange={this.toggleCheckboxChange} 
                    />
                {this.props.equation}
                </label> */}
                <Checkbox title={this.props.equation} onChange={this.toggleCheckboxChange}> 
                    {this.props.equation} 
                </Checkbox>
            </Col>
        )
    }
}