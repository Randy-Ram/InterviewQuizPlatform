import React from "react";
// import { render } from "react-dom";
import _ from "lodash";
// import { makeData } from "./Utils";
import { Grid, Row, Col, Button  } from 'react-bootstrap';
import { CreateUserModal } from './CreateUserModal';
import { DeleteUserModal } from './DeleteUserModal'
// import DatePicker from 'react-datepicker';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import './DatepickerCssFix.css'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const api_urls = {
  'get_users': 'http://127.0.0.1:5000/api/get_all_users',
  'create_user': 'http://127.0.0.1:5000/api/create_user',
  'delete_user': 'http://127.0.0.1:5000/api/delete_user',
  'edit_user': 'http://127.0.0.1:5000/api/edit_user'
}

// console.log(rawData)
let rawData = ""
function fetchUsers(){
  console.log("Fetching Users")
  fetch(api_urls['get_users'], {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "GET",
    // body: JSON.stringify({userid: this.state.userId, password: this.state.password})
  })
  .then(status)
  .then(response => response.json())
  // .then(data => rawData = data["users"])
  .then(function(data){
    console.log(data)
    rawData = data["users"]
    return Promise.resolve("Done")
  })
  .catch(error => console.log(error))
}

fetchUsers();


function fetchUsersWithCallback(callback, tableState, tableInstance){
  console.log("Fetching Users with Callback")
  console.log(typeof(callback))
  fetch(api_urls["get_users"], {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "GET",
    // body: JSON.stringify({userid: this.state.userId, password: this.state.password})
  })
  .then(status)
  .then(response => response.json())
  // .then(data => rawData = data["users"])
  .then(function(data){
    console.log(data)
    rawData = data["users"]
    callback(tableState, tableInstance)
  })
  .catch(error => console.log(error))
}

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;
    console.log(filteredData);
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

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}


export class UserInfoContainer extends React.Component {
  constructor() {
    super();
    this.editOrNewUser = "new";
    this.tableState = ''
    this.state = {
      data: [],
      pages: null,
      loading: true,
      show: false,
      userid: null,
      newUserFirstName: '',
      newUserLastName: '',
      newUserPassword: '',
      newUserRole: 'Candidate',
      newUserTestDate: moment().format('MM/DD/YYYY'),
      startDate: moment(),
      showDeleteModal: false,
      rowClicked: '',
      username: ''
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNewUserFirstNameChange = this.handleNewUserFirstNameChange.bind(this);
    this.handleNewUserLastNameChange = this.handleNewUserLastNameChange.bind(this);
    this.handleNewUserRoleChange = this.handleNewUserRoleChange.bind(this);
    this.handleNewUserTestDate = this.handleNewUserTestDate.bind(this);
    this.handleNewUserPasswordChange = this.handleNewUserPasswordChange.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }


  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    this.tableState = state
    console.log("Requesting Data")
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
    })
  }


  handleNewUserFirstNameChange(e){
    this.setState({
        newUserFirstName: e.target.value
    })
}

  handleNewUserLastNameChange(e){
  this.setState({
    newUserLastName: e.target.value
  })
}

  handleNewUserPasswordChange(e){
    this.setState({
      newUserPassword: e.target.value
    })
  }

  handleNewUserRoleChange(e){
    this.setState({
      newUserRole: e.target.value
    })
}

handleNewUserTestDate(e){
  this.setState({
    newUserTestDate: e.format()  //momentjs object
  })
}

  saveData(){
    let api = ''
    let req_body = ''
    console.log(this.state.userid)
    if (this.editOrNewUser === "new"){
      api = api_urls["create_user"]
      req_body = {
        firstname: this.state.newUserFirstName, 
        lastname: this.state.newUserLastName,
        password: this.state.newUserPassword,
        role: this.state.newUserRole
      }
    } else {
      api = api_urls["edit_user"]
      req_body = {
        firstname: this.state.newUserFirstName, 
        lastname: this.state.newUserLastName,
        password: this.state.newUserPassword,
        role: this.state.newUserRole,
        userid: this.state.userid
      }
    }

     fetch(api, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(req_body)
    })
    .then(status)
    .then(response => response.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      this.handleClose()
      fetchUsersWithCallback(this.fetchData, this.tableState, this.tableInstance)
    }.bind(this))
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }

  handleClose() {
    this.editOrNewUser = "new"
    this.setState({ 
      show: false,
      newUserFirstName: '',
      newUserLastName: '',
      newUserRole: 'Candidate',
      userid: null,
      newUserTestDate: moment().format('MM/DD/YYYY')
    });
  }

  handleCreateUser(){
    this.editOrNewUser = 'new';
    this.handleShow();
  }

  handleShow() {
    this.setState({ show: true });
  }


  handleDateChange(date) {
    // console.log(date)
    this.setState({
      startDate: date
    });
    // var new_data = this.state.data
    // new_data[index]['TestDate'] = date
    // this.setState({
    //   data: new_data
    // });
  }

  handleEditUser(row){
    this.editOrNewUser = "edit";
    console.log(row.original)
    this.setState({
      newUserFirstName: row.original.firstname,
      newUserLastName: row.original.lastname,
      newUserRole: row.original.role,
      userid: row.original.userid
    }, this.handleShow)
  }


  //************ Delete User Functions *********************/
  closeDeleteModal(){
    this.setState({
      showDeleteModal: false
    })
  }

  showDeleteModal(row){
    let username = row.original.firstname + ' ' + row.original.lastname
    this.setState({
      rowClicked: row,
      showDeleteModal: true,
      username: username
    })
  }

  handleDeleteUser(row, localFetchData, localTableState, localTableInstance){
    console.log("Delete: " + row.original.userid)
    fetch(api_urls["delete_user"], {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
                            "userid": row.original.userid
                          })
    })
    .then(status)
    .then(response => response.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      this.closeDeleteModal()
      console.log(localFetchData)
      fetchUsersWithCallback(localFetchData, localTableState, localTableInstance)
    }.bind(this))
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }

  //**************************************************** */

  render() {
    const { data, pages, loading } = this.state;
    // console.log(this.state.show)
     return (
    <Grid>
        <CreateUserModal showModal={this.state.show} 
                         closeModal={this.handleClose}
                         newUserFirstName={this.state.newUserFirstName}
                         newUserLastName={this.state.newUserLastName}
                         newUserRole={this.state.newUserRole}
                         newUserPassword={this.state.newUserPassword}
                         handleNewUserPasswordChange={this.handleNewUserPasswordChange}
                         handleNewUserFirstNameChange = {this.handleNewUserFirstNameChange}
                         handleNewUserLastNameChange = {this.handleNewUserLastNameChange}
                         handleNewUserRoleChange = {this.handleNewUserRoleChange}
                         handleNewUserTestDate = {this.handleNewUserTestDate}
                         saveData = {this.saveData}
                         isAdmin = {this.state.isAdmin}
        />
        <br/>
        <DeleteUserModal showDeleteModal={this.state.showDeleteModal}
                         closeDeleteModal={this.closeDeleteModal}
                         handleDeleteUser={this.handleDeleteUser}
                         rowClicked={this.state.rowClicked}
                         username={this.state.username}
                         fetchData={this.fetchData.bind(this)}
                         tableState={this.tableState}
                         tableInstance={this.tableInstance}
        />
        <Row>
            <Col>
                <Button bsStyle="primary" onClick={() => this.handleCreateUser()}>Create User</Button>
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
                        accessor: "userid"
                    },
                    {
                        Header: "First Name",
                        accessor: "firstname"
                    },
                    {
                        Header: "Last Name",
                        id: "lastName",
                        accessor: "lastname"
                    },
                    {
                        Header: "Role",
                        accessor: "role"
                    },
                    {
                      Header: "Test Date",
                      accessor: "last_testdate"
                    },
                    {
                        Header: 'Edit User',
                        Cell: (row) => (
                          <Button bsStyle="primary" onClick={() => this.handleEditUser(row)}>Edit User</Button>
                          // <DatePicker
                          //   selected={row.TestDate}
                          //   onChange={this.handleDateChange}
                          //   placeholderText="Set date for test"
                          // />
                        )
                    },
                    {
                      Header: 'Delete',
                      Cell: (row) => (
                          // <Button bsStyle="danger" onClick={() => this.props.handleDeleteUser(row.original.userID)}>Delete User</Button>
                          <Button bsStyle="danger" onClick={() => this.showDeleteModal(row)}>Delete User</Button>
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
                ref={el =>
                  this.tableInstance = el}
                />
            </div>
            </Col>
        </Row>
    </Grid>
 
    );
  }
}