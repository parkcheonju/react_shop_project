import 'antd/dist/antd.css'; 
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";
import UploadPage from "./components/UploadPage";
function App() {
	return (
		<div>
			<div id="header">
				<div id="header-area">
					<img src="images/icons/logo.png" alt="" />
				</div>
			</div>

			<Routes>
				<Route path="/" element={<MainPage />}></Route>
				<Route path="/ProductPage/:id" element={<ProductPage />}></Route>
				<Route path="/UploadPage" element={<UploadPage />}></Route>
			</Routes>
			<div id="footer">
				<a href="#none">회사소개</a>
				<a href="#none">이용약관</a>
				<a href="#none">통신판매업신고번호:123-1234</a>
				<a href="#none">사업자등록번호:456-56-78951</a>
				<a href="#none">고객센터:456-78951</a>
			</div>
		</div>
	);
}

export default App;
