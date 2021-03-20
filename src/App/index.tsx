import "@reach/dialog/styles.css"
import { useState, FC } from "react"
import { Dialog } from "@reach/dialog"
import Layout from "./Layout"
import RequestPassForm from "../components/RequestPassForm"

const RequestPassModal: FC = (): JSX.Element => {
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
                style={{ minWidth: "275px", maxWidth: "500px" }}
            >
                <RequestPassForm close={close} />
            </Dialog>
        </>
    )
}

const App: FC = (): JSX.Element => {
    const footerContent = (
        <>
            <div> Start your day with {"☕"}</div>
            <div> ABC Group. All rights reserved.</div>
        </>
    )

    const mainContent = (
        <div style={{ width: "500px" }}>
            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing</h1>
            <div>Get a front row sneak peek with us!</div>
            <RequestPassModal />
        </div>
    )

    return (
        <Layout
            headerContent={<>ABC Group</>}
            {...{ footerContent, mainContent }}
        />
    )
}

export default App
