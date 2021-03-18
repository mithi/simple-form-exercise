const Layout = ({ mainContent, headerContent, footerContent }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <header style={{ fontSize: "20px", margin: "15px" }}>
                {headerContent}
            </header>
            <main
                style={{
                    flexGrow: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {mainContent}
            </main>
            <footer style={{ textAlign: "center", margin: "15px" }}>
                {footerContent}
            </footer>
        </div>
    )
}

export default Layout
