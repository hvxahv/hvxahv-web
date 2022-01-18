import Header from "./header";

const Layout = ({children}: any) => {
    return (
        <>
          <Header />
          <div>
            {children}
          </div>
          <footer>
            <p>hvxahv - half memories</p>
          </footer>
        </>
    )
}
export default Layout