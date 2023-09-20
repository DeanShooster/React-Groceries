import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { routing } from "../../constants/routing";

import "./index.scss";

export const Header = () => {
  const [location, setLocation] = useState<string>();
  const [buttonText, setButtonText] = useState<string>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLocation(pathname === routing.Home.path ? routing.Home.name : routing.Store.name);
    setButtonText(pathname === routing.Home.path ? routing.Store.name : routing.Home.name);
  }, [pathname]);

  const navigationHandler = () => navigate(pathname === routing.Home.path ? routing.Store.path : routing.Home.path);

  return (
    <header>
      <h1>{location}</h1>
      <button onClick={navigationHandler}>ל{buttonText}</button>
    </header>
  );
};
