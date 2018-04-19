import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

export class Test8TableComponent extends React.Component {
    constructor(props){
        super(props);

        this._columns = [
            {
              key: '#',
              name: '#',
              resizable: false,
              editable: this.props.editable,
              width:50,       
              events: {
                onClick: this.cellEditWithOneClick
              }
            },
            {
              key: 'proverb',
              name: this.props.name,
              resizable: false,
              width:350,
              editable: false
            }
          ];

          this.state = {
              rows: this.createRows()
          }

          this.createRows = this.createRows.bind(this);
          this.rowGetter = this.rowGetter.bind(this);
          this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
          this.cellEditWithOneClick = this.cellEditWithOneClick.bind(this);
    }

    createRows(){
        //console.log("Hello");
        //console.log(this.props.rows)
        let rows = []
        for(var i=0; i < this.props.rows.length; i++){
            rows.push({
                '#':  this.props.rows[i][0],
                'proverb': this.props.rows[i][1]
            })
        }
        //console.log(rows)
        return rows
    }

    rowGetter = (i) => {
        return this.state.rows[i];
      };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        //console.log(arguments)
        let rows = this.state.rows.slice();
        //console.log(fromRow, toRow, updated)
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
            //console.log(rows[i], i)
            this.props.onClick(i, rows[i]['#'])
            // this.handleAnswerMappingUpdate(rows[i]["letter_id"],
            //                                 rows[i]["num1"],
            //                                 rows[i]["num2"],
            //                                 rows[i]["num3"],
            //                                 rows[i]["num4"])
        }

        this.setState({ rows });
    };


    handleAnswerMappingUpdate(letter_id, num1, num2, num3, num4) {
        letter_id = letter_id.replace(/\s/g, "")
        let userInput = num1 + num2 + num3 + num4
        this.props.onValueChange(letter_id, userInput);
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
            rowHeight={40}
            minHeight={500}
            minWidth={400}
            onGridRowsUpdated={this.handleGridRowsUpdated}
            // getCellActions={this.getCellActions}
            />
        )
    }

}