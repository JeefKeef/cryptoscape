import "./feed.css";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Share, Post, Profileinfo, Comment, Reply } from "../";
import News from "../News";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";

const Feed = ({ options, socket, comments, replies }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
//  const [renderSize, setRenderSize] = useState(3);
//  const [hasMore, setHasMore] = useState(true);

  const { user: currUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res =
        options.value !== "home"
          ? await axios.get("/posts/profile/" + options.username)
          : await axios.get("/posts/timeline/" + currUser?._id);

      setPosts(
        res?.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [options, currUser?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${options.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [options.username]);

  // useEffect(() => {
  //   setRenderSize(renderSize);
  // }, [renderSize]);

  // const fetchMoreData = () => {
  //   setRenderSize((prev) => {
  //     if(prev + 3 < posts?.length) {
  //       return prev + 3;
  //     } else {
  //       const diff = posts?.length;
  //       setHasMore(!hasMore);
  //       return prev + diff;
  //     }
  //   });
  // };


  const renderSwitch = (params) => {
    switch (params) {
      case "home":
        return <HomeFeed />;
      case "profile":
        return <ProfileFeed />;
      case "guest":
        return <GuestFeed />;
      case "comment":
        return <CommentFeed />;
      case "reply":
        return <ReplyFeed />;
      default:
        break;
    }
  };

  const ReplyFeed = () => {
    return (
      <>
        {replies?.map((reply) => (
          <Reply key={reply?._id} reply={reply} socket={socket} />
        ))}
      </>
    );
  };

  const CommentFeed = () => {
    return (
      <>
        {comments?.map((comment) => (
          <Comment key={comment?._id} comment={comment} socket={socket} />
        ))}
      </>
    );
  };

  const ProfileFeed = () => {
    return (
      <>
        <Profileinfo profile={user} socket={socket} />
        {posts?.map((post) => {
              return <Post key={post._id} post={post} socket={socket} />;
            })}
        {/* <div id="feed-scroll">
          <InfiniteScroll
            dataLength={posts?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="feed-container"
          >
            {posts?.splice(0, renderSize)?.map((post, i) => {
              return <Post key={post._id} post={post} socket={socket} />;
            })}
          </InfiniteScroll>
        </div> */}
      </>
    );
  };

  const HomeFeed = () => {
    return (
      <>
        <Share setPosts={setPosts} socket={socket} />
        {posts?.map((post) => (
          <Post key={post._id} post={post} socket={socket} />
        ))}
      </>
    );
  };

  const GuestFeed = () => {
    return <News />;
  };

  return (
    <div className="feed-container">
      <div className="feed-wrapper">{renderSwitch(options.value)}</div>
    </div>
  );
};

export default Feed;
