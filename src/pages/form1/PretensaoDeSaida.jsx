import React, { useEffect, useState } from "react";
import "./Form.css";
import { useFirestore } from "../../hooks/useFirestore";
import Select from "react-select";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
function Form() {
  
  const { user } = useAuthContext();
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  const [companhiaDeAlunos, setCompanhiaDeAlunos] = useState("3");
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [anoDeEscolaridade, setAnoDeEscolaridade] = useState("10");
  const [turma, setTurma] = useState("A");
  const [desde, setDesde] = useState("");
  const [ate, setAte] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [recommed, setRecommed] = useState("");
  const [meetingTime, setMeetingTime] = useState("2022-12-13T08:00");
  const { addDocument } = useFirestore("transactions");
  const [comment, setComment] = useState("");

  const handleCompanhiaDeAlunosChange = (event) => {
    setCompanhiaDeAlunos(event.target.value);
  };

  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };
  useEffect(() => {
    if (documents) {
      setUsers("admin");
    }
  }, [documents]);
  const handleAnoDeEscolaridadeChange = (event) => {
    setAnoDeEscolaridade(event.target.value);
  };

  const handleTurmaChange = (event) => {
    setTurma(event.target.value);
  };

  const handleDesdeChange = (event) => {
    setDesde(event.target.value);
  };

  const handleAteChange = (event) => {
    setAte(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleMeetingTimeChange = (event) => {
    setMeetingTime(event.target.value);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleRecommedChange = (event) => {
    setRecommed(event.target.value);
  };
  const createdBy = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    id: user.uid,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      companhiaDeAlunos,
      numero,
      nome,
      anoDeEscolaridade,
      turma,
      desde,
      ate,
      role,
      startDate,
      endDate,
      recommed,
      meetingTime,
      comment,
    });
    addDocument({
      companhiaDeAlunos,
      numero,
      nome,
      anoDeEscolaridade,
      turma,
      desde,
      ate,
      role,
      startDate,
      endDate,
      recommed,
      meetingTime,
      comment,
      createdBy,
    });
    // Submit form data to server or do something else
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <h1>Pretensão de Saída</h1>
        <label htmlFor="companhiaDeAlunos" id="label-companhiaDeAlunos">
          Companhia de Alunos
        </label>

        {/* Dropdown options */}
        <select
          name="companhiaDeAlunos"
          id="companhiaDeAlunos"
          value={companhiaDeAlunos}
          onChange={handleCompanhiaDeAlunosChange}
        >
          <option value="3">3º</option>
          <option value="4">4º</option>
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="numero" id="label-numero">
          Número
        </label>

        {/* Input Type Email*/}
        <input
          type="number"
          id="numero"
          name="numero"
          placeholder="Introduz o teu número"
          value={numero}
          onChange={handleNumeroChange}
        />
      </div>

      {/* Details */}
      <div className="form-control">
        <label htmlFor="nome" id="label-nome">
          Nome
        </label>

        {/* Input Type Text */}
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Introduz o teu nome"
          value={nome}
          onChange={handleNomeChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="anoDeEscolaridade" id="label-anoDeEscolaridade">
          Ano de Escolaridade
        </label>
        <div className="form-control">
          <label htmlFor="role">Ano</label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="10">10º</option>
            <option value="11">11º</option>
            <option value="12">12º</option>
          </select>
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="turma">Turma</label>
        <select
          name="turma"
          id="turma"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
        >
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="startDate">
          Pretende ser dispensado no dia: <br /> Desde as:
        </label>
        <input
          type="datetime-local"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2022-12-13T00:00"
          max="2023-12-31T23:59"
        />
      </div>

      <div className="form-control">
        <label htmlFor="endDate">
          Até ao dia: <br /> Às:
        </label>
        <input
          type="datetime-local"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min="2022-12-13T00:00"
          max="2023-12-31T23:59"
        />
      </div>

      <div>
        <div className="form-control">
          <label>
            Data da Pretensão:
            <input
              type="datetime-local"
              id="meeting-time"
              name="meeting-time"
              value={meetingTime}
              min="2022-12-13T00:00"
              max="2023-12-31T23:59"
              onChange={handleMeetingTimeChange}
            />
          </label>
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="fardado">
          Fardado
          <input
            type="radio"
            id="fardado"
            name="recommed"
            value="Fardado"
            checked={recommed === "Fardado"}
            onChange={handleRecommedChange}
          />
        </label>
        <label htmlFor="civil">
          À civil
          <input
            type="radio"
            id="civil"
            name="recommed"
            value="Civil"
            checked={recommed === "Civil"}
            onChange={handleRecommedChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="comment">
          Motivo:
          <textarea
            name="comment"
            id="comment"
            value={comment}
            placeholder="Enter your comment here"
            onChange={handleCommentChange}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form;
