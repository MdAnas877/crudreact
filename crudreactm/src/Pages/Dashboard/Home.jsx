import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Nav/NavBar'
import Sidebar from '../../components/SideBar/SideBar'
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import './style.css';

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [popUp,setPopUp] = useState(false)
  const student = {
    firstname: '',
    lastname : '',
    email    : '',
    password : ''
  }
  const[myData,setMyData] = useState(student);


  useEffect(() => {
    axios.get('https://66a49bd55dc27a3c19095649.mockapi.io/student')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })

  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  // const findVal = data.filter((val) => {
  //   return (
  //     val.firstname.toLowerCase().includes(search.toLowerCase()) ||
  //     val.lastname.toLowerCase().includes(search.toLocaleLowerCase()) ||
  //     val.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
  //     val.password.toLowerCase().includes(search.toLocaleLowerCase())
  //   )
  // })

  

  const inputChange = (e)=>{
    setMyData({...myData,[e.target.name]:e.target.value})
  }
 
const handleSubmit = (e) =>{
  e.preventDefault()
  axios.post('https://66a49bd55dc27a3c19095649.mockapi.io/student',myData)
 .then((res)=>{
    // setData([...data, res.data])
    setData([...data,myData])

    // console.log(...data);
    // console.log(res.data);
    // console.log(myData); 
    // setPopUp(false)
    // setMyData('')
 })
}

const handleDelete = (id)=>{
  console.log(id);
}
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <Sidebar />
          </div>
          <div className="col py-3">
            <input type='text' placeholder='Search....' style={{
              marginBottom: '17px'
            }} onChange={handleChange} />
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    findVal.length > 0 ? (
                      findVal.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{val.firstname}</td>
                            <td>{val.lastname}</td>
                            <td>{val.email}</td>
                            <td>{val.password}</td>
                            <td>
                              <button> Edit </button>
                              <button onClick={()=>handleDelete(val.id)}>Delete</button> 
                            </td>
                          </tr>
                        )
                      }))
                      : (
                        <tr> <td colSpan='4'> <h1
                          style={{
                            textAlign: 'center'
                          }}
                        > Data Not Found </h1></td></tr>
                      )
                  }
                </tbody>
              </table>
            </div>
            <select name="" id="">
              <option value="">Select First Name</option>
              {
                data.map((val) => {
                  return (
                    <option>{val.firstname}</option>
                  )
                })
              }
            </select>
            <div>
            <button
               style={{
                marginTop : '10px'
               }}
               onClick={()=>setPopUp(!popUp)}
            >Click Button 
            </button>

{
 popUp && (
              <form action=""
                style={{
                  marginTop: '15px'
                }}
                onSubmit={handleSubmit}
              >
                <label htmlFor="">First Name:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                 type="text"
                 name='firstname' 
                 value={myData.firstname}
                 onChange={inputChange}
                 /> 
                 <br /> <br />
                <label htmlFor="">Last Name:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input 
                type="text"
                name='lastname'
                value={myData.lastname}
                onChange={inputChange}

                /> <br /> <br />
                <label htmlFor="">Email:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input 
                type="email" 
                name='email'
                value={myData.email}
                onChange={inputChange}
                /> <br /><br />
                <label>Password:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input 
                type="password" 
                name='password'
                 value={myData.password}
                 onChange={inputChange}
                /> <br /><br />
                <input type="Submit" />
              </form>
              )

}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home