import React from "react";
import { NavLink } from "react-router-dom";
import { db } from "../../services/firebase";

import "./style.css";

export const CardUser = ({ name, email, uuid }) => {
  const deleteUser = () => {
    db.collection("users").doc(uuid).delete();
  };
  return (
    <div key={uuid} className="user-registered">
      {" "}
      <div className="cont-data">
        <h2>Nome: {name}</h2>
        <h2>Email: {email}</h2>
      </div>
      <div className="cont-btn">
        <NavLink className="link" to={`/update/${uuid}`}>
          <button className="btn-alt">Alterar</button>
        </NavLink>
        <button className="btn-alt" onClick={deleteUser}>
          Deletar
        </button>{" "}
      </div>
    </div>
  );
};
