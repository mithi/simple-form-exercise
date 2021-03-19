import { useState } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import StyledInput from "./StyledInput"

const sleep = ms => new Promise(r => setTimeout(r, ms))
const isRandomlyRejected = () => (Math.random() > 0.5 ? true : false)

const nameErrorMessage = "*Name should only contain letters and spaces"

const validationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .matches(/^[a-zA-Z\s]*$/, nameErrorMessage)
        .required("*Required"),
    email: Yup.string()
        .email("*Oops! Email doesn't look right")
        .required("*Required"),
    confirmEmail: Yup.string()
        .oneOf([Yup.ref("email")], "*Email does not match")
        .required("*Required"),
})

const ExitPopup = ({ close }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Thank you!</h1>
            <p>Please keep an eye for your first class ticket on your email</p>
            <button onClick={close}>ok</button>
        </div>
    )
}

const form = ({ isSubmitting }) => {
    return (
        <Form>
            <StyledInput label="Name" name="name" placeholder="Name" />
            <StyledInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
            />
            <StyledInput
                label="Confirm email"
                name="confirmEmail"
                type="email"
                placeholder="Confirm Email"
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Requesting..." : "Submit"}
            </button>
        </Form>
    )
}

const RequestPassForm = ({ close }) => {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [requestFailed, setRequestFailed] = useState(false)

    if (formSubmitted) {
        return <ExitPopup close={close} />
    }

    const errorMessage = requestFailed && (
        <div> Something failed form the server. Try again.</div>
    )

    return (
        <div style={{ textAlign: "center" }}>
            <h1> Request a Pass</h1>
            <Formik
                initialValues={{ email: "", name: "", confirmEmail: "" }}
                validationSchema={validationSchema}
                onSubmit={async _values => {
                    await sleep(3000)
                    isRandomlyRejected()
                        ? setRequestFailed(true)
                        : setFormSubmitted(true)
                }}
            >
                {form}
            </Formik>
            {errorMessage}
        </div>
    )
}

export default RequestPassForm
