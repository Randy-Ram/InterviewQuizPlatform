import React from 'react';
import { nameCityMapping } from './Test5NameCityMapping';
import { Table, Grid, Row, Col, Alert } from 'react-bootstrap';
import { Test5TableComponent } from '../Components/Test5TableComponent';

let cities = ['Baltimore', 'New York', 'Boston', 'Philadelphia', 'Buffalo',
              'Pittsburg', 'Chicago', 'Rochester', 'Minneapolis', 'St. Paul']

let answer5Mapping = {}
for(var i=0; i < cities.length; i++){
    answer5Mapping[cities[i]] = '';
}

export class Test5Container extends React.Component {
    constructor(props){
        super(props);

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(cityName, userValue){
        answer5Mapping[cityName] = userValue;
        console.log(answer5Mapping);
    }

    render() {
        let cityMapping = cities.map(city => 
            <Col md={3} key={city}>
                <Test5TableComponent key={city} cityName={city} onValueChange={this.handleUserInput}/>
            </Col>
        )

        return (
            <div>
            <Alert id="test_instructions" bsStyle="warning">
            Below is a list of names of men followed by the cities in which they live. You are to write the names of the men
            in the table to the right under their respective cities. Write the names under each city in <strong><u>
                alphabetical order </u></strong>. Both speed and accuracy is important.
            </Alert>
            <Grid>
            <Row>
                <Col md={2} >
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(nameCityMapping).map((key, index) =>
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{nameCityMapping[key]}</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </Table>
                </Col>
                <Row>
                    {cityMapping}
                </Row>
            </Row>
            </Grid>
        </div>
        )
    }
}