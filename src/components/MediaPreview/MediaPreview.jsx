import React from "react";



import "./MediaPreview.css";

function MediaPreview(props) {
    const { photos, video, removeHandler,   } = props;

  //  const longPressObj = useLongPress(removeHandler("photo"), 1000)
    
  //  console.log(longPressObj)

   
  return (
      <div className="mb-4">
          

          {video[0] && (
                 <>
                 <h6 className="mb-2">Videos</h6>
                  <div className="video-preview  mb-4">
                      {video.map(function (data, index) {
                     //   console.log(this)
                        return (<div key={index}>
                         <video src={data} onClick={(e) => removeHandler('video', index)}  ></video>
                        </div>)
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
             //    console.log(this.indexOf(data))
              return(<div key={index}> <img src={data} alt="upload preview" onClick={(e)=> removeHandler('photo', index) } /></div>);
            }, photos)}
          </div>
        </>
          )}
          
         {(photos[0]||video[0]) && <p className="font-italic delete-text mt-4">Hold thumbnail to delete</p>}
    </div>
  );
}

export default MediaPreview;
