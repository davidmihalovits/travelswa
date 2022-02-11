import styles from "../styles/RequestTravelForm.module.sass";
import { useState, useEffect } from "react";
import Image from "next/image";
import papa from "papaparse";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RequestTravelForm = (props) => {
    const today = new Date();
    const onlyNumberRegex = /^[0-9\b]+$/;

    const [progress, setProgress] = useState("20%");
    const [loading, setLoading] = useState(false);
    const [section, setSection] = useState("general");

    // general
    const [travelPurposeSelect, setTravelPurposeSelect] = useState("AMS");
    const [travelPurpose, setTravelPurpose] = useState("");
    const [fullName, setFullName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [program, setProgram] = useState("HBG");
    const [chargeCodes, setChargeCodes] = useState([]);
    const [chargeCode, setChargeCode] = useState("22003.T.0001.00");
    const [task, setTask] = useState("GMAO");

    // ncts
    const [ncts, setNcts] = useState(false);
    const [nctsCode, setNctsCode] = useState("");
    const [nctsEmail, setNctsEmail] = useState("");

    // travel
    const [virtual, setVirtual] = useState(false);
    const [type, setType] = useState("");
    const [travelMethod, setTravelMethod] = useState("Air");
    const [startDate, setStartDate] = useState(
        today.setDate(today.getDate() + 30)
    );
    const [endDate, setEndDate] = useState(today.setDate(today.getDate() + 1));
    const [destinationStreetAddress, setDestinationStreetAddress] =
        useState("");
    const [destinationCity, setDestinationCity] = useState("");
    const [destinationState, setDestinationState] = useState("");
    const [destinationZipcode, setDestinationZipcode] = useState("");
    const [justification, setJustification] = useState("");
    const [justificationType, setJustificationType] = useState("");

    // cost
    const [transportCost, setTransportCost] = useState("");
    const [rentalCost, setRentalCost] = useState("");
    const [mileageCost, setMileageCost] = useState("");
    const [lodgingCost, setLodgingCost] = useState("");
    const [mealsCost, setMealsCost] = useState("");
    const [registrationFees, setRegistrationFees] = useState("");
    const [otherCost, setOtherCost] = useState("");
    const total =
        Number(transportCost) +
        Number(rentalCost) +
        Number(mileageCost) +
        Number(lodgingCost) +
        Number(mealsCost) +
        Number(registrationFees) +
        Number(otherCost);
    const [advance, setAdvance] = useState(false);
    const [advanceAmount, setAdvanceAmount] = useState("");

    // regulatory
    const [ciBrief, setCiBrief] = useState(false);
    const [itEquipment, setItEquipment] = useState(false);
    const [visa, setVisa] = useState("Not required");

    var date1 = new Date(moment(startDate).format("L"));
    var date2 = new Date(moment(endDate).format("L"));
    var difference = date1.getTime() - date2.getTime();
    var days = Math.ceil(difference / (1000 * 3600 * 24));
    const date1Hours = date1.setHours(0, 0, 0, 0);
    const date2Hours = date2.setHours(0, 0, 0, 0);

    const getChargeCodes = async () => {
        const response = await fetch("/chargecodes.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const results = papa.parse(csv, { header: true });
        const data = results.data;
        setChargeCodes(data);
    };
    useEffect(() => {
        getChargeCodes();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [section]);

    return (
        <div className={styles.requestFormContainer}>
            <form
                className={styles.requestForm}
                /*onSubmit={submit}*/ noValidate
            >
                <div className={styles.requestFormProgressIconContainer}>
                    <Image
                        className={styles.requestFormProgressIcon}
                        src="/travel.svg"
                        alt="travel"
                        width={25}
                        height={25}
                    />
                    <div className={styles.requestFormProgress}>
                        <div
                            style={{ width: progress }}
                            className={styles.requestFormProgressBar}
                        ></div>
                    </div>
                </div>
                {section === "general" && (
                    <>
                        <h1 className={styles.requestFormTitle}>
                            General Information
                        </h1>
                        <label className={styles.requestFormLabel}>
                            Conference/Workshop/Seminar
                        </label>
                        <select
                            value={travelPurposeSelect}
                            onChange={(e) =>
                                setTravelPurposeSelect(e.target.value)
                            }
                            className={styles.requestFormInput}
                        >
                            <option value="AMS">AMS</option>
                            <option value="AGU">AGU</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Travel Purpose"
                            value={travelPurpose}
                            onChange={(e) => setTravelPurpose(e.target.value)}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>Email</label>
                        <p
                            className={styles.requestFormInput}
                            style={{ cursor: "not-allowed" }}
                        >
                            {props.user && props.user.email}
                        </p>
                        <label className={styles.requestFormLabel}>
                            Employee ID
                        </label>
                        <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setEmployeeId(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                            placeholder="1 - 999999"
                            maxLength="6"
                        />
                        <label className={styles.requestFormLabel}>
                            Program
                        </label>
                        <select
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className={styles.requestFormInput}
                            onClick={() => setChargeCode("")}
                        >
                            <option value="HBG">HBG</option>
                            <option value="STARSS">STARSS</option>
                            <option value="ESES">ESES</option>
                            <option value="TESS">TESS</option>
                            <option value="SAMDA">SAMDA</option>
                            <option value="LITES">LITES</option>
                            <option value="SSAIHQ">SSAIHQ</option>
                            <option value="TIDES">TIDES</option>
                            <option value="GEUSTAR">GEUSTAR</option>
                        </select>
                        <label className={styles.requestFormLabel}>
                            Charge Code
                        </label>
                        {(program === "HBG" ||
                            program === "STARSS" ||
                            program === "ESES" ||
                            program === "TESS" ||
                            program === "SAMDA" ||
                            program === "LITES") && (
                            <select
                                value={chargeCode}
                                onChange={(e) => setChargeCode(e.target.value)}
                                className={styles.requestFormInput}
                            >
                                {chargeCodes
                                    .filter(
                                        (p) =>
                                            p.program === "HBG" &&
                                            program === "HBG"
                                    )
                                    .map((c, key) => {
                                        return (
                                            <option
                                                value={c.chargeCode}
                                                key={key}
                                            >
                                                {c.chargeCode}
                                            </option>
                                        );
                                    })}
                                {chargeCodes
                                    .filter(
                                        (p) =>
                                            p.program === "STARSS III" &&
                                            program === "STARSS"
                                    )
                                    .map((c, key) => {
                                        return (
                                            <option
                                                value={c.chargeCode}
                                                key={key}
                                            >
                                                {c.chargeCode}
                                            </option>
                                        );
                                    })}
                                {chargeCodes
                                    .filter(
                                        (p) =>
                                            p.program === "ESES III" &&
                                            program === "ESES"
                                    )
                                    .map((c, key) => {
                                        return (
                                            <option
                                                value={c.chargeCode}
                                                key={key}
                                            >
                                                {c.chargeCode}
                                            </option>
                                        );
                                    })}
                                {chargeCodes
                                    .filter(
                                        (p) =>
                                            p.program === "TESS Bridge" &&
                                            program === "TESS"
                                    )
                                    .map((c, key) => {
                                        return (
                                            <option
                                                value={c.chargeCode}
                                                key={key}
                                            >
                                                {c.chargeCode}
                                            </option>
                                        );
                                    })}
                                {chargeCodes
                                    .filter(
                                        (p) =>
                                            p.program === "SAMDA" &&
                                            program === "SAMDA" &&
                                            p.chargeCode.includes("CY5")
                                    )
                                    .map((c, key) => {
                                        return (
                                            <option
                                                value={c.chargeCode}
                                                key={key}
                                            >
                                                {c.chargeCode}
                                            </option>
                                        );
                                    })}
                                {chargeCodes
                                    .filter(
                                        (p) =>
                                            p.program === "LITES - II" &&
                                            program === "LITES"
                                    )
                                    .map((c, key) => {
                                        return (
                                            <option
                                                value={c.chargeCode}
                                                key={key}
                                            >
                                                {c.chargeCode}
                                            </option>
                                        );
                                    })}
                            </select>
                        )}
                        {(program === "SSAIHQ" ||
                            program === "TIDES" ||
                            program === "GEUSTAR") && (
                            <input
                                type="text"
                                value={chargeCode}
                                onChange={(e) => setChargeCode(e.target.value)}
                                className={styles.requestFormInput}
                                placeholder="Charge Code"
                            />
                        )}
                        <label className={styles.requestFormLabel}>Task</label>
                        <select
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className={styles.requestFormInput}
                        >
                            <option value="GMAO">GMAO</option>
                            <option value="SAS">SAS</option>
                        </select>
                        <button
                            onClick={() => {
                                setSection("ncts");
                                setProgress("40%");
                            }}
                            type="button"
                            className={styles.requestFormButton}
                            disabled={!fullName || !employeeId}
                        >
                            Next
                        </button>
                    </>
                )}
                {section === "ncts" && (
                    <>
                        <h1 className={styles.requestFormTitle}>
                            NASA Conference Travel System
                        </h1>
                        <label className={styles.requestFormLabel}>
                            Conference/Seminar/Workshop in NCTS
                        </label>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    if (ncts) {
                                        setNctsEmail("");
                                        setNctsCode("");
                                        return setNcts(false);
                                    }
                                    return setNcts(true);
                                }}
                            >
                                {ncts && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>Yes</p>
                        </div>
                        {ncts && (
                            <>
                                <label className={styles.requestFormLabel}>
                                    NCTS Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="NCTS Email"
                                    value={nctsEmail}
                                    onChange={(e) =>
                                        setNctsEmail(e.target.value)
                                    }
                                    className={styles.requestFormInput}
                                />
                                <label className={styles.requestFormLabel}>
                                    NCTS Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="NCTS Code"
                                    value={nctsCode}
                                    onChange={(e) =>
                                        setNctsCode(e.target.value)
                                    }
                                    className={styles.requestFormInput}
                                />
                            </>
                        )}
                        <ul className={styles.requestFormVerbage}>
                            <li className={styles.requestFormVerbageItem}>
                                Requests for NASA sponsored travel must be
                                submitted in the NCTS system at least{" "}
                                <span style={{ fontWeight: "700" }}>
                                    60 days in advance
                                </span>
                                .
                            </li>
                            <li className={styles.requestFormVerbageItem}>
                                Forward NCTS notifications to your Travel
                                Administrator upon receipt.
                            </li>
                            <li className={styles.requestFormVerbageItem}>
                                Submit SSAI Travel Request Forms at the same
                                time as the NCTS request.
                            </li>
                            <li className={styles.requestFormVerbageItem}>
                                HTSOS or FACT training may be required if you
                                are traveling to a foreign country. Please
                                contact your Travel Administrator for more
                                information.
                            </li>
                            <li className={styles.requestFormVerbageItem}>
                                Foreign travel may require a CI briefing before
                                travel. Please contact your Travel Administrator
                                for more information.
                            </li>
                            <li className={styles.requestFormVerbageItem}>
                                There is a NAMS workflow, found on ID Max, you
                                must complete to request permission to take a
                                government computer or access NASA data while on
                                foreign travel.
                            </li>
                        </ul>
                        <button
                            onClick={() => {
                                setSection("travel");
                                setProgress("60%");
                            }}
                            type="button"
                            className={styles.requestFormButton}
                            disabled={ncts && (!nctsEmail || !nctsCode)}
                        >
                            Next
                        </button>
                        <button
                            onClick={() => {
                                setSection("general");
                                setProgress("20%");
                            }}
                            type="button"
                            className={styles.requestFormButtonBack}
                        >
                            Back
                        </button>
                    </>
                )}
                {section === "travel" && (
                    <>
                        <h1 className={styles.requestFormTitle}>
                            Travel Information
                        </h1>
                        <label className={styles.requestFormLabel}>
                            Virtual Travel
                        </label>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    if (virtual) {
                                        setProgress("60%");
                                        return setVirtual(false);
                                    }
                                    setProgress("100%");
                                    setType("");
                                    setTravelMethod("");
                                    return setVirtual(true);
                                }}
                            >
                                {virtual && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>Yes</p>
                        </div>
                        {!virtual && (
                            <>
                                <label className={styles.requestFormLabel}>
                                    Travel Type
                                </label>
                                <div className={styles.requestFormRadioText}>
                                    <div
                                        className={styles.requestFormRadio}
                                        onClick={() => {
                                            setProgress("60%");
                                            return setType("foreign");
                                        }}
                                    >
                                        {type === "foreign" && (
                                            <span
                                                className={
                                                    styles.requestFormRadioCheckmark
                                                }
                                            ></span>
                                        )}
                                    </div>
                                    <p className={styles.requestFormText}>
                                        Foreign
                                    </p>
                                </div>
                                <div className={styles.requestFormRadioText}>
                                    <div
                                        className={styles.requestFormRadio}
                                        onClick={() => {
                                            setProgress("80%");
                                            return setType("local");
                                        }}
                                    >
                                        {type === "local" && (
                                            <span
                                                className={
                                                    styles.requestFormRadioCheckmark
                                                }
                                            ></span>
                                        )}
                                    </div>
                                    <p className={styles.requestFormText}>
                                        Local (within 50 miles)
                                    </p>
                                </div>
                                <div className={styles.requestFormRadioText}>
                                    <div
                                        className={styles.requestFormRadio}
                                        onClick={() => {
                                            setProgress("80%");
                                            return setType("domestic");
                                        }}
                                    >
                                        {type === "domestic" && (
                                            <span
                                                className={
                                                    styles.requestFormRadioCheckmark
                                                }
                                            ></span>
                                        )}
                                    </div>
                                    <p className={styles.requestFormText}>
                                        Domestic (over 50 miles)
                                    </p>
                                </div>
                            </>
                        )}
                        {!virtual && (
                            <>
                                <label className={styles.requestFormLabel}>
                                    Travel Method
                                </label>
                                <select
                                    value={travelMethod}
                                    onChange={(e) =>
                                        setTravelMethod(e.target.value)
                                    }
                                    className={styles.requestFormInput}
                                >
                                    <option value="Air">Air</option>
                                    <option value="Train">Train</option>
                                    <option value="Bus">Bus</option>
                                    <option value="Rental Car">
                                        Rental Car
                                    </option>
                                    <option value="Personal Vehicle">
                                        Personal Vehicle
                                    </option>
                                    <option value="Taxi/Uber">Taxi/Uber</option>
                                    <option value="None">None</option>
                                </select>
                            </>
                        )}
                        <label className={styles.requestFormLabel}>
                            Start Date
                        </label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                            }}
                            minDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Today"
                            dateFormat="MM/dd/yyyy"
                            calendarStartDay={1}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            End Date
                        </label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Today"
                            dateFormat="MM/dd/yyyy"
                            calendarStartDay={1}
                            className={styles.requestFormInput}
                        />
                        {date1Hours >= date2Hours && (
                            <p className={styles.requestFormError}>
                                End date must be higher than start date.
                            </p>
                        )}
                        <label className={styles.requestFormLabel}>
                            Number of Nights
                        </label>
                        <p
                            className={styles.requestFormInput}
                            style={{
                                cursor: "not-allowed",
                            }}
                        >
                            {!isNaN(days) && date1Hours < date2Hours
                                ? days.toLocaleString().replaceAll(/[-]/g, "")
                                : `0`}
                        </p>
                        <label className={styles.requestFormLabel}>
                            Origination Street Address
                        </label>
                        <p
                            className={styles.requestFormInput}
                            style={{
                                cursor: "not-allowed",
                            }}
                        >
                            {program === "STARSS"
                                ? "1 Enterprise Parkway, Suite 200"
                                : "10210 Greenbelt Rd., Ste 600"}
                        </p>
                        <label className={styles.requestFormLabel}>
                            Origination City
                        </label>
                        <p
                            className={styles.requestFormInput}
                            style={{
                                cursor: "not-allowed",
                            }}
                        >
                            {program === "STARSS" ? "Hampton" : "Lanham"}
                        </p>
                        <label className={styles.requestFormLabel}>
                            Origination State
                        </label>
                        <p
                            className={styles.requestFormInput}
                            style={{
                                cursor: "not-allowed",
                            }}
                        >
                            {program === "STARSS" ? "Virginia" : "MD"}
                        </p>
                        <label className={styles.requestFormLabel}>
                            Origination Zipcode
                        </label>
                        <p
                            className={styles.requestFormInput}
                            style={{
                                cursor: "not-allowed",
                            }}
                        >
                            {program === "STARSS" ? "23666" : "20706"}
                        </p>
                        <label className={styles.requestFormLabel}>
                            Destination Street Address
                        </label>
                        <input
                            type="text"
                            placeholder="Destination Street Address"
                            value={destinationStreetAddress}
                            onChange={(e) =>
                                setDestinationStreetAddress(e.target.value)
                            }
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Destination City
                        </label>
                        <input
                            type="text"
                            placeholder="Destination City"
                            value={destinationCity}
                            onChange={(e) => setDestinationCity(e.target.value)}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Destination State
                        </label>
                        <input
                            type="text"
                            placeholder="Destination State"
                            value={destinationState}
                            onChange={(e) =>
                                setDestinationState(e.target.value)
                            }
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Destination Zipcode
                        </label>
                        <input
                            type="text"
                            placeholder="Destination Zipcode"
                            value={destinationZipcode}
                            onChange={(e) =>
                                setDestinationZipcode(e.target.value)
                            }
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Justification
                        </label>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    if (
                                        !justificationType.includes(
                                            "Presenting"
                                        )
                                    ) {
                                        return setJustificationType(
                                            justificationType + "Presenting"
                                        );
                                    }
                                    if (
                                        justificationType.includes("Presenting")
                                    ) {
                                        return setJustificationType(
                                            justificationType.replace(
                                                "Presenting",
                                                ""
                                            )
                                        );
                                    }
                                    return setJustificationType("Presenting");
                                }}
                            >
                                {justificationType.includes("Presenting") && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>Presenting</p>
                        </div>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    if (
                                        !justificationType.includes(
                                            "PosterSession"
                                        )
                                    ) {
                                        return setJustificationType(
                                            justificationType + "PosterSession"
                                        );
                                    }
                                    if (
                                        justificationType.includes(
                                            "PosterSession"
                                        )
                                    ) {
                                        return setJustificationType(
                                            justificationType.replace(
                                                "PosterSession",
                                                ""
                                            )
                                        );
                                    }
                                    return setJustificationType(
                                        "PosterSession"
                                    );
                                }}
                            >
                                {justificationType.includes(
                                    "PosterSession"
                                ) && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>
                                Poster Session
                            </p>
                        </div>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    if (
                                        !justificationType.includes(
                                            "MissionSupport"
                                        )
                                    ) {
                                        return setJustificationType(
                                            justificationType + "MissionSupport"
                                        );
                                    }
                                    if (
                                        justificationType.includes(
                                            "MissionSupport"
                                        )
                                    ) {
                                        return setJustificationType(
                                            justificationType.replace(
                                                "MissionSupport",
                                                ""
                                            )
                                        );
                                    }
                                    return setJustificationType(
                                        "MissionSupport"
                                    );
                                }}
                            >
                                {justificationType.includes(
                                    "MissionSupport"
                                ) && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>
                                Mission Support
                            </p>
                        </div>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    if (
                                        !justificationType.includes(
                                            "ChairPerson"
                                        )
                                    ) {
                                        return setJustificationType(
                                            justificationType + "ChairPerson"
                                        );
                                    }
                                    if (
                                        justificationType.includes(
                                            "ChairPerson"
                                        )
                                    ) {
                                        return setJustificationType(
                                            justificationType.replace(
                                                "ChairPerson",
                                                ""
                                            )
                                        );
                                    }
                                    return setJustificationType("ChairPerson");
                                }}
                            >
                                {justificationType.includes("ChairPerson") && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>
                                Chair Person
                            </p>
                        </div>
                        <input
                            type="text"
                            placeholder="Justification"
                            value={justification}
                            onChange={(e) => setJustification(e.target.value)}
                            className={styles.requestFormInput}
                        />
                        {type === "foreign" && (
                            <ul className={styles.requestFormVerbage}>
                                <li className={styles.requestFormVerbageItem}>
                                    Submit SSAI Travel Request Forms for
                                    international travel at least{" "}
                                    <span
                                        style={{
                                            fontWeight: "700",
                                        }}
                                    >
                                        35 days in advance
                                    </span>
                                    .
                                </li>
                                <li className={styles.requestFormVerbageItem}>
                                    Ensure that your passport and visa are
                                    valid; passports often need to be valid for
                                    at least 6 months BEYOND travel dates.
                                </li>
                                <li className={styles.requestFormVerbageItem}>
                                    Check for any travel advisories before
                                    leaving on international travel.
                                </li>
                                <li className={styles.requestFormVerbageItem}>
                                    Register travel with the U.S. State
                                    Department`s Smart Traveler Enrollment
                                    Program (STEP).
                                </li>
                                <li className={styles.requestFormVerbageItem}>
                                    Computer security best practices are that
                                    employees take ACES or SSAI loaner laptops
                                    on foreign travel rather than their usual
                                    machines. Goddard has a document that
                                    contains helpful information.
                                </li>
                            </ul>
                        )}
                        {virtual ? (
                            <button
                                type="submit"
                                className={styles.requestFormButton}
                                disabled={
                                    loading ||
                                    !destinationCity ||
                                    !destinationState ||
                                    !destinationStreetAddress ||
                                    !destinationZipcode ||
                                    !justificationType
                                }
                            >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setSection("cost");
                                    if (type !== "foreign") {
                                        return setProgress("100%");
                                    } else {
                                        return setProgress("80%");
                                    }
                                }}
                                type="button"
                                className={styles.requestFormButton}
                                disabled={
                                    !type ||
                                    !destinationCity ||
                                    !destinationState ||
                                    !destinationStreetAddress ||
                                    !destinationZipcode ||
                                    !justificationType
                                }
                            >
                                Next
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setSection("ncts");
                                setProgress("40%");
                            }}
                            type="button"
                            className={styles.requestFormButtonBack}
                        >
                            Back
                        </button>
                    </>
                )}
                {section === "cost" && (
                    <>
                        <h1 className={styles.requestFormTitle}>
                            Estimated Cost
                        </h1>
                        <label className={styles.requestFormLabel}>
                            Transport Cost
                        </label>
                        <input
                            type="text"
                            placeholder="Transport Cost"
                            value={transportCost}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setTransportCost(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Rental Cost
                        </label>
                        <input
                            type="text"
                            placeholder="Rental Cost"
                            value={rentalCost}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setRentalCost(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Mileage Cost
                        </label>
                        <input
                            type="text"
                            placeholder="Mileage Cost"
                            value={mileageCost}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setMileageCost(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Lodging Cost
                        </label>
                        <input
                            type="text"
                            placeholder="Lodging Cost"
                            value={lodgingCost}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setLodgingCost(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Meals Cost
                        </label>
                        <input
                            type="text"
                            placeholder="Meals Cost"
                            value={mealsCost}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setMealsCost(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Registration Fees
                        </label>
                        <input
                            type="text"
                            placeholder="Registration Fees"
                            value={registrationFees}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setRegistrationFees(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>
                            Other Cost
                        </label>
                        <input
                            type="text"
                            placeholder="Other Cost"
                            value={otherCost}
                            onChange={(e) => {
                                if (
                                    e.target.value === "" ||
                                    onlyNumberRegex.test(e.target.value)
                                ) {
                                    setOtherCost(e.target.value);
                                }
                            }}
                            className={styles.requestFormInput}
                        />
                        <label className={styles.requestFormLabel}>Total</label>
                        <p
                            className={styles.requestFormInput}
                            style={{ cursor: "not-allowed" }}
                        >
                            {Number(transportCost) +
                                Number(rentalCost) +
                                Number(mileageCost) +
                                Number(lodgingCost) +
                                Number(mealsCost) +
                                Number(registrationFees) +
                                Number(otherCost)}
                        </p>
                        <div
                            className={styles.requestFormRadioText}
                            style={{ marginTop: "15px" }}
                        >
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    setAdvanceAmount("");
                                    return setAdvance(!advance);
                                }}
                            >
                                {advance && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>
                                Travel Advance
                            </p>
                        </div>
                        {advance && (
                            <>
                                <label className={styles.requestFormLabel}>
                                    Travel Advance Amount
                                </label>
                                <input
                                    type="text"
                                    placeholder="Travel Advance Amount"
                                    value={advanceAmount}
                                    onChange={(e) => {
                                        if (
                                            e.target.value === "" ||
                                            onlyNumberRegex.test(e.target.value)
                                        ) {
                                            setAdvanceAmount(e.target.value);
                                        }
                                    }}
                                    className={styles.requestFormInput}
                                />
                            </>
                        )}
                        {total < advanceAmount && (
                            <p className={styles.requestFormError}>
                                Advance amount must be lower than total cost.
                            </p>
                        )}
                        {type !== "foreign" ? (
                            <button
                                type="submit"
                                className={styles.requestFormButton}
                                disabled={
                                    loading ||
                                    (advance &&
                                        (advanceAmount > total ||
                                            !advanceAmount)) ||
                                    total === 0
                                }
                            >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setSection("regulatory");
                                    setProgress("100%");
                                }}
                                type="button"
                                className={styles.requestFormButton}
                                disabled={
                                    loading ||
                                    (advance &&
                                        (advanceAmount > total ||
                                            !advanceAmount)) ||
                                    total === 0
                                }
                            >
                                Next
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setSection("travel");
                                if (type !== "foreign")
                                    return setProgress("80%");
                                setProgress("60%");
                            }}
                            type="button"
                            className={styles.requestFormButtonBack}
                        >
                            Back
                        </button>
                    </>
                )}
                {section === "regulatory" && (
                    <>
                        <h1 className={styles.requestFormTitle}>Regulatory</h1>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    return setCiBrief(!ciBrief);
                                }}
                            >
                                {ciBrief && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>CI Brief</p>
                        </div>
                        <div className={styles.requestFormRadioText}>
                            <div
                                className={styles.requestFormRadio}
                                onClick={() => {
                                    return setItEquipment(!itEquipment);
                                }}
                            >
                                {itEquipment && (
                                    <span
                                        className={
                                            styles.requestFormRadioCheckmark
                                        }
                                    ></span>
                                )}
                            </div>
                            <p className={styles.requestFormText}>
                                IT Equipment
                            </p>
                        </div>
                        <label className={styles.requestFormLabel}>
                            Visa Status
                        </label>
                        <select
                            value={visa}
                            onChange={(e) => setVisa(e.target.value)}
                            className={styles.requestFormInput}
                        >
                            <option value="Not required">Not required</option>
                            <option value="Pending">Pending</option>
                            <option value="Valid">Valid</option>
                        </select>
                        <button
                            type="submit"
                            className={styles.requestFormButton}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                        <button
                            onClick={() => {
                                setSection("cost");
                                setProgress("80%");
                            }}
                            type="button"
                            className={styles.requestFormButtonBack}
                        >
                            Back
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default RequestTravelForm;
