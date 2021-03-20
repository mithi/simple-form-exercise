import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"
import { isRandomlyRejected, sleep } from "../utils"
jest.mock("../utils")

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

    test("A successful submission process should work as expected'", async () => {
        isRandomlyRejected.mockReturnValue(false)
        sleep.mockReturnValue(null)
        render(<App />)
        const correctName = "Mithi"
        const correctEmail = "mithi.sevilla@gmail.com"

        const button = screen.getByRole("button", { name: /request a pass/i })
        userEvent.click(button)

        const nameInputField = screen.getByRole("textbox", { name: /name/i })
        const emailInputField = screen.getByRole("textbox", { name: "Email" })
        const confirmEmailInputField = screen.getByRole("textbox", {
            name: /Confirm Email/i,
        })

        userEvent.type(nameInputField, correctName)
        userEvent.type(emailInputField, correctEmail)
        userEvent.type(confirmEmailInputField, correctEmail)

        const sendButton = screen.getByRole("button", { name: /send/i })
        userEvent.click(sendButton)
        await waitFor(() => expect(sendButton).toHaveTextContent(/requesting/i))
        expect(
            screen.getByRole("heading", { name: /thank you/i })
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                /Please keep an eye for your first class ticket on your email/i
            )
        ).toBeInTheDocument()

        expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument()

        userEvent.click(screen.getByRole("button", { name: /ok/i }))
        expect(
            screen.queryByRole("dialog", { name: "Request a Pass Modal" })
        ).not.toBeInTheDocument()

        landingPageExpect()
    })

    test("A submission process with server error should work as expected'", async () => {
        isRandomlyRejected.mockReturnValue(true)
        sleep.mockReturnValue(null)
        render(<App />)
        const correctName = "Mithi"
        const correctEmail = "mithi.sevilla@gmail.com"

        const button = screen.getByRole("button", { name: /request a pass/i })
        userEvent.click(button)

        const nameInputField = screen.getByRole("textbox", { name: /name/i })
        const emailInputField = screen.getByRole("textbox", { name: "Email" })
        const confirmEmailInputField = screen.getByRole("textbox", {
            name: /Confirm Email/i,
        })

        userEvent.type(nameInputField, correctName)
        userEvent.type(emailInputField, correctEmail)
        userEvent.type(confirmEmailInputField, correctEmail)

        const sendButton = screen.getByRole("button", { name: /send/i })
        userEvent.click(sendButton)
        expect(sendButton).toBeDisabled()
        await waitFor(() => expect(sendButton).toHaveTextContent(/requesting/i))

        await waitFor(() =>
            expect(
                screen.getByText("Something failed from the server. Try again.")
            ).toBeInTheDocument()
        )
    })
})
