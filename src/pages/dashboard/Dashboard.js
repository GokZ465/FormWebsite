import React from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles["mai"]}>
      <div>
        <header className={styles["showcase"]}>
          <div className={styles["content"]}>
            <div className={styles["title"]}></div>
            <div className={styles["text"]}></div>
          </div>
        </header>

        {/* <section className={styles["services"]}>
          <div className={styles["container grid-3 center"]}>
            <div>
              <i className={styles["fas fa-file-alt fa-3x"]}></i>
              <h3>How it works?</h3>
              <p>
                The website allows users to fill out two different forms with
                their personal information. The information entered by the user
                is then saved to a database that is integrated with the website.
                The website also allows for the creation of specific roles.
                Users with different roles have different levels of access to
                the information in the database. For example, the person with
                the highest role can view all submitted forms and see if they
                have been accepted or not.
              </p>
            </div>
            <div>
              <i className={styles["fas fa-lock fa-3x"]}></i>
              <h3>How Safe is it?</h3>
              <p>
                The website uses industry-standard security protocols to ensure
                the safety of user data. All personal information entered into
                the forms is encrypted and stored securely in the database.
                Access to the database is restricted to authorized personnel
                only.
              </p>
            </div>
            <div>
              <i className={styles["fas fa-users fa-3x"]}></i>
              <h3>Who can use it?</h3>
              <p>
                Anyone can use the website to fill out the forms and submit
                their personal information. The website administrators will
                review the submissions and determine whether to accept or reject
                them. Users with the highest role will have access to all
                submitted forms and their status.
              </p>
            </div>
          </div>
        </section> */}
        <footer className={styles["center bg-dark"]}>
          <p></p>
        </footer>
      </div>
    </div>
  );
}
