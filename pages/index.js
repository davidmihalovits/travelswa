import styles from "../styles/Index.module.sass";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Index = (props) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginCode, setLoginCode] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState("");
    const [loginCodeSent, setLoginCodeSent] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const [registerEmail, setRegisterEmail] = useState("");
    const [role, setRole] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("");
    const [registerLoading, setRegisterLoading] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        setRegisterError("");
        setRegisterSuccess("");
        setRegisterLoading(true);

        await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: registerEmail,
                role: role,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.response === "Email already taken.") {
                    setRegisterError(res.response);
                    return setRegisterLoading(false);
                }
                if (res.response === "User registered successfully.") {
                    setRegisterSuccess(res.response);
                    return setRegisterLoading(false);
                }
            });
    };

    const requestLogin = async (e) => {
        e.preventDefault();

        setLoginError("");
        setLoginSuccess("");
        setLoginLoading(true);

        await fetch("/api/requestLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: loginEmail,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.response === "User not found.") {
                    setLoginError(res.response);
                    return setLoginLoading(false);
                }
                if (
                    res.response ===
                    "Login code has been sent to your email address."
                ) {
                    setLoginSuccess(res.response);
                    setLoginLoading(false);
                    return setLoginCodeSent(true);
                }
            });
    };

    const login = async (e) => {
        e.preventDefault();

        setLoginError("");
        setLoginSuccess("");
        setLoginLoading(true);

        await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: loginEmail,
                code: loginCode,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.response === "Wrong login code.") {
                    setLoginError(res.response);
                    return setLoginLoading(false);
                }
                localStorage.setItem("token", res.token);
                return window.location.reload();
            });
    };

    if (props.user) {
        return (
            <div className={styles.requestContainer}>
                <div className={styles.request}>
                    <Link href="/request-travel-form" passHref>
                        <button className={styles.requestButton}>
                            <Image
                                className={styles.requestButtonIcon}
                                src="/travel.svg"
                                alt="travel"
                                width={60}
                                height={60}
                            />
                            <p className={styles.requestButtonText}>Travel</p>
                        </button>
                    </Link>
                    <Link href="/request-work-form" passHref>
                        <button className={styles.requestButton}>
                            <Image
                                className={styles.requestButtonIcon}
                                src="/work.svg"
                                alt="work"
                                width={60}
                                height={60}
                            />
                            <p className={styles.requestButtonText}>
                                Work Authorization
                            </p>
                        </button>
                    </Link>
                    <Link href="/request-personnel-form" passHref>
                        <button className={styles.requestButton}>
                            <Image
                                className={styles.requestButtonIcon}
                                src="/personnel.svg"
                                alt="personnel"
                                width={60}
                                height={60}
                            />
                            <p className={styles.requestButtonText}>
                                Personnel Action Change
                            </p>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.indexContainer}>
            <div className={styles.index}>
                <div className={styles.indexBox}>
                    <h1 className={styles.indexBoxTitle}>Login</h1>
                    {loginCodeSent ? (
                        <div>
                            <label className={styles.indexBoxLabel}>
                                Login code
                            </label>
                            <input
                                type="text"
                                value={loginCode}
                                onChange={(e) => setLoginCode(e.target.value)}
                                className={styles.indexBoxInput}
                                placeholder="Login code"
                            />
                            <button
                                className={styles.indexBoxButton}
                                onClick={login}
                                disabled={loginLoading || !loginCode}
                            >
                                {loginLoading ? (
                                    <>
                                        <Image
                                            src="/loadingWhite.svg"
                                            alt="loading"
                                            width={30}
                                            height={30}
                                            loading="eager"
                                            className={
                                                styles.indexBoxButtonSpinner
                                            }
                                        />
                                        <p>Loading</p>
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src="/loginWhite.svg"
                                            alt="login"
                                            width={30}
                                            height={30}
                                            loading="eager"
                                        />
                                        <p>Login</p>
                                    </>
                                )}
                            </button>
                            {loginSuccess && (
                                <p className={styles.indexBoxSuccess}>
                                    {loginSuccess}
                                </p>
                            )}
                            {loginError && (
                                <p className={styles.indexBoxError}>
                                    {loginError}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className={styles.indexBoxLabel}>
                                Email address
                            </label>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className={styles.indexBoxInput}
                                placeholder="Email address"
                            />
                            <button
                                className={styles.indexBoxButton}
                                onClick={requestLogin}
                                disabled={loginLoading || !loginEmail}
                            >
                                {loginLoading ? (
                                    <>
                                        <Image
                                            src="/loadingWhite.svg"
                                            alt="loading"
                                            width={30}
                                            height={30}
                                            loading="eager"
                                            className={
                                                styles.indexBoxButtonSpinner
                                            }
                                        />
                                        <p>Loading</p>
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src="/loginWhite.svg"
                                            alt="login"
                                            width={30}
                                            height={30}
                                            loading="eager"
                                        />
                                        <p>Request login code</p>
                                    </>
                                )}
                            </button>
                            {loginError && (
                                <p className={styles.indexBoxError}>
                                    {loginError}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div className={styles.indexBox}>
                    <h1 className={styles.indexBoxTitle}>Register</h1>
                    <label className={styles.indexBoxLabel}>
                        Email address
                    </label>
                    <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className={styles.indexBoxInput}
                        placeholder="Email address"
                    />
                    <div className={styles.indexBoxRadioText}>
                        <div
                            className={styles.indexBoxRadio}
                            onClick={() => {
                                if (role === "Supervisor") {
                                    return setRole("TravelerSupervisor");
                                }
                                if (role === "Traveler") {
                                    return setRole("");
                                }
                                if (role === "TravelerSupervisor") {
                                    return setRole("Supervisor");
                                }
                                return setRole("Traveler");
                            }}
                        >
                            {(role === "Traveler" ||
                                role === "TravelerSupervisor") && (
                                <span
                                    className={styles.indexBoxRadioCheckmark}
                                ></span>
                            )}
                        </div>
                        <p className={styles.indexBoxText}>Traveler</p>
                    </div>
                    <div className={styles.indexBoxRadioText}>
                        <div
                            className={styles.indexBoxRadio}
                            onClick={() => {
                                if (role === "Traveler") {
                                    return setRole("TravelerSupervisor");
                                }
                                if (role === "Supervisor") {
                                    return setRole("");
                                }
                                if (role === "TravelerSupervisor") {
                                    return setRole("Traveler");
                                }
                                return setRole("Supervisor");
                            }}
                        >
                            {(role === "Supervisor" ||
                                role === "TravelerSupervisor") && (
                                <span
                                    className={styles.indexBoxRadioCheckmark}
                                ></span>
                            )}
                        </div>
                        <p className={styles.indexBoxText}>Supervisor</p>
                    </div>
                    <button
                        className={styles.indexBoxButton}
                        onClick={register}
                        disabled={registerLoading || !registerEmail || !role}
                    >
                        {registerLoading ? (
                            <>
                                <Image
                                    src="/loadingWhite.svg"
                                    alt="loading"
                                    width={30}
                                    height={30}
                                    loading="eager"
                                    className={styles.indexBoxButtonSpinner}
                                />
                                <p>Loading</p>
                            </>
                        ) : (
                            <>
                                <Image
                                    src="/loginWhite.svg"
                                    alt="login"
                                    width={30}
                                    height={30}
                                    loading="eager"
                                />
                                <p>Register new user</p>
                            </>
                        )}
                    </button>
                    {registerError && (
                        <p className={styles.indexBoxError}>{registerError}</p>
                    )}
                    {registerSuccess && (
                        <p className={styles.indexBoxSuccess}>
                            {registerSuccess}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;
