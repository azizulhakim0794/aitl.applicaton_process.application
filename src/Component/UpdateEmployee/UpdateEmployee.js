import axios from './../../axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../CommonComponent/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
const UpdateEmployee = ({ allCountry }) => {

    const [userInputName, setUserInputName] = useState('')
    const [userInputEmail, setUserInputEmail] = useState('')
    const [userInputAge, setUserInputAge] = useState(0)
    const [userInputFaName, setUserInputFaName] = useState('')
    const [userInputCountry, setUserInputCountry] = useState('')
    const [userInputAddress, setUserInputAddress] = useState('')
    const [submitBtnDis, setSubmitBtnDis] = useState(true)
    const [modalErr, setModalErr] = useState('')
    const [modalOpen, setModalOpen] = useState(true)
    const [userData, setUserData] = useState({})
    let { updateEmployId } = useParams();
    const navigate = useNavigate()

    //    console.log(userInputName.length >= 1 && userInputCountry.length >= 1 && userInputAddress.length >= 1 && userInputFaName.length >= 1 && userInputAge.length >= 1 && userInputEmail.length >= 1)
    // E-mail verify function
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    //   user Editable Data Load 
    useEffect(() => {
        axios.get('/employee/' + updateEmployId)
            .then(res => setUserData(res.data))
    }, [updateEmployId])
    useEffect(() => {
       
        if(userData.name && userData.faName && userData.address && userData.age && userData.email && userData.country){
            if ((userData.name.length >= 1 && userData.country.length >= 1 && userData.address.length >= 1 && userData.faName.length >= 1 && userData.age.length >= 1 && userData.email.length >= 1)) {
                setSubmitBtnDis(false)
            }
        }
        else {
            setSubmitBtnDis(true)
        }
        if (userData.name) {
            if (!(userData.name.length < 5)) {
                setModalErr('User Name Need More than 4 characters')
                setModalOpen(true)

            }
        }
        if (userData.name) {
            if (!(userData.name.length < 5)) {
                setModalErr('')
                setModalOpen(false)

            }
        }
        if (userData.faName) {
            if ((userData.faName.length < 5)) {
                setModalErr('User Family Name Need More than 4 characters')
                setModalOpen(true)

            }
        }
        if (userData.address) {
            if ((userData.address.length < 10)) {
                setModalErr('User Address Name Need More than 9 characters')
                setModalOpen(true)

            }
        }
        if (userData.age <= 19) {
            setModalErr('User Age have to 20-60 Years old must.')
            setModalOpen(true)
        }
        if (userData.age > 60) {
            setModalErr('User Age have to 20-60 Years  old must.')
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
        if (!(validateEmail(userData.email ? userData.email : userInputEmail))) {
            setModalErr('User’s E-mail have to a valid must.')
            setModalOpen(true)
        }

    }, [userData.name, userData.faName, userData.age, userData.address, userData.country, userData.email,userInputEmail,userInputCountry])
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
            await axios.put('https://whispering-everglades-47327.herokuapp.com/employee/' + updateEmployId, {
                name: userData.name,
                faName: userData.faName,
                age: userData.age,
                address: userData.address,
                email: userData.email,
                country: userData.country
            })
                .then((res) => {
                    if (res.data) {

                        // console.log(res.data)
                        navigate('/allEmployee')
                    }
                })

        }
    }
    const handleNameChange = e => {
        const updatedName = e.target.value;
        setUserInputName(updatedName);
        const updatedUser = { name: updatedName, faName: userData.faName, email: userData.email, age: userData.age, address: userData.address, country: userData.country };
        setUserData(updatedUser);
    }
    const handleFaNameChange = e => {
        const updatedFaName = e.target.value;
        setUserInputFaName(updatedFaName);
        const updatedUser = { faName: updatedFaName, name: userData.name, email: userData.email, address: userData.address, age: userData.age, country: userData.country };
        setUserData(updatedUser);
    }
    const handleEmailChange = e => {
        const updatedEmailName = e.target.value;
        setUserInputEmail(updatedEmailName)
        const updatedUser = { email: updatedEmailName, faName: userData.faName, name: userData.name, address: userData.address, age: userData.age, country: userData.country };
        setUserData(updatedUser);
    }
    const handleAddressChange = e => {
        const updatedAddressName = e.target.value;
        setUserInputAddress(updatedAddressName)
        const updatedUser = { address: updatedAddressName, email: userData.email, faName: userData.faName, name: userData.name, age: userData.age, country: userData.country };
        setUserData(updatedUser);
    }
    const handleAgeChange = e => {
        const updatedAgeName = e.target.value;
        setUserInputAge(updatedAgeName)
        const updatedUser = { age: updatedAgeName, address: userData.address, email: userData.email, faName: userData.faName, name: userData.name, country: userData.country };
        setUserData(updatedUser);
    }
    const handleCountryChange = e => {
        const updatedCountryName = e.target.value;
        setUserInputCountry(updatedCountryName)
        const updatedUser = { country: updatedCountryName, age: userData.age, address: userData.address, email: userData.email, faName: userData.faName, name: userData.name };
        setUserData(updatedUser);
    }
    return (
        <div>
            <NavBar />
            <div className="container">
            <Fade left>
                <div className="header mt-4">
                    <h3 className="text-center">Update Employee</h3>
                </div>
                <form className="row g-3 mt-4">
                    <div className="col-md-6 col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={userData.name || ""} onChange={handleNameChange} placeholder="john deo" required />
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="form-label">Family Name</label>
                        <input type="text" className="form-control" value={userData.faName || ""} onChange={handleFaNameChange} placeholder="kabi" required />
                    </div>
                    <div className="col-md-12 col-12">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={userData.address || ""} onChange={handleAddressChange} placeholder="Dhaka-1299 Home" required />
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={userData.email || ""} onChange={handleEmailChange} placeholder="name@example.com" required />
                    </div>
                    <div className="col-md-3 col-6">
                        <label className="form-label h5">Country</label>
                        <input type="text" value={userData.country || ""} onChange={handleCountryChange} placeholder="Bangladesh" list="suggestions" className="form-control" required />
                        <datalist id="suggestions">
                            {
                                allCountry.map(country => <option key={country.name} value={country.name} />)
                            }
                        </datalist>
                    </div>
                    <div className="col-md-3 col-6">
                        <label className="form-label">Age</label>
                        <input type="Number" value={userData.age || ""} onChange={handleAgeChange} className="form-control" required />
                    </div>
                    <div className="text-end">
                        <button className="btn btn-success me-2" data-bs-toggle={modalOpen ? "modal" : ""} data-bs-target={modalOpen ? "#exampleModal" : ""} onClick={handleSubmit}>Submit</button>
                        <button className="btn btn-danger me-2 " onClick={() => navigate("/allEmployee", { replace: true })} >Go Back</button>
                    </div>
                </form>
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

export default UpdateEmployee