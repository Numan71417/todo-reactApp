import React from 'react'
import { useState, useEffect } from 'react'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, 
  // runTransaction,
   orderBy, query   } from 'firebase/firestore'
import { db } from '../services/firebase.config'

// import { Link } from 'react-router-dom'


function Todo() {

    const collectionRef = collection(db, 'todo');
    const [createTodo, setCreateTodo] = useState("")

  // yahan se firebase ko data bhejna hai
    const submitTodo = async (e) => {
      e.preventDefault();
    
      try {
        await addDoc(collectionRef, {
          todo: createTodo,
          isChecked: false,
          timestamp: serverTimestamp()
        })
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }

    //yahan se data db se aayega
  const [todos, setTodo] = useState([])
    
  useEffect(() => {
    const q = query(collectionRef, orderBy('timestamp'))
    // await 
        getDocs(q).then((todo) =>{
        let todoData = todo.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setTodo(todoData)
        }).catch((err) => {
          console.log(err);
        })
      }

    
    , [])
  


  //Delete Handler
  const deleteTodo = async (id) => {
    try {
       window.confirm("Are you sure you want to delete this Todo?")
       const documentRef = doc(db, "todo", id);
       await deleteDoc(documentRef)
       window.location.reload();
       } catch (err) {
       console.log(err);
     }
   }


   //check empty
   

  return (
   
    <>
    
 <div className="container ">
          <h1 className='todo-head'>My todo App</h1>
  <div className="row ">
    <div className="col-md-12">
      <div className="card card-white translucent  ">
        <div className="card-body">
          <button
            data-bs-toggle="modal"
            data-bs-target="#addModal"
            type="button"
            className="btn  text-light">
             <img className="rotate" alt="img" src="https://img.icons8.com/fluency/48/null/plus-2-math.png"/>
          </button>


   

{todos.map(({ todo, id, isChecked, timestamp }) =>
  <div className="todo-list" key={id}>
    <div className="todo-item">
      <hr />
      <span>
        {/* <div className="checker" >
          <span className="" >
            <input
              type="checkbox"
            />
          </span>
        </div> */}
        <h5>&nbsp;{todo}</h5>
        
        <br/>
        
        <i>Added at:&nbsp; {new Date(timestamp.seconds * 1000).toLocaleString()}</i>
        
      </span>

      {/* <span className=" float-end mx-3">
      
        <Link to="/EditTodo">Edit todo</Link>
        </span> */}

    <button
      type="button"
      className="btn  float-end zoom"
      onClick={() => deleteTodo(id)}
      >
       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2WvU6EQBSF73vYGgv3BSwYxVJLzRaa8AZKZ6Uka2GyT2CjjaUxvpTbauI2CxLgGEbRLMKwBIYZN/ckp2KK8839YYhYLBarEARNIAgNntI/Dg8jEPD3D+G7M/guBvIMZ7sHPQIMGh7S5+5LnwAwYWKAkloMaSeTLjGA4Ap0E7eQ4BbqprVvoczbRh9nyARAchcgjkKk16e1Z9KrY8ThAsnDjV0ASR4+jr9cA1GEL86pIGhIgMwbLQWTDhdIg/Fv+GBceSbzRuYBZMDLo78BvytRvvmfb5MTOyqghohk2DbhYXILVUK0DA/Tr1EJUb713B/RSuFhHCDv+ToAxYqFDQCVA1sx2FYCpJXbpmaIGyBoaADVqlStWNgAsB4/stuLxlVZrkR6H9hRgSWIhj1fQKjCg5/TCq2yw/sw6RIDCK5AN0HQXHsbOfSuD8Ch5wHm4EknwBYcetUY/g17tKkNQELs0AYceuy5neb5zWsPz2KxyDp9AneQb6NeRCEPAAAAAElFTkSuQmCC"></img>
    </button>
    </div>
  </div>
)}       
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Modal */}
  <div
   className="modal fade "
   id="addModal"
   tabIndex="-1"
   aria-labelledby="addModalLabel"
   aria-hidden="true">
  <div className="modal-dialog ">
  <form className="d-flex " onSubmit={submitTodo}>
    <div className="modal-content translucent-modal">
      <div className="modal-header">
  <h5
   className="modal-title"
   id="addModalLabel">
   Add Todo
  </h5>
  <button
     type="button"
     className="btn-close"
     data-bs-dismiss="modal"
     aria-label="Close">
  </button>
  </div>
  <div className="modal-body">
    <input
      type="text"
      className="form-control translucent-modal"
      placeholder="Add a Todo"
      onChange={(e) => setCreateTodo(e.target.value)}
    />
  </div>
  <div className="modal-footer">
    {/* add button */}
  <button
    className="btn "
    data-bs-dismiss="modal"
    ><img className='zoom' alt="img"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7ElEQVR4nO2Z3UrDMBTH81Amft01012oCOKt+BAqKA4miCJ44Y0PIIj4id6IdzrfwyFDbzargjYbrZVFWtexuXY2TZN0kD+cu5X9fzkn56QNAFpaWlqZVh2jWWKge8tAhGBEZYTl/ZcBS3VjaIbLvIXRjizTJAoGw63kK6/YPGkHnGYG8MomQwB37AAYWhkC+EwAoNo06goNQKJWJz9GSW54QDOQH6ffN9fUPT1ihrALK36oA2iZp+a7HywQ9voSpVWT0tortTfW1AC4Z8dt80F8HR78C9E2HzxXiweROkBjYY42H8o9EP0y0WPebAEUV9XsARYIHvNEZBuNA8FrnoieA/0g7MIyt3kiY5BFQdCXN27zRNYkjoTgNE9kHiV8iMpTaCbsYryeT1QC+Bu29qfmgz1xwj6xiUyA0G6TEgQQDRDVKpuV51QggEiAfn0+ssUyQgBRAHGGVBoQQAQAy4TlhQBpAyQ5HjQW52mz/Bh+isWSAdyri24jVTPWC0pYJpz9PQUlNDFC3cvzRBO2E8KJYV7cJp4c9TPB8mrYWU7O7nbs34sBkBhAA+CBywDMzqdFA36wAxiwpNw4DgLeMgN4lwvqjaPfyKEpkETe5YJq85aBNgGPvMsF7/u83D0BLa9sEq+8lpaWFpClH85QF54vuUIVAAAAAElFTkSuQmCC"/>
    
  </button>
{/* close button */}
  <button className="btn " >
   <img alt="img" className='zoom' src="https://img.icons8.com/fluency/48/null/plus-2-math.png"/>
  </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</>

  )
}

export default Todo
