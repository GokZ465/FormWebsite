import React, { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import Select from "react-select";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useNavigate } from "react-router-dom";
import { fireStore } from "../../fireBaeDateBae/config";

export default function Form2() {
  const { user } = useAuthContext();
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { addDocument } = useFirestore("transactions");
  const navigate = useNavigate();
  const [form2, setForm2] = useState("");
  const [form1, setForm1] = useState("");
  const [role, setRole] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [classroom, setClassroom] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [comment, setComment] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  const [isDisabled, setIsDisabled] = useState(true);
  const [quarto, setQuarto] = useState("");
  const [reasons, setReasons] = useState("");
  useEffect(() => {
    if (documents) {
      setUsers("admin");
    }
    // fireStore
    //   .collection("users")
    //   .doc(user.uid)
    //   .where("form1", "==", "rejected")
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       setForm1(true);
    //     }
    //   });
    fireStore
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.form1 === "rejected") {
            setForm1(false);
          }
          if (data.form1 === "Accepted") {
            setForm1(true);
          }
          if (data.form2 === "Accepted") {
            setForm2(true);
          }
          if (data.form2 === "rejected") {
            setForm2(false);
          }
        } else {
          console.log("No such document!");
          isDisabled(false);
        }
        console.log(form1, form2);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    console.log(form1, form2);
  }, [documents]);

  const createdBy = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    id: user.uid,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      role,
      number,
      name,
      year,
      classroom,
      roomNumber,
      comment,
      startDate,
      endDate,
      quarto,
      createdBy,
    });
    addDocument({
      role,
      number,
      name,
      year,
      classroom,
      roomNumber,
      comment,
      startDate,
      endDate,
      quarto,
      createdBy,
      form: "PretensaoDePosseOuUso",
    });
    navigate("/");
  };

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      {!form2 && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
            textAlign: "center",
            height: "100px",
          }}
        >
          Your Request is Rejected by Admin
        </div>
      )}
      {form2 && (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
            textAlign: "center",
            height: "100px",
          }}
        >
          Your Request is Accepted by Admin
        </div>
      )}
      <h1>Pretensão de Posse ou Uso</h1>
      <div className="form-control">
        <label htmlFor="role" id="label-role">
          <b>Companhia de Alunos</b>
        </label>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="3">3º</option>
          <option value="4">4º</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="number" id="number">
          <b>Número</b>
        </label>
        <input
          type="number"
          id="number"
          placeholder="Introduz o teu número"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="name" id="label-name">
          <b>Nome</b>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Introduz o teu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="year" id="label-year">
          <b>Ano de Escolaridade</b>
        </label>
        <select
          name="year"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="10">10º</option>
          <option value="11">11º</option>
          <option value="12">12º</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="classroom" id="label-classroom">
          <b>Turma</b>
        </label>
        <select
          name="classroom"
          id="classroom"
          value={classroom}
          onChange={(e) => setClassroom(e.target.value)}
        >
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="quarto">
          <b>Quarto Nº:</b>
        </label>

        {/* Input Type Number */}
        <input
          type="number"
          id="quarto"
          placeholder="Introduz o número do teu quarto"
          value={quarto}
          onChange={(e) => setQuarto(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="comment">
          <b>Pretende autorização para posse ou uso de:</b>
        </label>

        {/* multi-line text input control */}
        <textarea
          name="comment"
          id="comment"
          placeholder="Enter your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <div className="form-control">
        <label htmlFor="startDate">
          <b>Periodo Pretendido: </b>
          <br />
          <br />
          Do dia:
          <br />
          Desde as:
        </label>

        <input
          type="datetime-local"
          id="startDate"
          name="startDate"
          value={startDate}
          min="2022-12-13T00:00"
          max="2023-12-31T23:59"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="end-time">Até ao dia: Às:</label>
        <input
          type="datetime-local"
          id="end-time"
          name="end-time"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          min="2022-12-13T00:00"
          max="2023-12-31T23:59"
        />
      </div>

      <div className="form-control">
        <label htmlFor="reasons">
          <b>Pelos seguintes motivos:</b>
        </label>
        <textarea
          id="reasons"
          name="reasons"
          value={reasons}
          onChange={(event) => setReasons(event.target.value)}
          placeholder="Enter your reasons here"
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
    </>
  );
}
