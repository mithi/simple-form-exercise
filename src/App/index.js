import "@reach/dialog/styles.css"
import { useState } from "react"
import { Dialog } from "@reach/dialog"
import Layout from "./Layout"

function ModalExample() {
    const [showDialog, setShowDialog] = useState(false)
    const open = () => setShowDialog(true)
    const close = () => setShowDialog(false)
    return (
        <div>
            <button onClick={open}>Request a pass</button>
            <Dialog
                aria-label="Thank you! Please keep an eye for your first class ticket on your email "
                isOpen={showDialog}
                onDismiss={close}
                style={{ textAlign: "center" }}
            >
                <h1>Thank you!</h1>
                <p>
                    Please keep an eye for your first class ticket on your email
                </p>
                <button onClick={close}>ok</button>
            </Dialog>
        </div>
    )
}

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
            <ModalExample />
        </div>
    )

    return (
        <Layout headerContent="ABC Group" {...{ footerContent, mainContent }} />
    )
}

export default App
