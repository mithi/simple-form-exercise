import {
    render,
    screen,
    //    waitFor,
    //    waitForElementToBeRemoved,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"
//import { isRandomlyRejected, sleep } from "../utils"
//jest.mock("../utils")

/*
TEST: exiting the modal
click request a pass
clicking outside the modal (document body)
will exit the modal (we wont see the elements in (1))


TEST
- clicking the submit button with all correct field values will trigger the "requesting.." text on the button and be disabled
- When success the modal will change to the exit popup view (which has an OK button etc), clicking the OK button will close the pop up
- When error, the modal will show the same components (button, input fields, header) and show text that there is a problem with the server

TEST:
clicking the submit button with atleast one field blank, the modal will still be opened and show error)
clicking the submit buton with
- name has number will do the same
- invalid email will do the same
- email does not match will do the same
*/

const landingPageExpect = () => {
    expect(screen.getByRole("banner")).toHaveTextContent("ABC Group")
    expect(screen.getByRole("heading")).toHaveTextContent(
        "Lorem ipsum dolor sit amet, consectetur adipiscing"
    )

    expect(screen.getByRole("main")).toHaveTextContent(
        "Get a front row sneak peek with us!"
    )

    const button = screen.getByRole("button", { name: /request a pass/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
        "Start your day with ☕"
    )
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
        "ABC Group. All rights reserved."
    )
}

const modalExpect = () => {
    expect(
        screen.getByRole("heading", { name: /request a pass/i })
    ).toBeInTheDocument()

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
}

describe("App", () => {
    test("On page load expected elements are displayed", () => {
        render(<App />)
        landingPageExpect()
    })

    test("Clicking the button will open the modal with the expected html elements", () => {
        render(<App />)

        expect(
            screen.queryByRole("dialog", { name: "Request a Pass Modal" })
        ).not.toBeInTheDocument()

        const button = screen.getByRole("button", { name: /request a pass/i })
        userEvent.click(button)

        expect(
            screen.getByRole("dialog", { name: "Request a Pass Modal" })
        ).toBeInTheDocument()

        modalExpect()
    })

    test("Clicking outside the modal should close the modal", async () => {
        render(<App />)
        const button = screen.getByRole("button", { name: /request a pass/i })
        userEvent.click(button)

        expect(
            screen.getByRole("dialog", { name: "Request a Pass Modal" })
        ).toBeInTheDocument()

        userEvent.click(
            screen.getByRole("dialog", { name: "Request a Pass Modal" })
                .parentElement
        )

        expect(
            screen.queryByRole("dialog", { name: "Request a Pass Modal" })
        ).not.toBeInTheDocument()
    })
})
