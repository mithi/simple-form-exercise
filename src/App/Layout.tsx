const Layout = ({ mainContent, headerContent, footerContent }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <header
                style={{
                    fontSize: "20px",
                    marginLeft: "20px",
                    marginTop: "20px",
                    marginBottom: "10px",
                    textAlign: "left",
                }}
            >
                {headerContent}
            </header>
            <hr />
            <main
                style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {mainContent}
            </main>
            <hr />
            <footer
                style={{
                    textAlign: "center",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            >
                {footerContent}
            </footer>
        </div>
    )
}

export default Layout
