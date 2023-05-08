import './App.css';
import EditTodo from './componenets/EditTodo';
import Todo from './componenets/Todo';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
return (

<div className="app">
    
    
 
<BrowserRouter>
  <Routes>
      <Route path="/" element={<Todo/>}/>
      <Route path="/EditTodo" element={<EditTodo />} />
     
  </Routes>
</BrowserRouter>



</div>
  );
}

export default App;
