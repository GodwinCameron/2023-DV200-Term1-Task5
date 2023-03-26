import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="main">
          <p>Vertical Bar graph:</p>
          <Link to={"/vertical-bar-chart"}><button className="chart-btn">First 10 Flight Payload Masses</button></Link>
          <br/>
          <p>Doughnut graph:</p>
          <Link to={"/doughnut-chart"}><button className="chart-btn">Flight 10-15 Payload Masses</button></Link>
          <br/>
          <p>Scatter graph:</p>
          <Link to={"/scatter-chart"}><button className="chart-btn">Flight 15-25 Orbitals</button></Link>
          <br/>
          <p>Polar Area graph:</p>
          <Link to={"/polar-area-chart"}><button className="chart-btn">Flight 25-45 Orbit Lifespan</button></Link>
          <br/>
          <p>Horizontal Bar graph:</p>
          <Link to={"/horizontal-bar-chart"}><button className="chart-btn">Flight 45-60 Orbit Axis</button></Link>
        </div>
      );
}

export default Landing;