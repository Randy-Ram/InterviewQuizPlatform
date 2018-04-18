import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

export class Test6TableComponent extends React.Component {
    constructor(props){
        super(props);

        this._columns = [
            {
              key: 'amt_insurance',
              name: 'Amount of Insurance',
              resizable: true,
              width:150
            },
            {
              key: 'kind_insurance',
              name: 'Kind of Insurance',
              resizable: true,
              width:150
            },
            {
              key: 'date',
              name: 'Date',
              resizable: true,
              width:150
            },
            {
              key: '1',
              name: '1',
            //   editable: true,
              resizable: true,
              events: {
                onClick: this.handleCellSelected
              },
              width:100
            },
            {
              key: '2',
              name: '2',
            //   editable: true,
              resizable: true,
              events: {
                onClick: this.handleCellSelected
              },
              width:100
            },
            {
              key: '3',
              name: '3',
            //   editable: true,
              resizable: true,
              events: {
                onClick: this.handleCellSelected
              },
              width:100
            }
          ];

          this.state = {
              rows: this.createRows()
          }

          this.createRows = this.createRows.bind(this);
          this.rowGetter = this.rowGetter.bind(this);
          this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
          this.handleCellSelected = this.handleCellSelected.bind(this);
        //   this.getCellActions = this.getCellActions.bind(this);
    }

    createRows(){
        //console.log("Hello");
        //console.log(this.props.rows)
        let rows = []
        for(var i=0; i < this.props.rows.length; i++){
            rows.push({
                amt_insurance:  this.props.rows[i][0],
                kind_insurance: this.props.rows[i][1],
                date: this.props.rows[i][2]
            })
        }
        //console.log(rows)
        return rows
    }

    rowGetter = (i) => {
        return this.state.rows[i];
      };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        console.log(arguments)
        let rows = this.state.rows.slice();
        console.log(fromRow, toRow, updated)
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
            // console.log(rows[i])
            // this.handleAnswerMappingUpdate(rows[i]["letter_id"],
            //                                 rows[i]["num1"],
            //                                 rows[i]["num2"],
            //                                 rows[i]["num3"],
            //                                 rows[i]["num4"])
        }

        this.setState({ rows });
    };

    handleCellSelected = (ev, { idx, rowIdx }) => {
        // console.log(idx, rowIdx);
        // console.log(this.state.rows)
        let newRows = this.state.rows;
        switch(idx){
        case 3:
            newRows[rowIdx]["1"] = newRows[rowIdx]["1"] === '✅' ? '' : '✅';
            this.setState({
                rows: newRows
            })
            break;
        case 4:
            newRows[rowIdx]["2"] = newRows[rowIdx]["2"] === '✅' ? '' : '✅';
            this.setState({
                rows: newRows
            })
            break;
        case 5:
            newRows[rowIdx]["3"] = newRows[rowIdx]["3"] === '✅' ? '' : '✅';
            this.setState({
                rows: newRows
            })
            break;
        default:
            
        }
        this.props.onCellClick(rowIdx, idx)
        //console.log(this.state.rows)
        //this.handleGridRowsUpdated({rowIdx, rowIdx, "Hello"})
    }

    handleAnswerMappingUpdate(letter_id, num1, num2, num3, num4) {
        letter_id = letter_id.replace(/\s/g, "")
        let userInput = num1 + num2 + num3 + num4
        this.props.onValueChange(letter_id, userInput);
    }


    render(){
        // this.updateInitialRowState();
        return(
            <ReactDataGrid
            enableCellSelect={true}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={950}
            minWidth={751}
            onGridRowsUpdated={this.handleGridRowsUpdated}
            // getCellActions={this.getCellActions}
            />
        )
    }
}