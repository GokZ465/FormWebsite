import "./ProjectList.css";
import { useHistory, useNavigate } from "react-router-dom";
import Avatar from "../../components/navbar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { fireStore } from "../../fireBaeDateBae/config";
// import { fireStore, timestamp } from "../../fireBaeDateBae/config";

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
  // const db = fireStore();
  const { deleteDocument } = useFirestore("transactions");
  const { user } = useAuthContext();
  let navigate = useNavigate();

  const handleReject = (id, uid, form) => {
    deleteDocument(id);
    // console.log(uid);
    fireStore
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (form === "PretensaoDeSaida") {
            fireStore
              .collection("users")
              .doc(uid)
              .update({ form2: "rejected" });
          } else {
            fireStore
              .collection("users")
              .doc(uid)
              .update({ form1: "rejected" });
          }
        } else {
          console.log("No matching documents found.");
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleApprove = (id, uid, formType) => {
    deleteDocument(id);
    console.log(uid);
    fireStore
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (formType === "PretensaoDeSaida") {
            fireStore
              .collection("users")
              .doc(uid)
              .update({ form2: "Accepted" });
          } else {
            fireStore
              .collection("users")
              .doc(uid)
              .update({ form1: "Accepted" });
          }
        } else {
          console.log("No matching documents found.");
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
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
          {user.uid === "a5fl9Hs1aBcEdnT6QZtPE0gAa4d2" && (
            <div className="button-container">
              <button
                onClick={(e) => {
                  console.log(project.createdBy.id);
                  handleApprove(project.id, project.createdBy.id, project.form);
                }}
                className="accept-button"
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  console.log(project.createdBy.id);
                  handleReject(project.id, project.createdBy.id, project.form);
                }}
                className="reject-button"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
