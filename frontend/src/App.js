import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Container } from "react-bootstrap"
import { AllRoutes } from "./routes/AllRoutes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <AllRoutes />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}
