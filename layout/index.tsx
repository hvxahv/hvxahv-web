import Header from "./header";

const Layout = ({children}: any) => {
    return (
        <>
          <Header />
          <div style={{ margin: `1rem`}}>
            {children}
          </div>
          <footer>
            <p>hvxahv - half memories</p>
          </footer>
        </>
    )
}
export default Layout