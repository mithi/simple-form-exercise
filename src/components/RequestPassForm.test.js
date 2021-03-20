import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RequestPassForm from "./RequestPassForm"

const close = jest.fn()
const requestPassForm = <RequestPassForm {...{ close }} />

describe("RequestPassForm", () => {
    test("Has the expected elements (title, input fields, submit button) to be rendered", () => {
        render(requestPassForm)

        const title = screen.getByText(/request a pass/i)
        expect(title).toBeInTheDocument()

        const nameInputField = screen.getByRole("textbox", { name: /name/i })
        expect(nameInputField).toBeInTheDocument()
        const emailInputField = screen.getByRole("textbox", { name: "Email" })
        expect(emailInputField).toBeInTheDocument()

        const confirmEmailInputField = screen.getByRole("textbox", {
            name: /Confirm Email/i,
        })

        expect(confirmEmailInputField).toBeInTheDocument()

        const submitButton = screen.getByRole("button", { name: /send/i })
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).not.toBeDisabled()
    })

    test("Typing a number in the name input field will display an error", async () => {
        const textWithNumber = "aa1"
        const errorMessage = "*Name should not have a number"
        render(requestPassForm)
        const nameInputField = screen.getByRole("textbox", { name: /name/i })
        userEvent.type(nameInputField, `${textWithNumber}{enter}`)

        await waitFor(() =>
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        )
    })

    test("Typing and entering nothing on name input field will result an error", async () => {
        const errorMessage = "*Required"
        render(requestPassForm)
        const inputField = screen.getByRole("textbox", { name: /name/i })
        userEvent.type(inputField, "{enter}")

        await waitFor(() =>
            expect(screen.getAllByText(errorMessage)).toBeTruthy()
        )
    })

    test("Typing and entering nothing on email input field will result an error", async () => {
        const errorMessage = "*Required"
        render(requestPassForm)
        const inputField = screen.getByRole("textbox", { name: "Email" })
        userEvent.type(inputField, "{enter}")

        await waitFor(() =>
            expect(screen.getAllByText(errorMessage)).toBeTruthy()
        )
    })

    test("Typing and entering nothing on confirm email input field will result an error", async () => {
        const errorMessage = "*Required"
        render(requestPassForm)
        const inputField = screen.getByRole("textbox", {
            name: /Confirm Email/i,
        })
        userEvent.type(inputField, "{enter}")

        await waitFor(() =>
            expect(screen.getAllByText(errorMessage)).toBeTruthy()
        )
    })

    test("Typing an invalid email formant on the email input field will result an error", async () => {
        const invalidEmail = "@.com"
        const errorMessage = "*Oops! Email doesn't look right"
        render(requestPassForm)
        const inputField = screen.getByRole("textbox", { name: "Email" })
        userEvent.type(inputField, `${invalidEmail}{enter}`)

        await waitFor(() =>
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        )
    })

    test("Email mismatch will result an error", async () => {
        const errorMessage = "*Email does not match"
        const email = "x@x.com"
        const confirmEmail = "x@y.com"

        render(requestPassForm)

        const emailField = screen.getByRole("textbox", { name: "Email" })
        const confirmEmailField = screen.getByRole("textbox", {
            name: /Confirm Email/i,
        })

        userEvent.type(emailField, `${email}{enter}`)
        userEvent.type(confirmEmailField, `${confirmEmail}{enter}`)

        await waitFor(() =>
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        )
    })
})
