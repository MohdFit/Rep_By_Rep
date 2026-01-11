import Header from "../../components/Header";
import Sidebar from "./UserSideBar";
import "../../assets/styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="main-section">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
