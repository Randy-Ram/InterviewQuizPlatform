import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import { makeData } from "./Utils";
import { Grid, Alert, Table, Row, Col, Button  } from 'react-bootstrap';
import { CreateUserModal } from './CreateUserModal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import './DatepickerCssFix.css'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;

    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};

export class UserInfoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true,
      show: false,
      newUserFirstName: '',
      newUserLastName: '',
      newUserRole: '',
      startDate: moment()
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

  }
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleDateChange(date) {
    console.log(date)
    this.setState({
      startDate: date
    });
    // var new_data = this.state.data
    // new_data[index]['TestDate'] = date
    // this.setState({
    //   data: new_data
    // });
  }

  render() {
    const { data, pages, loading } = this.state;
    console.log(this.state.data)
     return (
    <Grid>
        <CreateUserModal showModal={this.state.show} closeModal={this.handleClose} />
        <br/>
        <Row>
            <Col>
                <Button bsStyle="primary" onClick={() => this.handleShow()}>Create User</Button>
            </Col>
        </Row>
        <br/>
        <Row>
            <Col>
            <div>
                <ReactTable
                columns={[
                    {
                        Header: "UserID",
                        accessor: "userID"
                    },
                    {
                        Header: "First Name",
                        accessor: "firstName"
                    },
                    {
                        Header: "Last Name",
                        id: "lastName",
                        accessor: d => d.lastName
                    },
                    {
                        Header: "Role",
                        accessor: "role"
                    },
                    {
                        Header: 'Delete',
                        Cell: (row) => (
                            // <Button bsStyle="danger" onClick={() => this.props.handleDeleteUser(row.original.userID)}>Delete User</Button>
                            <Button bsStyle="danger" onClick={() => console.log(row)}>Delete User</Button>
                        )
                    },
                    {
                        Header: 'Test Date',
                        Cell: (row) => (
                          <DatePicker
                            selected={row.TestDate}
                            onChange={this.handleDateChange}
                            placeholderText="Set date for test"
                          />
                        )
                    }
                ]}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                data={data}
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={this.fetchData} // Request new data when things change
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
                />
            </div>
            </Col>
        </Row>
    </Grid>
 
    );
  }
}