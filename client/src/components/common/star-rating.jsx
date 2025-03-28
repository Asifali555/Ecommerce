import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
    return (
        <>
            {[1, 2, 3, 4, 5].map((star) => (
                <Button
                    className={`p-2 rounded-full transition-colors duration-200 
                        ${star <= rating
                            ? "text-yellow-500 bg-white hover:bg-gray-100" 
                            : "text-gray-400 bg-transparent hover:bg-gray-100 hover:text-black" 
                        }`}
                    variant="outline"
                    size="icon"
                    
                    onClick = { handleRatingChange ? () => handleRatingChange(star) : null }
                >
                    <StarIcon 
                    className={`w-6 h-6 ${star <= rating ? "fill-yellow-500" : "fill-black"}`}/>
                </Button>
            ))}
        </>
    );
}

export default StarRatingComponent;
