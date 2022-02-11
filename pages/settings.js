import styles from "../styles/Settings.module.sass";
import { useState } from "react";
import Image from "next/image";

const Settings = (props) => {
    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settings}>
                <div
                    className={`${styles.settingsBox} ${styles.settingsBoxLeft}`}
                >
                    <p className={styles.settingsBoxText}>
                        {props.user && props.user.email}
                    </p>
                    <p className={styles.settingsBoxText}>
                        {props.user && props.user.role}
                    </p>
                    <p className={styles.settingsBoxText}>
                        {props.user &&
                            props.user.supervisorRole === "TA" &&
                            "Travel Advisor"}
                        {props.user &&
                            props.user.supervisorRole === "TM" &&
                            "Task Monitor"}
                        {props.user &&
                            props.user.supervisorRole === "PL" &&
                            "Group/Project Lead"}
                        {props.user &&
                            props.user.supervisorRole === "PM" &&
                            "Program Manager"}
                        {props.user &&
                            props.user.supervisorRole === "CO" &&
                            "Contracting Officer"}
                    </p>
                    <button
                        className={styles.settingsBoxLogout}
                        onClick={() => {
                            localStorage.removeItem("token");
                            return window.location.reload();
                        }}
                    >
                        <Image
                            src="/loginBlack.svg"
                            alt="login"
                            width={30}
                            height={30}
                            loading="eager"
                        />
                        <p>Logout</p>
                    </button>
                </div>
                <div className={styles.settingsBox}>
                    <p className={styles.settingsBoxText}>Supervisor Roles</p>
                    <button
                        className={styles.settingsBoxButton}
                        style={{
                            background: "#90CAF9",
                        }}
                        //onClick={() => pickSupervisorRole("TA")}
                    >
                        Travel Advisor
                    </button>
                    <button
                        className={styles.settingsBoxButton}
                        style={{
                            background: "#FF8A65",
                        }}
                        //onClick={() => pickSupervisorRole("TA")}
                    >
                        Task Monitor
                    </button>
                    <button
                        className={styles.settingsBoxButton}
                        style={{
                            background: "#2196F3",
                        }}
                        //onClick={() => pickSupervisorRole("TA")}
                    >
                        Group/Project Lead
                    </button>
                    <button
                        className={styles.settingsBoxButton}
                        style={{
                            background: "#1565C0",
                        }}
                        //onClick={() => pickSupervisorRole("TA")}
                    >
                        Program Manager
                    </button>
                    <button
                        className={styles.settingsBoxButton}
                        style={{
                            background: "#FF5722",
                        }}
                        //onClick={() => pickSupervisorRole("TA")}
                    >
                        Contracting Officer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
