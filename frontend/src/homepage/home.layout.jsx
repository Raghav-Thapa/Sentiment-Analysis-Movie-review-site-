import { Outlet } from "react-router-dom";
import Header from "./header.component";

// import Footer from "../home/components/footer.component"

const HomePageLayout = () => {
  return (
    <>
      <Header />

      <Outlet />

      {/* <Footer/> */}
    </>
  );
};

export default HomePageLayout;
