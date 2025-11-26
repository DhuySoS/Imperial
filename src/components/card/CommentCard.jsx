import StarRating from '@/common/StarRating';


const CommentCard = ({item}) => {
  return (
    <div className="p-6 flex border rounded-xl border-gray-300 w-full gap-8">
      <img
        src="/assets/Rooms/daLat/2.jpg"
        alt=""
        className="w-50  object-cover rounded-lg"
      />
      <div className="flex flex-col justify-around">
        <p className="text-xl font-medium">{item.hotelName}</p>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={item.rate} />
          <span className="text-sm font-medium text-gray-700 pt-1 text-wrap">
            {item.rate}/5
          </span>
        </div>
        <p className="text-xl font-medium">
          Phòng rất đẹp và tiện nghi. Phục vụ nhiệt tình, chu đáo ấn cần
        </p>
      </div>
    </div>
  );
}

export default CommentCard