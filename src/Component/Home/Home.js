import React from 'react'
import NavBar from '../CommonComponent/NavBar/NavBar'
import Fade from 'react-reveal/Fade';
const Home = () => {
  return (
    <div className="">
      <NavBar />
      <div className="container">
        <Fade left>
          <div className="header mt-4">
            <h3 className="text-center">About This Project</h3>
          </div>
          <main>
            <div className="shadow p-3 border">
            <p className=" m-3">Given all the required information is applied in this Project. To compleat the project I used in frontend <b> Bootstrap, Regex (for email verification),React Router , React Reveal </b> and other <b>technology to validate all the given user information.</b> On the other hand in backend i used <b>Node.Js, MongoDB, Mongoose,</b> To Create Rest api. Both of all these Technology i complete this Project. Please check this out</p>
            <p className="ms-3" ></p>
            <p className=" m-3" ><b>Thanks</b> For visiting.</p>
            </div>
          </main>
        </Fade>
      </div>
    </div>
  )
}

export default Home