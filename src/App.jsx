import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster, toast } from "sonner";
import HomePage from "./pages/HomePage";
import MasterLayout from "./components/layout/MasterLayout";
import NotFound from "./pages/NotFound";

function App() {
  return(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />} >
          <Route index element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </>
  ) 
}

export default App;
