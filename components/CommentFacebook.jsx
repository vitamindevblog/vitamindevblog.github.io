import React, { useEffect } from "react";
import { initFacebookSDK } from "../utils/blogFunction";
import { useRouter } from "next/navigation";

const CommentsFacebook = () => {
  const router = useRouter();

  useEffect(() => {
    initFacebookSDK();
  }, []);

  return (
    <React.Fragment>
      <div id="fb-root"></div>
      <div
        className="fb-comments"
        data-href={`https://vitamindevblog.github.io/${router?.asPath}`}
        data-numposts="10"
        data-width="100%"></div>
      <div style={{ padding: "0 5px" }}>
        <div
          className="fb-like"
          data-href={`https://vitamindevblog.github.io/${router?.asPath}`}
          data-width=""
          data-layout=""
          data-action=""
          data-size=""
          data-share="true"></div>
      </div>
    </React.Fragment>
  );
};

export default CommentsFacebook;
