import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_USER} from "./query/user";
import {CREATE_USER} from "./mutations/user";

function App() {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS, {pollInterval: 500})
    const {data: oneUser, loading: loadingOneUser} = useQuery(GET_USER, {
        variables: {
            id: 1
        }
    })
    const [newUser] = useMutation(CREATE_USER)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)

    console.log(data)
    console.log(oneUser)
    useEffect(() => {
        if(!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }

    const getAll = (e) => {
        e.preventDefault()
        refetch()
    }

  return (
    <div>
      <form action="">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={(e) => getAll(e)}>Get</button>
      </form>
        <div>
            Users:
            {users.map(user => <div>{user.id}) {user.username} {user.age}</div>)}
        </div>
    </div>
  );
}

export default App;
