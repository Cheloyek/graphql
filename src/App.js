import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/user";

function App() {
    const {data, loading, error} = useQuery(GET_ALL_USERS)
    const [users, setUsers] = useState([])
    console.log(data)
    useEffect(() => {
        if(!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

  return (
    <div>
      <form action="">
        <input type="text"/>
        <input type="number"/>
          <button>Create</button>
          <button>Get</button>
      </form>
        <div>
            Users:
            {users.map(user => <div>{user.id}) {user.username} {user.age}</div>)}
        </div>
    </div>
  );
}

export default App;
