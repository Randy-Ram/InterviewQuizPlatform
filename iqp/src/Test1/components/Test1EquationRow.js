import React from 'react';
// import PropTypes from 'prop-types';
import { EquationComponent } from './Test1EquationComponent'
import { Row } from 'react-bootstrap';


export class EquationRow extends React.Component {

    render() {
        let eqElements = []
        for (var item in this.props.equationRow){
            //console.log(this.props.equationRow[item]);
                eqElements.push(<EquationComponent
                                key={this.props.equationRow[item]}
                                equation={this.props.equationRow[item]}
                                handleCheckboxChange={this.props.handleCheckboxChange}
                                />)
        }
        return(
        <Row>
            {eqElements}
        </Row>
        )
    }
}

// Equation.propTypes = {
//     equation: PropTypes.string.isRequired
// }