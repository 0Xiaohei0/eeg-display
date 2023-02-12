import React from "react";

export default function Gallery() {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../Data/Photos", false, /\.(png|jpe?g|svg)$/)
  );
  console.log(Object.values(images));
  return (
    <div className="CoverCardList--container">
      {Object.values(images).map((i) => (
        <img
          key={i}
          className="rounded-lg coverCard--image"
          src={i}
          alt="description"
        />
      ))}
    </div>
  );
}
