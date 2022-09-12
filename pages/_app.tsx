import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { faTrashCan, faPen, faCalendarCheck, faMoon, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(faTrashCan, faPen, faCalendarCheck, faMoon, faTriangleExclamation, faXmark)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
