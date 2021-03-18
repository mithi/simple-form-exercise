import Layout from "./Layout"

const App = () => {
    const footerContent = (
        <>
            <span> Start your day with {"☕"}</span>
            <br />
            <span> ABC Group. All rights reserved.</span>
        </>
    )

    const mainContent = (
        <div style={{ width: "500px", textAlign: "center" }}>
            <h1>Lorem Ipsum dolor sit amet consectetur adipiscing</h1>
            <div>Get your front row sneak peak with us!</div>
        </div>
    )

    return (
        <Layout headerContent="ABC Group" {...{ footerContent, mainContent }} />
    )
}

export default App
