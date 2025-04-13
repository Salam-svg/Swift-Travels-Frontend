import React from "react";
import Masonry from "../../../animations/Mansory/Masonry";

const Services = () => {
  const data = [
    { id: 1, image: "https://images.pexels.com/photos/3049882/pexels-photo-3049882.jpeg?auto=compress&cs=tinysrgb&w=600", height: 400 },
    { id: 2, image: "https://images.pexels.com/photos/31027367/pexels-photo-31027367/free-photo-of-luxurious-elizabethan-dining-room-in-historic-mansion.jpeg?auto=compress&cs=tinysrgb&w=600", height: 300 },
    { id: 3, image: "https://images.pexels.com/photos/16147471/pexels-photo-16147471/free-photo-of-view-of-the-buildings-from-a-gondola-in-a-canal-in-venice-italy.jpeg?auto=compress&cs=tinysrgb&w=600", height: 300 },
    { id: 4, image: "https://images.pexels.com/photos/3798146/pexels-photo-3798146.jpeg?auto=compress&cs=tinysrgb&w=600", height: 300 },
    { id: 5, image: "https://images.pexels.com/photos/11386220/pexels-photo-11386220.jpeg?auto=compress&cs=tinysrgb&w=600", height: 300 },
    { id: 6, image: "https://images.pexels.com/photos/14120453/pexels-photo-14120453.jpeg?auto=compress&cs=tinysrgb&w=600", height: 300 },
    { id: 7, image: "https://images.pexels.com/photos/30270156/pexels-photo-30270156/free-photo-of-majestic-architecture-of-sheikh-zayed-mosque.jpeg?auto=compress&cs=tinysrgb&w=600", height: 200 },
    { id: 8, image: "https://images.pexels.com/photos/14332487/pexels-photo-14332487.jpeg?auto=compress&cs=tinysrgb&w=600", height: 300 },
    { id: 9, image: "https://images.pexels.com/photos/15033620/pexels-photo-15033620/free-photo-of-aurora-borealis-and-a-full-moon-on-sky-in-lofoten-islands-northern-norway.jpeg?auto=compress&cs=tinysrgb&w=600", height: 200 },
    { id: 10, image: "https://images.pexels.com/photos/14549456/pexels-photo-14549456.jpeg?auto=compress&cs=tinysrgb&w=600", height: 400 },
  ];
  return <div style={{
    marginTop: " .3rem",
  }}>
    <Masonry data={data} />
  </div>;
};

export default Services;
