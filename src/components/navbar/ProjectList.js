import "./ProjectList.css";
import { useHistory, useNavigate } from "react-router-dom";
import Avatar from "../../components/navbar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import React from "react";
import { Link } from "react-router-dom";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export default function ProjectList({ projects }) {
  const { deleteDocument } = useFirestore("transactions");
  const { user } = useAuthContext();
  let navigate = useNavigate();

  const handleReject = (id) => {
    deleteDocument(id);
  };

  const handleApprove = () => {
    navigate("/");
  };

  return (
    <div className="project-list">
      {projects.length === 0 && <p>No requests yet</p>}
      {projects.map((project) => (
        <div className="project-card" key={project.numero}>
          <p to={`/`}>
            <h4>{project.nome}</h4>
            <h5>Requested by {project.createdBy.displayName}</h5>
            <p>Role {project.role}</p>
            <p>Numero {project.numero} </p>
            <p>
              Date{" "}
              {new Date(project.startDate).toLocaleDateString("en-US", options)}{" "}
              to{" "}
              {new Date(project.endDate).toLocaleDateString("en-US", options)}
            </p>
            <h5>recommed {project.recommed}</h5>
            <p>companhiaDeAlunos {project.companhiaDeAlunos}</p>
            <p>
              Meeting Time:{" "}
              {new Date(project.meetingTime).toLocaleString("en-US", options)}
            </p>

            <p>Turma : {project.Turma}</p>
            <div className="assigned-to">
              <p>Motivo : {project.comment}</p>
            </div>
          </p>
          <div className="button-container">
            <button onClick={handleApprove} className="accept-button">
              Accept
            </button>
            <button
              onClick={(e) => {
                console.log(project.id);
                handleReject(project.id);
              }}
              className="reject-button"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
