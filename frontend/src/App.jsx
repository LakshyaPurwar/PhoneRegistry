import List from "./Components/List/List";
import './App.css';
import ModalForm from "./Components/ModalForm/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "./store/modalSlice";

function App() {

  const dispatch = useDispatch();
  const users = useSelector((state)=>{return state.user.users});


  const showModal = ()=>{
    dispatch(modalAction.show('add'));
  }
  return (
    <div className="app">
      <ModalForm></ModalForm>
      <section className="addUser">
        <button className="btn" onClick={showModal}>Add User</button>
      </section>
      <section className="users">
          <List list={users}></List>
      </section>
    </div>
  );
}

export default App;
