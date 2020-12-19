import React, { useCallback } from "react";
import useLongPress from "../../hooks/useLongPress";


import "./MediaPreview.css";

function MediaPreview(props) {
    const { photos, video, removeHandler } = props;

  //  const longPressObj = useLongPress(removeHandler("photo"), 1000)
    
  //  console.log(longPressObj)

   
  return (
      <div className="my-4">
          

          {video[0] && (
                 <>
                 <h6 className="mb-2">Videos</h6>
                  <div className="video-preview  mb-4">
                      {video.map(function (data, index) {
                          console.log(this)
                          return <video src={data} key={index} onClick={(e)=> removeHandler('video', index) }  ></video>
                      })
                      }
                 </div>
               </>
          )

          }
   
      {photos[0] && (
        <>
          <h6 className="mb-2">Pictures</h6>
          <div className="image-preview">
                      {photos.map(function (data, index) {
                 console.log(this.indexOf(data))
              return <img src={data} key={index} alt="upload preview" onClick={(e)=> removeHandler('photo', index) } />;
            }, photos)}
          </div>
        </>
          )}
          
         {(photos[0]||video[0]) && <p className="font-italic delete-text mt-4">Hold thumbnail to delete</p>}
    </div>
  );
}

export default MediaPreview;
