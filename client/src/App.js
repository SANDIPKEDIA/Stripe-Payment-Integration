import Failed from './Failed';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from './Payment';
import Success from './Success';
export default function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
    </Routes>
  </BrowserRouter>

  );
};
