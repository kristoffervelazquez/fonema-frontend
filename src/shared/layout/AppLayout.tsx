import { Box } from "@mui/material"
import Footer from "./components/Footer"
import Header from "./components/Header"



const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>

  )
}

export default AppLayout