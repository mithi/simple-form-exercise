import { render, screen } from "@testing-library/react"
import App from "."

test("Renders lorem ipsum text", () => {
    render(<App />)
    const bannerMessageNode = screen.getByText(
        /Lorem Ipsum dolor sit amet consectetur adipiscing/i
    )
    expect(bannerMessageNode).toBeInTheDocument()
})
