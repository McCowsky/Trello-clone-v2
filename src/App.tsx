import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import Navbar from "@/components/navbar/Navbar";
import { routes } from "@/router/routes";

const location = new ReactLocation();

const App: React.FC = () => {
  return (
    <div className="h-full bg-[#0079BF] min-w-full w-fit flex flex-col">
      <Router routes={routes} location={location}>
        <Navbar />
        <div className=" h-full w-full ">
          <Outlet />
        </div>
      </Router>
    </div>
  );
};

export default App;
