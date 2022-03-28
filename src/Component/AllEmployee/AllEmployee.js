import axios from './../../axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../CommonComponent/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
const AllEmployee = () => {

  const [allEmployees, setAllEmployees] = useState([])
  const [deleteEmployeeId, setDeleteEmployeeId] = useState('')
  const [employees, seEmployees] = useState({})
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const navigate = useNavigate()
  // Load all Employee
  useEffect(() => {
    axios.get('/employee')
      .then(res => setAllEmployees(res.data))
  }, [deleteSuccess])
  // Open Modal function
  const handleDeleteModal = (id) => {
    setDeleteEmployeeId(id)
  }
  const handleDeleteEmployee = async (deleteId) => {
    await axios.delete('/employee/' + deleteId)
      .then(res => {
        if (res.status === 200) {
          setDeleteSuccess(true)
          document.getElementById(`employee${deleteId}`).style.display = 'none';
        }
      })
    setDeleteSuccess(false)
  }
  // get a single employee Data for Modal
  useEffect(() => {
    axios.get('/employee/' + deleteEmployeeId)
      .then(res => seEmployees(res.data))
  }, [deleteEmployeeId])
  const handleUpdateEmployee = (updateId) => {
    setDeleteEmployeeId(updateId)
  }
  const handleGoUpdate = (updateId) => {
    navigate("/updateEmployee/" + updateId)
  }
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="header mt-4">
          <h3 className="text-center">All Employee</h3>
        </div>
        <main>
          {allEmployees.length ? <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {
                allEmployees.map((data, index) => {
                  const { name, address, _id } = data;
                  return (
                    <Fade id={`employee${_id}`} key={_id} bottom>
                      <tr >
                        <th scope="row" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">{index + 1}</th>
                        <td>{name}</td>
                        <td>{address}</td>
                        <td><div><div className="col-md-5 m-auto"><button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleUpdateEmployee(_id)}>update</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteModal(_id)} data-bs-toggle="modal" data-bs-target="#deleteModal">delete</button></div></div></td>
                      </tr>
                    </Fade>
                  )
                })
              }
            </tbody>
          </table> :
            <div className="text-center text-muted">
              <br />
              <br />
              <br />
              <br />
              <h3>NO EMPLOYEE FOUND !!!</h3>
            </div>}
        </main>
        {/*Update Modal Start */}
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateModalLabel">Update employee</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className=""> Are you sure you want to Update <b>{employees.name}’s</b> Profile?</p>
                <p className=""> Country :  <b>{employees.country}</b> </p>
                <p className=""> Family Name :  <b>{employees.faName}</b> </p>
                <p className=""> Age : <b>{employees.age} years old</b> </p>
                <p className=""> Hired : <b>{employees.hired ? "True" : "False"} </b> </p>
                <p className=""> E-mail : <b>{employees.email}</b> </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" onClick={() => handleGoUpdate(employees._id)} data-bs-dismiss="modal">Update</button>
              </div>
            </div>
          </div>
        </div>
        {/*Update Modal Finish */}

        {/*Delete Modal Start */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Delete employee</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className=""> Are you sure you want to delete  <b>{employees.name}</b> ?</p>
                <p className=""> Country :  <b>{employees.country}</b> </p>
                <p className=""> Family Name :  <b>{employees.faName}</b> </p>
                <p className=""> Age : <b>{employees.age} years old</b> </p>
                <p className=""> Hired : <b>{employees.hired} </b> </p>
                <p className=""> E-mail : <b>{employees.email}</b> </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteEmployee(employees._id)} data-bs-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
        {/*Delete Modal Finish */}
      </div>
    </div>
  )
}

export default AllEmployee