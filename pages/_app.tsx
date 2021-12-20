import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {motion} from "framer-motion"
import Layout from "../layout";

const App = ({ Component, pageProps, router }: AppProps) => {
  const ani = {
      pageInitial: {
          y: -200,
          opacity: 0
      },
      pageAnimate: {
          y: 0,
          opacity: 1
      },
  }

  return (
      <Layout>
          <motion.div key={router.route}
                      initial="pageInitial"
                      animate="pageAnimate"
                      variants={ani}
          >
              <Component {...pageProps} />
          </motion.div>
      </Layout>
  )
}

export default App
