import React from 'react';
import { Test1Container } from './Test1/containers/Test1Container';
import { Test2Container } from './Test2/Containers/Test2Container';
import { Test3Container } from './Test3/Containers/Test3Container';
import { Test4Container } from './Test4/Containers/Test4Container';
import { Test5Container } from './Test5/Containers/Test5Container';
import { Test6Container } from './Test6/Containers/Test6Container';
import { Test7Container } from './Test7/Containers/Test7Container';
import { Test8Container } from './Test8/Containers/Test8Container';
import { Tabs, Tab } from 'react-bootstrap';


let tabTitles = ["Test 1", "Test 2", "Test 3", "Test 4",
                 "Test 5", "Test 6", "Test 7", "Test 8"]

export class TestInterface extends React.Component {
    render(){
        let testContainers = [<Test1Container answerMapping={this.props.answerMapping}/>, 
                              <Test2Container answerMapping={this.props.answerMapping}/>,
                              <Test3Container answerMapping={this.props.answerMapping}/>, 
                              <Test4Container answerMapping={this.props.answerMapping}/>, 
                              <Test5Container answerMapping={this.props.answerMapping}/>, 
                              <Test6Container answerMapping={this.props.answerMapping}/>, 
                              <Test7Container answerMapping={this.props.answerMapping}/>, 
                              <Test8Container answerMapping={this.props.answerMapping}/>, 
                            ]
        let tabs = tabTitles.map((val, index) => 
        <Tab key={index} eventKey={index} title={val}>
            {testContainers[index]}
        </Tab>
    )

        return(
            <Tabs defaultActiveKey={0} id="tab-body">
                {tabs}
                {/* <Tab eventKey={1} title="Test 1">
                    <Test1Container answerMapping={this.props.answerMapping}/>
                </Tab>
                <Tab eventKey={2} title="Test 2">
                    <Test2Container/>
                </Tab>
                <Tab eventKey={3} title="Test 3">
                <Test3Container/>
                </Tab>
                <Tab eventKey={4} title="Test 4">
                <Test4Container/>
                </Tab>
                <Tab eventKey={5} title="Test 5">
                <Test5Container/>
                </Tab>
                <Tab eventKey={6} title="Test 6">
                <Test6Container/>
                </Tab>
                <Tab eventKey={7} title="Test 7">
                <Test7Container/>
                </Tab>
                <Tab eventKey={8} title="Test 8">
                <Test8Container/>
                </Tab> */}
          </Tabs>
        )
     } 
}