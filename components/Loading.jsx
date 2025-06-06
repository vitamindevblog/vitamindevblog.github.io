import React from "react";
import LoadingGif from "../public/img/loading.gif";
import Image from "next/image";
function Loading(props) {
  return (
    <>
      {props.loading && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gray-900 top-0 opacity-10">
          <div className="flex justify-center h-full text-black">
            <div className="flex flex-col justify-center">
              <Image width={100} height={100} src={LoadingGif} alt="loading" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loading;
