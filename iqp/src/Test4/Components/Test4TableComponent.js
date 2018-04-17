import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

export class Test4TableComponent extends React.Component {
    constructor(props){
        super(props);

        this._columns = [
            {
              key: 'letter_id',
              name: '',
              width: 100
            },
            {
              key: 'num1',
              name: '',
              editable: true
            },
            {
              key: 'num2',
              name: '',
              editable: true
            },
            {
              key: 'num3',
              name: '',
              editable: true
            },
            {
              key: 'num4',
              name: '',
              editable: true
            }
          ];

          this.state = {
              rows: this.createRows()
          }

          this.createRows = this.createRows.bind(this);
          this.rowGetter = this.rowGetter.bind(this);
          this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
    }

    createRows(){
        //console.log("Hello");
        //console.log(this.props.rows)
        let rows = []
        for(var i=0; i < this.props.rows.length; i++){
            rows.push({
                letter_id:  this.props.rows[i],
                num1: i === 0 ? '1' : i === 1 ? '2' : '',
                num2: i === 0 ? '9' : i === 1 ? '0' : '',
                num3: i === 0 ? '2' : i === 1 ? '7' : '',
                num4: i === 0 ? '5' : i === 1 ? '4' : '',
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
            // console.log(rows[i])
            this.handleAnswerMappingUpdate(rows[i]["letter_id"],
                                            rows[i]["num1"],
                                            rows[i]["num2"],
                                            rows[i]["num3"],
                                            rows[i]["num4"])
        }

        this.setState({ rows });
    };

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
            minHeight={1300}
            minWidth={500}
            headerRowHeight={1}
            onGridRowsUpdated={this.handleGridRowsUpdated} />
        )
    }
}