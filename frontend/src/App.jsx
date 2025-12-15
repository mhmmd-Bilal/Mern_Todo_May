import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/HomePage";
import { ToastContainer } from "react-toastify";
import EditTodoPage from "./screens/EditTodoPage";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditTodoPage/>}/>
      </Routes>
    </>
  );
}

export default App;
