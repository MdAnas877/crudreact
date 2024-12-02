import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const[data,setData] = useState([])
  const obj = {
    name : '',
    email : ''
  }
  const [formData,setFormData] = useState(obj)
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{
      axios.get('https://66a49bd55dc27a3c19095649.mockapi.io/student/1/crud')
      .then((res)=>{
        console.log(res.data);   
        setData(res.data)
      })
  },[])

  const handleInputChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing record
      axios
        .put(
          `https://66a49bd55dc27a3c19095649.mockapi.io/student/1/crud/${editingId}`,
          formData
        )
        .then((res) => {
          const updatedData = data.map((item) =>
            item.id === editingId ? res.data : item
          );
          setData(updatedData);
          setFormData(obj);
          setEditingId(null); // Reset editing state
        })
        .catch(() => {
          console.log("Error in update");
        });
    } else {
      // Add new record
      axios
        .post("https://66a49bd55dc27a3c19095649.mockapi.io/student/1/crud", formData)
        .then((res) => {
          setData([...data, res.data]);
          setFormData(obj);
        })
        .catch(() => {
          console.log("Error in post");
        });
    }
  };
const handleDelete = (id)=>{
  let getId = id.id
   axios.delete(`https://66a49bd55dc27a3c19095649.mockapi.io/student/1/crud/${getId}`)

  let getData = data.filter((item)=>{
    return item.id !== getId
  })
  setData(getData)
}

const handleEdit = ((obj)=>{
//  let getId  = id.id
 
//  let getData = data.find((val)=>{
//    return val.id === getId
//   })
setFormData(obj)
setEditingId(obj.id)
})
  return (
    <>
    {
      data.map((val,index)=>{
         return(
          
             <tr key={index}>
              <td>{index+1}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>
                <button onClick={()=>handleEdit(val)}>Edit</button>
                <button onClick={()=>handleDelete(val)}>Delete</button>
              </td>
             </tr>
        
         )
      })
    }
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Name</label>
      <input
       type="text"
       name='name'
       value={formData.name}
       onChange={handleInputChange}
       />

<label htmlFor="">Email</label>
      <input
       type="text"
       name='email'
       value={formData.email}
       onChange={handleInputChange}
       />
       <input type="submit" />
    </form>
     
    </>
  )
}

export default App