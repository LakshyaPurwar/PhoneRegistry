import List from "./Components/List/List";
import './App.css';
import ModalForm from "./Components/ModalForm/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "./store/modalSlice";
import { userActions } from "./store/userSlice";
import { useEffect, useState } from "react";
import { useCallback } from "react";

function App() {

  const dispatch = useDispatch();
  const users = useSelector((state) => { return state.user.users });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText , setSearchText] = useState(null);
  const [searchResults , setSearchResults] = useState([]);
  const [searchTimeOutState , setSearchTimeOutState ] = useState(null);


  const handleSearch = (event)=>{
    setSearchText(event.target.value);
    const text = event.target.value;//Because the state variable wont be instantly updated
    clearTimeout(searchTimeOutState);
    const searchTimeOut = setTimeout(()=>{
      const results = users.filter((user)=>{
        return user.name.toLowerCase().includes(text.toLowerCase() ) || String(user.phone).includes(text.toLowerCase());
      });

      console.log(results)

      setSearchResults(results);
    },100);
    
    setSearchTimeOutState(searchTimeOut);
  }


  const showModal = () => {
    dispatch(modalAction.show('add'));
  }

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/v1/users');
      if (response.status !== 200) {

        throw new Error("Something went wrong ! ");
      }

      const data = await response.json();

      const userList = data.result;

      userList.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });

      dispatch(userActions.setUser(userList));
      setIsLoading(false);


    }
    catch (error) {

      setError(error.message);
      setIsLoading(false);
    }

  }

  const memoisedFetchProducts = useCallback(fetchProducts, []);

  useEffect(() => {
    memoisedFetchProducts();
  }, [memoisedFetchProducts])



  let content = <p></p>

  if (isLoading) {
    content = <p>Loading ...</p>
  }
  else if (!isLoading && users.length > 0) {
    content = <List list={searchText===null?users:searchResults} />
  }
  else if (!isLoading && !error && users.length === 0) {
    content = <p>No Users to show</p>
  }
  else if (error) {
    content = <p>{error}</p>
  }

  return (
    <div className="app">
      <ModalForm></ModalForm>
      <section className="addUser">
        <button className="btn" onClick={showModal}>Add User</button>
      </section>
      <section className="users">
        {/* <List list={users}></List> */}
        <input type="text" placeholder="Search Name , Number"onChange={handleSearch}/>
        {content}
      </section>
    </div>
  );
}

export default App;
