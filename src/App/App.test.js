import {
    render,
    screen,
    //    waitFor,
    //    waitForElementToBeRemoved,
} from "@testing-library/react"
//import userEvent from "@testing-library/user-event"
import App from "../App"
//import { willRandomlyReject, sleep } from "../hooks/utils"
//jest.mock("../hooks/utils")
/*

TEST: Entering the modal

click request a pass

1. should be on page:
- Header request a pass
- button: send, not disabled
- input with name: name
- input with name: email
- input with name: confirmEmail
each input should have value=""
each input has appropriate placeholder and aria-label
- input with name is focused

TEST: exiting the modal
click request a pass
clicking outside the modal (document body)
will exit the modal (we wont see the elements in (1))


TEST
- clicking the submit button with no correct field values will trigger the "requesting.." text on the button and be disabled
- When success the modal will change to the exit popup view (which has an OK button etc), clicking the OK button will close the pop up
- When error, the modal will show the same components (button, input fields, header) and show text that there is a problem with the server

TEST:
clicking the submit button with atleast one field blank, the modal will still be opened and show error)
clicking the submit buton with
- name has number will do the same
- invalid email will do the same
- email does not match will do the same
*/

describe("App", () => {
    test("On page load expected elements are displayed", () => {
        render(<App />)
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
    })
})
