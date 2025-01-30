import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Premium from "./components/Premium";
import CE from "./pages/CE";
import IT from "./pages/IT";
import Electrical from "./pages/Electrical";



const Container = styled.div`
display: flex;
`
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  
`
const Wrapper = styled.div`
  padding: 22px 96px;
`

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
          <Navbar />

              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random" />} />
                    <Route path="trends" element={<Home type="trend" />} />
                    <Route path="subscriptions" element={<Home type="sub" />} />
                    <Route path="search" element={<Search />} />
                    <Route path="ce" element={<CE />} />
                    <Route path="it" element={<IT />} />
                    <Route path="electrical" element={<Electrical />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="premium" element={<Premium />} />
                    <Route path="videos">
                      <Route path=":id" element={<Video />} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
            
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App;
