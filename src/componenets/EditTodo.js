// import React, { useState } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../services/firebase.config";
// import { Link, useNavigate } from "react-router-dom";

// function EditTodo({ todo, id }) {
//   const [todos, setTodos] = useState(todo);
//   const navigate = useNavigate();

//   const updateTodo = async (e) => {
//     e.preventDefault();
//     try {
//       const todoDocument = doc(db, "todo", id);
//       await updateDoc(todoDocument, {
//         todo: todos,
//       });
//       navigate.push("/");
//     } catch (err) {
//       alert(err);
//     }
//   };

//   return (
//     <div className="mb-3" id={`id${id}`}>
//       <label htmlFor={`formGroupExampleInput${id}`} className="form-label">
//         Update Todo
//       </label>
//       <input
//         type="text"
//         className="form-control"
//         id={`formGroupExampleInput${id}`}
//         defaultValue={todo}
//         onChange={(e) => setTodos(e.target.value)}
//       />
//       <button type="button" className="btn btn-primary" onClick={updateTodo}>
//         Update Todo
//       </button>
//       <button className="btn btn-success text-white">
//         <Link to="/">Close</Link>
//       </button>
//     </div>
//   );
// }

// export default EditTodo;
