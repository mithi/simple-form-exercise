import { CSSProperties, FC } from "react"
import { FieldHookConfig, useField } from "formik"

const inputContainer: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
}

const StyledInput: FC<FieldHookConfig<string>> = (props): JSX.Element => {
    const [field, meta] = useField(props)
    const { name, type, placeholder } = props

    const errorMessage = meta.touched && meta.error && (
        <div style={{ fontSize: "12px", color: "red" }}>{meta.error}</div>
    )

    return (
        <div style={inputContainer}>
            <input
                {...field}
                {...{ name, type, placeholder }}
                aria-label={props["aria-label"]}
                style={inputContainer}
            />
            <div style={{ height: "25px" }}>{errorMessage}</div>
        </div>
    )
}

export default StyledInput
