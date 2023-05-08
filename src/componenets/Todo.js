import React from 'react'
import { useState, useEffect } from 'react'
import EditTodo from './EditTodo'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc  } from 'firebase/firestore'
import { db } from '../services/firebase.config'

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
    const getTodo = async () => {
      await getDocs(collectionRef).then((todo) => {
        let todoData = todo.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        setTodo(todoData)
        }).catch((err) => {
          console.log(err);
        })
      }
    getTodo()
    }, [])

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

  return (
   
    <>
 <div className="container">
  <div className="row">
    <div className="col-md-12">
      <div className="card card-white">
        <div className="card-body">
          <button
            data-bs-toggle="modal"
            data-bs-target="#addModal"
            type="button"
            className="btn btn-info">Add Todo
          </button>


    {/* <div className="todo-list">
      <div className="todo-item">
        <hr />
        <span>
          <div className="checker" >
            <span className="" >
              <input
                type="checkbox"
              />
            </span>
          </div>
          &nbsp; Go hard or Go Home<br />
          <i>10/11/2022</i>
        </span>
        <span className=" float-end mx-3">
          <EditTodo /></span>
        <button
          type="button"
          className="btn btn-danger float-end">Delete
        </button>
              </div>
            </div> */}

{todos.map(({ todo, id }) =>
  <div className="todo-list" key={id}>
    <div className="todo-item">
      <hr />
      <span>
        <div className="checker" >
          <span className="" >
            <input
              type="checkbox"
            />
          </span>
        </div>
        &nbsp;{todo}<br />
        <i>10/11/2022</i>
      </span>
      <span className=" float-end mx-3">
        <EditTodo /></span>
    <button
      type="button"
      className="btn btn-danger float-end"
      onClick={() => deleteTodo(id)}
      >Delete
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
   className="modal fade"
   id="addModal"
   tabIndex="-1"
   aria-labelledby="addModalLabel"
   aria-hidden="true">
  <div className="modal-dialog">
  <form className="d-flex" onSubmit={submitTodo}>
    <div className="modal-content">
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
      className="form-control"
      placeholder="Add a Todo"
      onChange={(e) => setCreateTodo(e.target.value)}

    />
  </div>
  <div className="modal-footer">
  <button
    className="btn btn-secondary"
    data-bs-dismiss="modal">Close
  </button>

  <button className="btn btn-primary"
  
  >Create Todo</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</>

  )
}

export default Todo