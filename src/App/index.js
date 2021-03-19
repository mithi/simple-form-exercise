import "@reach/dialog/styles.css"
import { useState } from "react"
import { Dialog } from "@reach/dialog"
import Layout from "./Layout"
import RequestPassForm from "../components/RequestPassForm"

function RequestPassModal() {
    const [showDialog, setShowDialog] = useState(false)
    const open = () => setShowDialog(true)
    const close = () => setShowDialog(false)
    return (
        <>
            <button onClick={open}>Request a pass</button>
            <Dialog
                aria-label="Request a Pass Modal"
                isOpen={showDialog}
                onDismiss={close}
            >
                <RequestPassForm close={close} />
            </Dialog>
        </>
    )
}

const App = () => {
    const footerContent = (
        <>
            <div> Start your day with {"☕"}</div>
            <div> ABC Group. All rights reserved.</div>
        </>
    )

    const mainContent = (
        <div style={{ width: "500px" }}>
            <h1>Lorem Ipsum dolor sit amet consectetur adipiscing</h1>
            <div>Get your front row sneak peak with us!</div>
            <RequestPassModal />
        </div>
    )

    return (
        <Layout headerContent="ABC Group" {...{ footerContent, mainContent }} />
    )
}

export default App
