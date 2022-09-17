import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./Video";
import Homepage from "./Homepage";
import Diaries from "./Diaries";
import Example from "./Example";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/record" element={<Video />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/diaries/9-18" element={<Example />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
