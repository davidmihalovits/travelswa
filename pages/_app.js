import "../styles/globals.sass";
import "../styles/variables.sass";
import styles from "../styles/App.module.sass";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import Navbar from "../components/Navbar";

const App = ({ Component, pageProps }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const getUser = async () => {
        setLoading(true);

        const token = localStorage.getItem("token");

        await fetch(`/api/getUser`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.response === "No token.") {
                    console.log("Not logged in.");
                    return router.push("/");
                }

                console.log("Logged in.");
                return setUser(res);
            });

        setLoading(false);
    };

    useEffect(() => {
        getUser();

        const token = localStorage.getItem("token");
        if (token) logoutTokenExpired();

        // eslint-disable-next-line
    }, []);

    const logoutTokenExpired = async () => {
        const token = localStorage.getItem("token");
        const decoded = await jwtDecode(token);

        const tokenExpired = new Date(decoded.exp * 1000);
        const timeNow = new Date();

        if (tokenExpired < timeNow) {
            localStorage.removeItem("token");
            return window.location.reload();
        }
    };

    if (!user && loading) {
        return (
            <div className={styles.appLoading}>
                <Image
                    src="/loadingBlack.svg"
                    alt="loading"
                    width={80}
                    height={80}
                    loading="eager"
                    className={styles.appLoadingSpinner}
                />
            </div>
        );
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="keywords" content="Travel SWA" />
                <meta name="description" content="Travel SWA" />
                <link rel="icon" href="/favicon.ico" />
                <title>Travel SWA</title>
            </Head>

            <Component {...pageProps} {...user} />

            {user && <Navbar {...user} />}
        </>
    );
};

export default App;
