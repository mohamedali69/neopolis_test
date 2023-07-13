import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ImageProvider } from "./components/context/ImageContext";
import Home from "./components/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <ImageProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ImageProvider>
  );
}

export default App;
