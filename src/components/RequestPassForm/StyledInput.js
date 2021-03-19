import { useField } from "formik"

const inputContainer = {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
}

const StyledInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    const errorMessage = meta.touched && meta.error && (
        <div style={{ fontSize: "12px", color: "red" }}>{meta.error}</div>
    )

    return (
        <div style={inputContainer}>
            <input
                {...field}
                {...props}
                style={inputContainer}
                aria-label={label}
            />
            <div style={{ height: "15px" }}>{errorMessage}</div>
        </div>
    )
}

export default StyledInput
