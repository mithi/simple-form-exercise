import {
    render,
    screen,
    //    waitFor,
    //    waitForElementToBeRemoved,
} from "@testing-library/react"
//import userEvent from "@testing-library/user-event"

import RequestPassForm from "./RequestPassForm"

/*

TEST: no number on input field

type text without a number in name input field, no error
type text with a number in name input field show error (no number)
go back and type nothing show error (required)

TEST:

in the email input field,
after typing invalid email format and then blur, it will show the error
after typing blank,  it will show error (required)
after typing with valid email format, no error


TEST:
in the email field type a valid email
in the confirmEmail field, type non matching email, error will show
in the confirmEmail field, type matching email, no error
(required)

TEST:
clicking the submit button with atleast one field blank, the modal will still be opened and show error)
clicking the submit buton with
- name has number will do the same
- invalid email will do the same
- email does not match will do the same
*/

const close = jest.fn()
const requestPassForm = <RequestPassForm {...{ close }} />

describe("RequestPassForm", () => {
    test("has the expected elements (title, input fields, submit button) to be rendered", async () => {
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
    /*test("Test", async () => {})*/
})
