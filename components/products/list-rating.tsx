"use client";
import moment from "moment";
import { AiFillStar } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Product Review</h2>
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id}>
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={review?.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex">
                    <AiFillStar className="text-yellow-500" size={20} />
                    <AiFillStar className="text-yellow-500" size={20} />
                    <AiFillStar className="text-yellow-500" size={20} />
                    <AiFillStar className="text-yellow-500" size={20} />
                    <AiFillStar className="text-yellow-500" size={20} />
                  </div>
                  <div className="ml-2">{review.comment}</div>
                  <hr className="my-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
