// import React from "react";
// import FaceExpression from "../../features/Expression/components/FaceExpression";
// import Player from "../components/Player";

// const Home = () => {
//   return (
//     <>
//       <FaceExpression />
//       <Player />
//     </>
//   );
// };

// export default Home;
import React from "react";
import FaceExpression from "../../features/Expression/components/FaceExpression";
import Hero from "../components/Hero";
import Tracks from "../components/Tracks";
import Library from "../components/Library";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tracks />
      <Library />
      <Footer />
      {/* <FaceExpression /> */}
    </div>
  );
};

export default Home;