import { useState, FC } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import StyledInput from "./StyledInput"
import { sleep, isRandomlyRejected } from "../utils"

const validationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .matches(/^([^0-9]*)$/, "*Name should not have a number")
        .required("*Required"),
    email: Yup.string()
        .email("*Oops! Email doesn't look right")
        .required("*Required"),
    confirmEmail: Yup.string()
        .oneOf([Yup.ref("email")], "*Email does not match")
        .required("*Required"),
})

type closeProp = {
    close: () => void
}

const ExitPopup: FC<closeProp> = ({ close }): JSX.Element => {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Thank you!</h1>
            <p>Please keep an eye for your first class ticket on your email</p>
            <button onClick={close}>OK</button>
        </div>
    )
}

const form = ({ isSubmitting = false }) => {
    return (
        <Form>
            <StyledInput aria-label="Name" name="name" placeholder="Name" />
            <StyledInput
                aria-label="Email"
                name="email"
                type="email"
                placeholder="Email"
            />
            <StyledInput
                aria-label="Confirm email"
                name="confirmEmail"
                type="email"
                placeholder="Confirm Email"
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Requesting..." : "Send"}
            </button>
        </Form>
    )
}

const RequestPassForm: FC<closeProp> = ({ close }) => {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [requestFailed, setRequestFailed] = useState(false)

    if (formSubmitted) {
        return <ExitPopup close={close} />
    }

    const errorMessage = requestFailed && (
        <div> Something failed from the server. Try again.</div>
    )

    return (
        <div style={{ textAlign: "center" }}>
            <h1> Request a pass</h1>
            <Formik
                initialValues={{ email: "", name: "", confirmEmail: "" }}
                validationSchema={validationSchema}
                onSubmit={async _values => {
                    setRequestFailed(false)
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
export { sleep, isRandomlyRejected }
