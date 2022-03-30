import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../CommonComponent/NavBar/NavBar'
import { useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
const AddEmployee = ({ allCountry }) => {

    const [userInputName, setUserInputName] = useState('')
    const [userInputEmail, setUserInputEmail] = useState('')
    const [userInputHired, setUserInputHired] = useState("")
    const [userInputAge, setUserInputAge] = useState(0)
    const [userInputFaName, setUserInputFaName] = useState('')
    const [userInputCountry, setUserInputCountry] = useState('')
    const [userInputAddress, setUserInputAddress] = useState('')
    const [resetBtn, setResetBtn] = useState(true)
    const [submitBtnDis, setSubmitBtnDis] = useState(true)
    const [modalErr, setModalErr] = useState('')
    const [modalOpen, setModalOpen] = useState(true)
    const navigate = useNavigate()
    const handleReset = () => {
        setUserInputName('')
        setUserInputEmail('')
        setUserInputAge(0)
        setUserInputCountry('')
        setUserInputFaName('')
        setUserInputAddress('')
        setUserInputHired("")
    }
    // E-mail verify function
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    // All Condition is rendering by the dependency.
    useEffect(() => {
        if ((userInputName.length >= 1 || userInputCountry.length >= 1 || userInputAddress.length >= 1 || userInputFaName.length >= 1 || userInputAge.length >= 1 || userInputEmail.length >= 1 || userInputHired === true)) {
            setResetBtn(false)
        }
        else {
            setResetBtn(true)

        }
        if ((userInputName.length >= 1 && userInputCountry.length >= 1 && userInputAddress.length >= 1 && userInputFaName.length >= 1 && userInputAge.length >= 1 && userInputEmail.length >= 1 && userInputHired )) {
            setSubmitBtnDis(false)
        }
        else {
            setSubmitBtnDis(true)
        }
        if ((userInputName.length < 5)) {
            setModalErr('User Name Need More than 4 characters')
            setModalOpen(true)
        }
        if (!(userInputName.length < 5)) {
            setModalErr('')
            setModalOpen(false)
        }
        if ((userInputFaName.length < 5)) {
            setModalErr('User Family Name Need More than 4 characters')
            setModalOpen(true)
        }
        if ((userInputAddress.length < 10)) {
            setModalErr('User Address Name Need More than 9 characters')
            setModalOpen(true)

        }
        if (userInputAge <= 19) {
            setModalErr('User Age have to 20-60 Years old must.')
            setModalOpen(true)
        }
        if (userInputAge > 60) {
            setModalErr('User Age have to 20-60 Years  old must.')
            setModalOpen(true)
        }
        // if (userInputHired === false) {
        //     setModalErr('Hired is must True.')
        //     setModalOpen(true)
        // }
        if (userInputHired === "false") {
            setModalErr('Hired is must True.')
            setModalOpen(true)
        }
        if (userInputHired.toLowerCase() !== "true") {
            setModalErr('Hired is must true.')
            setModalOpen(true)
        }
        if (userInputCountry.length) {
            axios.get(`https://restcountries.com/v2/name/${userInputCountry}`)
                .then(res => {
                    if (res.data === userInputCountry) {
                        setModalOpen(false)
                        console.log(res.data)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        setModalErr('User’s Country have to a valid country must.')
                        setModalOpen(true)
                    }
                });

        }
        if (!(validateEmail(userInputEmail))) {
            setModalErr('User’s E-mail have to a valid must.')
            setModalOpen(true)
        }
        // console.log(userInputHired)
    }, [userInputName, userInputCountry, userInputAge, userInputAddress, userInputFaName, userInputEmail,userInputHired])
    useEffect(() => {
        if (userInputCountry.length) {
            axios.get(`https://restcountries.com/v2/name/${userInputCountry}`)
                .then(res => {
                    if (res.data === userInputCountry) {
                        setModalOpen(false)
                        console.log(res.data)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        setModalErr('User’s Country have to a valid country must.')
                        setModalOpen(true)
                    }
                });

        }
    }, [userInputCountry])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (modalErr.length < 1) {
            await axios.post('https://whispering-everglades-47327.herokuapp.com/employee', {
                name: userInputName,
                faName: userInputFaName,
                age: userInputAge,
                address: userInputAddress,
                email: userInputEmail,
                country: userInputCountry,
                hired: userInputHired,
            })
                .then((res) => {
                    if (res.data) {
                        navigate('/allEmployee')
                    }
                })
        }
    }


    return (
        <div>
            <NavBar />
            <div className="container">
            <Fade left>
            {/* <Fade bottom> */}
                <div className="header mt-4">
                    <h3 className="text-center">Add Employee</h3>
                </div>
                <form className="row g-3 mt-4">
                    <div className="col-md-6 col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={userInputName} onChange={(e) => setUserInputName(e.target.value)} placeholder="john deo" required />
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="form-label">Family Name</label>
                        <input type="text" className="form-control" value={userInputFaName} onChange={(e) => setUserInputFaName(e.target.value)} placeholder="kabi" required />
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={userInputAddress} onChange={(e) => setUserInputAddress(e.target.value)} placeholder="Dhaka-1299 Home" required />
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={userInputEmail} onChange={(e) => setUserInputEmail(e.target.value)} placeholder="name@example.com" required />
                    </div>
                    <div className="col-md-4 col-6">
                        <label className="form-label h5">Hired</label>
                        <input type="text" value={userInputHired} onChange={(e) => setUserInputHired(e.target.value.toLowerCase())} placeholder="True" list="hired" className="form-control" required />
                        <datalist id="hired">
                            <option value={true} />
                            <option value={false} />
                        </datalist>
                    </div>
                    <div className="col-md-4 col-12">
                        <label className="form-label h5">Country</label>
                        <input type="text" value={userInputCountry} onChange={(e) => setUserInputCountry(e.target.value)} placeholder="Bangladesh" list="suggestions" className="form-control" required />
                        <datalist id="suggestions">
                            {
                                allCountry.map(country => <option key={country.name} value={country.name} />)
                            }
                        </datalist>
                    </div>
                    <div className="col-md-4 col-6">
                        <label className="form-label">Age</label>
                        <input type="Number" value={userInputAge} onChange={(e) => setUserInputAge(e.target.value)} className="form-control" required />
                    </div>
                    <div className="text-end">
                        <button className={submitBtnDis ? "btn btn-success me-2 disabled" : "btn btn-success me-2"} data-bs-toggle={modalOpen ? "modal" : ""} data-bs-target={modalOpen ? "#exampleModal" : ""} onClick={handleSubmit}>Submit</button>
                        <button className={resetBtn ? "btn btn-danger me-2 disabled" : "btn btn-danger me-2"} onClick={handleReset} >Reset</button>
                    </div>
                </form>
                <br />
                {/*Modal Start */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Error Find</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h6>Please fix the following error.</h6>
                                <p className="text-danger">{modalErr}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Modal Finish */}
                </Fade>
            </div>
            
        </div>
    )
}

export default AddEmployee