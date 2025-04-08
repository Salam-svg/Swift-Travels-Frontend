import React from "react";
import FuzzyText from "../../animations/FuzzyText/FuzzyText";
import { Link } from "react-router-dom";

const Notfound = () => {
    const hoverIntensity =  0.5
    const enableHover = true; 
  return (
   <div>
     <div style={{
        marginTop: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Josefin Sans",
        fontWeight: "bold",
        marginBottom: "90px"
    }}>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
      >
        404
      </FuzzyText>
    </div>
    <div style={{
        justifyContent: "center",
        alignItems: "center",   
    }}>
    <h1>Page Not Found</h1>

      <p>Please try searching for something else or visiting our <Link style={{
        textDecoration: "none",
        color: "rgb(105, 16, 87)"
      }} className="text-purple-50" to="/">Home</Link>.</p>
    </div>
   </div>
  );
};

export default Notfound;
