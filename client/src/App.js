import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newName, setNewName] = useState([]);
  const [newAge, setNewAge] = useState(0);
  const [newEmail, setNewEmail] = useState([]);
  const [newPassword, setNewPassword] = useState([]);

  const [usersList, setUsersList] = useState([]);

  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      email: email,
      password: password,
    }).then(() => {
      console.log("success");
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUsersList(response.data);
    });
  };

  const updateUser = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: newName,
      age: newAge,
      email: newEmail,
      password: newPassword,
    }).then((response) => {
      setUsersList(
        usersList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: newName,
                age: newAge,
                email: newEmail,
                password: newPassword,
              }
            : val;
        })
      );
    });
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUsersList(
        usersList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="info">
        <h1>Vartotojo registracija</h1>
        <label>Vardas:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Amžius:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>El. paštas:</label>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Slaptažodis:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={addUser}>Registruoti</button>
      </div>
      <div className="users">
        <button onClick={getUsers}>Rodyti vartotojus</button>
        {usersList.map((val, key) => {
          return (
            <div className="registered">
              <div className="userData">
                <div className="exist">
                  <h2>Vartotojo duomenys:</h2>
                  <h3>Vardas: {val.name}</h3>
                  <h3>Amžius: {val.age}</h3>
                  <h3>El. paštas: {val.email}</h3>
                </div>
                <div className="update">
                  <h2>Nauji duomenys:</h2>
                  <input
                    type="text"
                    placeholder="Naujas vardas..."
                    onChange={(event) => {
                      setNewName(event.target.value);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Naujas amžius..."
                    onChange={(event) => {
                      setNewAge(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Naujas el. paštas..."
                    onChange={(event) => {
                      setNewEmail(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Naujas slaptažodis..."
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateUser(val.id);
                    }}
                  >
                    Atnaujinti
                  </button>
                </div>
              </div>
              <div className="delete">
                <button
                  onClick={() => {
                    deleteUser(val.id);
                  }}
                >
                  Ištrinti vartotoją
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
