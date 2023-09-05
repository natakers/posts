import { PostProps } from "types/contexTypes";
import PostCard from "../Card/card";
import "./index.css";


const CardList = ({ posts }: CardListProps) => {
  // console.log(posts);
  return ( <div className="cards"> {posts && posts.map((post, index) => ( <PostCard key={index} {...post} /> ))} </div> );
};

export default CardList;

interface CardListProps {
  posts: PostProps[]
}
