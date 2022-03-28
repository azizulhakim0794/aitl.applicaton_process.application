import axios from "axios";
const restURL = axios.create({
    baseURL: 'https://whispering-everglades-47327.herokuapp.com'
    // baseURL: 'http://localhost:5002'
})
export default restURL;