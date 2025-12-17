import StarRating from '@/common/StarRating';


const CommentCard = ({item}) => {
  console.log(item);
  
  return (
    <div className="p-6 flex border rounded-xl border-gray-300 w-full gap-8">
      <img
        src={`/assets/hotel/featuredApartment${item.hotel.id % 7}.jpg`}
        alt=""
        className="w-50  object-cover rounded-lg"
      />
      <div className="flex flex-col justify-around">
        <p className="text-xl font-medium">{item.hotel.name}</p>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={item.review.rating} />
          <span className="text-sm font-medium text-gray-700 pt-1 text-wrap">
            {item.review.rating.toFixed(1)}/5
          </span>
        </div>
        <p className="text-xl font-medium">
          {item.review.comment}
        </p>
      </div>
    </div>
  );
}

export default CommentCard