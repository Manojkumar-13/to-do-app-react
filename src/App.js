import React,{useState, useEffect} from 'react'
import { AiFillEdit,AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

const getLocalStorageData = ()=>{
  return localStorage.getItem('groceries')?JSON.parse(localStorage.getItem('groceries')):[];

}

const App = () => {
  const [grocery,setGrocery] = useState({title:'',price:''});
  const [groceries,setGroceries] = useState(getLocalStorageData());
  const [isEditing,setIsEditing] = useState(false);
  const [editId,setEditId] = useState(null)
  const updateGrocery = (id)=>{
  setIsEditing(true);
  const updatedGrocery = groceries.find((grocery)=>grocery.id ===id);
  setGrocery(updatedGrocery);
  setEditId(id)
  }
  const deleteGrocery =(id)=>{
    const remainingGrocery = groceries.filter((grocery)=>grocery.id !==id)
    setGroceries(remainingGrocery);
      }
  const changeHandler = (e) =>{
    const key = e.target.name;
    const value = e.target.value;
    setGrocery({...grocery,[key]:value})
  };
  const submitHandler = (e)=>{
    e.preventDefault();
    if(!grocery.title||!grocery.price){
      alert('All Fields are Mandatory')
    }else if(isEditing){
      let updatedGroceries = groceries.map((item)=>{
      if(item.id === editId){
        return{...item,title:grocery.title,price:grocery.price}
      }else{
        return item;
      }
    })
    setGroceries(updatedGroceries)
    setEditId(null)
    setIsEditing(false)
    setGrocery({title:'',price:''})} else{
      let newGrocery ={...grocery,id:uuidv4()}
      let newGroceries = [...groceries,newGrocery]
      setGroceries(newGroceries);
      localStorage.setItem('groceries',JSON.stringify(newGroceries))
      setGrocery({title:'',price:''})}
    
  }
  useEffect(()=>{
    localStorage.setItem('groceries',JSON.stringify(groceries))
  },[groceries])

  return (
    <>
    <section>
      <h1>Grocery List</h1>
    <form onSubmit={submitHandler}>
      <div className="form-control">
      <label htmlFor="title"> Grocery Title: </label>
      <input 
      type="text"
      id='title'
      name='title'
      placeholder='Grocery Title'
      value={grocery.title}
      onChange={changeHandler}
      />
      </div>
      <div className="form-control">
      <label htmlFor="price"> Grocery Price:  </label>
      <input 
      type="text"
      id='price'
      name='price'
      placeholder='Price'
      value={grocery.price}
      onChange={changeHandler}
      />
      </div>
      <button className='submit'
      type='submit'>{isEditing?'Update':'Add'}</button>
    </form>
    <div className="grocery-list">
    <ul>{groceries.map((item)=>{
      const{id,title,price} = item;
      return(
      <li key={id}>
        <div className="list">
        <h2>{title}</h2>
        <h2>{price}₹</h2>
        </div>
        <button className='icons' onClick={()=>updateGrocery(id)}><AiFillEdit/></button>
        <button className='icons' onClick={()=>deleteGrocery(id)}><AiFillDelete/></button>
        </li> )
    })
  }</ul>
    </div>
    
    </section>
    </>
  )
}

export default App
// input
// add button
// delete button
// CRED
// Create - Entering the task(data)

// Read - Displaying the task in UI

// Update - Update the already read task

// Delete - Remove already read task