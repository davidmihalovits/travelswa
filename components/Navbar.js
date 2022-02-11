import styles from "../styles/Navbar.module.sass";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbar}>
                <div className={styles.navbarMobile}>
                    <Link href="/forms" passHref>
                        <button className={styles.navbarMobileButton}>
                            <Image
                                className={styles.navbarMobileButtonIcon}
                                src="/forms.svg"
                                alt="forms"
                                width={22}
                                height={22}
                                loading="eager"
                            />
                            <p className={styles.navbarMobileButtonText}>
                                Forms
                            </p>
                        </button>
                    </Link>
                    <Link href="/stats" passHref>
                        <button className={styles.navbarMobileButton}>
                            <Image
                                className={styles.navbarMobileButtonIcon}
                                src="/stats.svg"
                                alt="stats"
                                width={22}
                                height={22}
                                loading="eager"
                            />
                            <p className={styles.navbarMobileButtonText}>
                                Statistics
                            </p>
                        </button>
                    </Link>
                    <Link href="/" passHref>
                        <button className={styles.navbarMobileButton}>
                            <Image
                                className={styles.navbarMobileButtonIcon}
                                src="/submit.svg"
                                alt="submit"
                                width={22}
                                height={22}
                                loading="eager"
                            />
                            <p className={styles.navbarMobileButtonText}>
                                Request
                            </p>
                        </button>
                    </Link>
                    <Link href="/notifications" passHref>
                        <button className={styles.navbarMobileButton}>
                            <Image
                                className={styles.navbarMobileButtonIcon}
                                src="/bell.svg"
                                alt="bell"
                                width={22}
                                height={22}
                                loading="eager"
                            />
                            <p className={styles.navbarMobileButtonText}>
                                Notifications
                            </p>
                        </button>
                    </Link>
                    <Link href="/settings" passHref>
                        <button className={styles.navbarMobileButton}>
                            <Image
                                className={styles.navbarMobileButtonIcon}
                                src="/settings.svg"
                                alt="settings"
                                width={22}
                                height={22}
                                loading="eager"
                            />
                            <p className={styles.navbarMobileButtonText}>
                                Settings
                            </p>
                        </button>
                    </Link>
                </div>
                <div className={styles.navbarDesktop}>
                    <div className={styles.navbarDesktopLeft}>
                        <Link href="/forms" passHref>
                            <button className={styles.navbarDesktopLeftButton}>
                                <Image
                                    className={
                                        styles.navbarDesktopLeftButtonIcon
                                    }
                                    src="/forms.svg"
                                    alt="forms"
                                    width={33}
                                    height={33}
                                    loading="eager"
                                />
                                <p
                                    className={
                                        styles.navbarDesktopLeftButtonText
                                    }
                                >
                                    Forms
                                </p>
                            </button>
                        </Link>
                        <Link href="/stats" passHref>
                            <button className={styles.navbarDesktopLeftButton}>
                                <Image
                                    className={
                                        styles.navbarDesktopLeftButtonIcon
                                    }
                                    src="/stats.svg"
                                    alt="stats"
                                    width={33}
                                    height={33}
                                    loading="eager"
                                />
                                <p
                                    className={
                                        styles.navbarDesktopLeftButtonText
                                    }
                                >
                                    Statistics
                                </p>
                            </button>
                        </Link>
                        <Link href="/notifications" passHref>
                            <button className={styles.navbarDesktopLeftButton}>
                                <Image
                                    className={
                                        styles.navbarDesktopLeftButtonIcon
                                    }
                                    src="/bell.svg"
                                    alt="bell"
                                    width={33}
                                    height={33}
                                    loading="eager"
                                />
                                <p
                                    className={
                                        styles.navbarDesktopLeftButtonText
                                    }
                                >
                                    Notifications
                                </p>
                            </button>
                        </Link>
                        <Link href="/settings" passHref>
                            <button className={styles.navbarDesktopLeftButton}>
                                <Image
                                    className={
                                        styles.navbarDesktopLeftButtonIcon
                                    }
                                    src="/settings.svg"
                                    alt="settings"
                                    width={33}
                                    height={33}
                                    loading="eager"
                                />
                                <p
                                    className={
                                        styles.navbarDesktopLeftButtonText
                                    }
                                >
                                    Settings
                                </p>
                            </button>
                        </Link>
                    </div>
                    <Link href="/" passHref>
                        <button className={styles.navbarDesktopRightButton}>
                            <Image
                                className={styles.navbarDesktopRightButtonIcon}
                                src="/submit2.svg"
                                alt="submit"
                                width={33}
                                height={33}
                                loading="eager"
                            />
                            <p className={styles.navbarDesktopRightButtonText}>
                                Request
                            </p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
