import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import './MediaUploadComponent.scss'

const MediaUploadComponent = ({
  uploadUrl,
  thumbnailUrl,
  previewUrl,
  className,
  postData,
  ...props
 }) => {

  const myRefname= useRef(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [previewMediaType, setPreviewMediaType] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setInitalPreview();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnailUrl, previewUrl])

  const setInitalPreview = async () => {
    const url = previewUrl || thumbnailUrl;
    if (!url) {
      return;
    }
    try {
      console.log(url);
      const resp = await fetch(url, {
      });
      const blob = await resp.blob();
      const type = resp.headers.get('content-type');
      console.log(blob);
      setPreviewMedia(URL.createObjectURL(blob));
      setPreviewMediaType(type);
    } catch (error) {
      handleError(error);
    }    
  }

  const handleError = (error) => {
    if (props.onError) {
      props.onError(error);
    }
    console.error(error);
  }

  const previewUploadedMedia = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setPreviewMedia(URL.createObjectURL(file));
    setPreviewMediaType(file.type);    
  };

  const uploadMedia = async (e) => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      for (const key in postData) {
        if (Object.hasOwnProperty.call(postData, key)) {
          formData.append(key, postData[key]);
        }
      }
      const resp = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });
      const blob = await resp.blob();
      if (blob) {
        console.log('uploaded');
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
      handleError(error);
    }
  }

  const previewAndUploadMedia = async (e) => {
    previewUploadedMedia(e);
    uploadMedia(e);
  }


  return (

    
    <div className={className} >
      {
        previewMedia &&
        <div className="preview-media">
          {
            previewMediaType?.includes('image') &&
            <img src={previewMedia} alt="preview" />
          }
          {
            previewMediaType?.includes('video') &&
            <video src={previewMedia} autoPlay muted />
          }
          {
            showLoader &&
            <div id="upload-loader">Uploading...</div>
          }
          
        </div>
      }      
      <input id="media-file-input" type="file" onChange={(e) => previewAndUploadMedia(e)} ref={myRefname} />
      <button className="upload-btn" onClick={() => myRefname.current.click()}>Upload</button>
    </div>
  )
}

MediaUploadComponent.propTypes = {
  uploadUrl: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string,
  className: PropTypes.string,
  previewUrl: PropTypes.string,
  postData: PropTypes.object,

}

MediaUploadComponent.defaultProps = {
  className: 'react-media-upload',
  thumbnailUrl: '',
  previewUrl: '',
  postData: {},
}

export default MediaUploadComponent
