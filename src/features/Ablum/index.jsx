import React from "react";
import AlbumList from "./components/AlbumList";

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
  const albumList = [
    {
      id: "1",
      name: "US/UK",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/7/f/0/9/7f09489c59df82bdceebb0782e7a41da.jpg",
    },
    {
      id: "2",
      name: "Kpob",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/7/f/0/9/7f09489c59df82bdceebb0782e7a41da.jpg",
    },
    {
      id: "3",
      name: "Vpob",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/7/f/0/9/7f09489c59df82bdceebb0782e7a41da.jpg",
    },
  ];

  return (
    <div>
      <AlbumList albumList={albumList} />
    </div>
  );
}

export default AlbumFeature;
