import "./ProjectList.css";
import { useHistory, useNavigate } from "react-router-dom";
import Avatar from "../../components/navbar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { fireStore } from "../../fireBaeDateBae/config";
import emailjs from "emailjs-com";

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

  const handleReject = (id, uid, form, email) => {
    deleteDocument(id);
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
          sendRejectEmail(email, form); // Send rejection email using emailJS
        } else {
          console.log("No matching documents found.");
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleApprove = (id, uid, formType, email) => {
    deleteDocument(id);
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
          console.log("gonna send!!!");

          sendAcceptEmail(email, formType); // Send acceptance email using emailJS
        } else {
          console.log("No matching documents found.");
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const sendRejectEmail = (recipientEmail, form) => {
    console.log("send reject email");

    const templateParams = {
      to_email: recipientEmail,
      form: form,
      // Include other parameters specific to your email template
      // For example:
      subject: "Your request has been rejected",
      // message: "Your request has been rejected. Please contact us for further information.",
    };

    emailjs
      .send(
        "service_e01w5yc",
        "template_mjpfrlh",
        templateParams,
        "os0DqSxeYI3huB3Y3"
      )
      .then((response) => {
        console.log("Email sent successfully:", response.text);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  // Function to send the acceptance email using emailJS
  const sendAcceptEmail = (recipientEmail, form) => {
    console.log("send accept email");
    const templateParams = {
      to_email: recipientEmail,
      form: form,
      // Include other parameters specific to your email template
      // For example:
      subject: "Your request has been accepted",
      // message: "Your request has been accepted. Please follow the instructions provided.",
    };
    console.log("gonna send!!!");
    emailjs
      .send(
        "service_e01w5yc",
        "template_mjpfrlh",
        templateParams,
        "os0DqSxeYI3huB3Y3"
      )
      .then((response) => {
        console.log("Email sent successfully:", response.text);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No requests yet</p>}
      {projects.map((project) => (
        <div className="project-card" key={project.numero}>
          {console.log(project)}
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
            {project.meetingTime && (
              <p>
                Meeting Time:{" "}
                {new Date(project.meetingTime).toLocaleString("en-US", options)}
              </p>
            )}

            <p>Turma : {project.turma}</p>
            <div className="assigned-to">
              <p>Motivo : {project.comment}</p>
            </div>
          </p>
          {user.uid === "a5fl9Hs1aBcEdnT6QZtPE0gAa4d2" && (
            <div className="button-container">
              <button
                onClick={(e) => {
                  // console.log(project.createdBy.id);
                  handleApprove(
                    project.id,
                    project.createdBy.id,
                    project.form,
                    project.email
                  );
                }}
                className="accept-button"
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  //console.log(project.createdBy.id);
                  handleReject(
                    project.id,
                    project.createdBy.id,
                    project.form,
                    project.email
                  );
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
