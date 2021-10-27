import React from "react";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { db } from "../../services/firebase";
import { CardUser } from "../../components/Card/index";
import "./style.css";

export function Home() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);

  function onChange(ev) {
    const { name, value } = ev.target;
    const newDate = { ...values, [name]: value };
    setValues(newDate);
  }

  const addUser = (ev) => {
    const uuid = v4();
    ev.preventDefault();

    if (values.name === "" || values.email === "") {
      alert(
        "Verifique se os campos de informação estão preenchidos corretamente"
      );
    }

    if (values.name !== "" && values.email !== "") {
      db.collection("users")
        .doc(uuid)
        .set({ ...values, uuid });
    }
  };

  async function getData() {
    db.collection("users").onSnapshot((doc) => {
      setUsers(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="cont-head">
          <h1>CRUD application</h1>
          <p>Insira abaixo NOME e EMAIL dos participantes</p>
        </div>
        <div className="cont-name-email">
          <div className="form-name">
            <input placeholder="Nome" onChange={onChange} name="name" />
          </div>
          <div className="form-email">
            <input placeholder="Email" onChange={onChange} name="email" />
          </div>
        </div>
        <button className="button-add" onClick={addUser}>
          Adicionar
        </button>
        {users.map((user) => {
          return (
            <CardUser
              name={user.name}
              email={user.email}
              uuid={user.uuid}
              key={user.uuid}
            />
          );
        })}
      </div>
    </div>
  );
}
