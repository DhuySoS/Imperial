import React from "react";
import CommentCard from "../card/CommentCard";

const PersonalComment = () => {
  const mokData = [
    {
      id: 1,
      hotelName: "Deluxe The Imperial Đà Lạt 1",
      rate: 5,
      cmt: "Phòng rất đẹp và tiện nghi. Phục vụ nhiệt tình, chu đáo ấn cần",
    },
    {
      id: 2,
      hotelName: "Deluxe The Imperial Đà Lạt 1",
      rate: 4,
      cmt: "Từ khi đẻ ra tới giờ chưa thấy khách sạn nào ưng như này",
    },
    {
      id: 3,
      hotelName: "Deluxe The Imperial Đà Lạt 1",
      rate: 3,
      cmt: "Ờ mây dinh gút chóp em",
    },
    ,
    {
        id: 4,
      hotelName: "Deluxe The Imperial Đà Lạt 1",
      rate: 3,
      cmt: "Ờ mây dinh gút chóp em",
    },
  ];
  return (
    <div className="w-full">
      <p className="text-3xl font-bold">Đánh giá</p>
      <div className="mt-6 w-full space-y-6">
        {mokData.map((item)=>(
            <CommentCard key={item.id} item={item}/>
        ))}

      </div>
    </div>
  );
};

export default PersonalComment;
