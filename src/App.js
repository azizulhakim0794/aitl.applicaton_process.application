import axios from 'axios';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './Component/CommonComponent/Loading/Loading';
const Home = lazy(()=> import('./Component/Home/Home'))
const AddEmployee = lazy(()=> import('./Component/AddEmployee/AddEmployee'))
const AllEmployee = lazy(()=> import('./Component/AllEmployee/AllEmployee'))
const UpdateEmployee = lazy(()=> import('./Component/UpdateEmployee/UpdateEmployee'))
const NotFound = lazy(()=> import('./Component/CommonComponent/NotFound/NotFound'))

function App() {
  const [allCountry, setAllCountry] = useState([])
   // Load all Country
   useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
        .then(res => setAllCountry(res.data))
}, [])
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound/>}/>
        <Route path="/addEmployee" element={<AddEmployee allCountry={allCountry}/>}/>
        <Route path="/allEmployee" element={<AllEmployee/>}/>
        <Route path="/updateEmployee/:updateEmployId" element={<UpdateEmployee allCountry={allCountry}/>}/>
      </Routes>
      </Suspense>
  );
}

export default App;
