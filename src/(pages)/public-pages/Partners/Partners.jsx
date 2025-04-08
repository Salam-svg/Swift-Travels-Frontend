import React from "react";
import FlowingMenu from "../../../animations/FlowingMenu/FlowingMenu";

const Partners = () => {
  const demoItems = [
    {
      link: "#",
      text: "Amadeus",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4q1wpfvOsozen-3Mv9aV18GsBZ4v0LsACQ&s?random=1",
    },
    {
      link: "#",
      text: "Booking",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdb6IcpZNtRTlehtNbAUk1kDzmMPBeGnAcQQ&s?random=2",
    },
    {
      link: "#",
      text: "arboo",
      image: "https://images-platform.99static.com//WITWpvGThpD4u-5f85S9ceFc_i4=/0x0:1400x1400/fit-in/500x500/99designs-contests-attachments/117/117682/attachment_117682206?random=3",
    },
    {
      link: "#",
      text: "trazel",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2F99designs.com%2Finspiration%2Flogos%2Fbooking&psig=AOvVaw1l7UcctbmmmacuKqoS-cHz&ust=1741781512186000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDW3fX_gYwDFQAAAAAdAAAAABAZ?random=4",
    },
  ];
  return (
    <div className="" style={{
        marginTop: "50px",
    }}>
      <h1 className="font-Moon underline" style={{
        textAlign: "center",
        fontSize: "40px",
        marginBottom: "20px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
      }}>Our Partners</h1>

      <div style={{ height: "600px", position: "relative" }}>
        <FlowingMenu items={demoItems} />
      </div>
    </div>
  );
};

export default Partners;
