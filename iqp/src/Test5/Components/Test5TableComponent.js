import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

export class Test5TableComponent extends React.Component {
    constructor(props){
        super(props);

        this._columns = [
            {
              key: 'name',
              name: this.props.cityName,
              //width: 100,
              editable: true,
              events: {
                onClick: this.cellEditWithOneClick
              }
            }
        ]

        this.state = {
            rows: this.createRows(this.props.cityName, 5)
        }

        this.createRows = this.createRows.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
        this.cellEditWithOneClick = this.cellEditWithOneClick.bind(this);
    }

    createRows(numRows){
        // console.log("Hello");
        // console.log(this.props.cityName)
        let rows = []
        for(var i=0; i < 5; i++){
            rows.push({
                name:  ''
            })
        }
        //console.log(rows)
        return rows
    }

    rowGetter = (i) => {
        return this.state.rows[i];
      };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
            //console.log(rows);
            // console.log(updated)
            this.handleAnswerMappingUpdate(rows)
        }

        this.setState({ rows });
    };

    handleAnswerMappingUpdate(userValue) {
        // console.log(userValue);
        let inputNameOrder = []
        for(var i=0; i<userValue.length;i++){
            if(userValue[i]["name"] !== ""){
                inputNameOrder.push(userValue[i]["name"])
            }
        }
        let userAnswerJoined = inputNameOrder.join(",");
        this.props.onValueChange(this.props.cityName, userAnswerJoined);
    }

    cellEditWithOneClick = (ev, { idx, rowIdx }) => {
        //console.log("Cell Clicked")
        this.grid.openCellEditor(rowIdx, idx);
      };

    render(){
        // this.updateInitialRowState();
        return(
            <ReactDataGrid
            ref={ (node) => this.grid = node }
            enableCellSelect={true}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={212}
            minWidth={205}
            // headerRowHeight={1}
            onGridRowsUpdated={this.handleGridRowsUpdated} />
        )
    }
}