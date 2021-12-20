
const Layout = ({children}: any) => {
    return (
        <>
          <header>
            <ul>
              <li>1</li>
              <li>2</li>
            </ul>
          </header>
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