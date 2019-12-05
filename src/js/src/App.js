import React, { Component } from 'react';
import Container from './Container';
import './App.css';
import Footer from './Footer.js';
import { getAllStudents } from './client';
import AddStudentForm from './forms/addStudentForm'
import { 
  Table, Avatar, Spin, Icon, Modal, Empty
} from 'antd';
import { errorNotification } from './Notification';


const getIndicatorIcon = () =>  <Icon type="loading" style={{ fontSize: 24 }} spin />;

class App extends Component{

  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible:false
  }
  componentDidMount(){
    this.fetchStudents();
  }

  openAddStudentModal = ()=> this.setState({isAddStudentModalVisible: true});

  closeAddStudentModal = ()=> this.setState({isAddStudentModalVisible: false})

  fetchStudents = () => {
    this.setState({
      isFetching:true
    });
    getAllStudents()
    .then(res => res.json()
    .then(students => {
      console.log(students);
      this.setState({
        students,
        isFetching:false
      })
    })).catch(error => {
      const message = (error.error.message);
      const description = error.error.error;
      errorNotification(message, description);
      this.setState({
        isFetching: false
      });
    });
  }

  render(){
    

    const { students , isFetching, isAddStudentModalVisible } = this.state;
    
    const commonElements = () => (
      <div>
        <Modal 
          title = "Add New Student"
          visible = {isAddStudentModalVisible}
          onOk ={this.closeAddStudentModal}
          onCancel = {this.closeAddStudentModal}
          width = {1000}>
           
            <AddStudentForm 
              onSuccess = {() => {this.closeAddStudentModal(); 
              this.fetchStudents();
            }}
              onFailure = {(error) => {
                const message = error.error.message;
                const description = error.error.httpStatus;

               
                errorNotification(message, description);
              }}
            />

        

        </Modal>
        <Footer numberOfStudents = {students.length} handleAddStudentClickEvent = {this.openAddStudentModal}/>

      </div>


    )


    if(isFetching){
      return (
        <Container>
          <Spin indicator={getIndicatorIcon}/>
        </Container>
      );
    }

    

   if(students && students.length ){

   
    
    const columns = [
      {
        title: '',
        key:'avatar',
        //touse custom component, use render
        render: (text ,student) =>(
          <Avatar size ='large'>
            {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
          </Avatar>
        )
      },
      {
        title: 'Student ID',
        dataIndex: 'studentId',
        key:'studentId'
      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key:'firstName'
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key:'lastName'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key:'email'
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key:'gender'
      }

    ];
     
    return (
      <Container>
        <Table 
          style ={{marginBottom: '100px'}}
          dataSource = {students} 
          columns = {columns} 
          pagination = {false}
          rowKey = 'studentId' />
        {commonElements()}
      </Container>
    )
   }

    return (
    <Container>
      <Empty description={
        <h1>No Students Found</h1>
      }/>
      {commonElements()}
    </Container>
  )
 
   
}}

export default App;
