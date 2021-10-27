import React, { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { db } from "../../services/firebase";
import "./style.css";

export function UpdateData() {
  const [values, setValues] = useState();
  const history = useHistory();
  const ctx = useParams();
  const id = ctx.id;

  async function getData() {
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setTimeout(() => {
            history.push("/");
          }, 1000);
          alert(
            "Id inválido \nVocê será redirecionado para a página principal... "
          );
        }
        setValues(doc.data());
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const updateUser = (ev) => {
    ev.preventDefault();
    db.collection("users")
      .doc(id)
      .update(values)
      .then(() => {
        alert("Usuario alterado com sucesso");
      })
      .catch("Perdão houve um erro na tarefa")
      .finally(() => {
        history.push("/");
      });
  };

  function onChange(ev) {
    const { name, value } = ev.target;
    const newDate = { ...values, [name]: value };
    setValues(newDate);
  }

  return (
    <div className="cont-card">
      <form onSubmit={updateUser}>
        <div className="cont-up">
          <h2>Insira no campo a baixo a informação que deseja alterar.</h2>
          <input name="name" placeholder={values?.name} onChange={onChange} />
          <input name="email" placeholder={values?.email} onChange={onChange} />
          <button className="button-alt" type="submit">
            Alterar
          </button>
          <NavLink to="/">Voltar</NavLink>
        </div>
      </form>
    </div>
  );
}
