import React, { useRef, useState } from 'react';
import { Input, Media, Label, Button } from 'reactstrap';
import './style.css';

const ImageUploader = ({ label, setImg }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleclickInput = () => {
    inputRef.current.click();
  };

  const handleOnChange = evt => {
    setPreviewUrl(URL.createObjectURL(evt.target.files[0]));
    setImg(evt.target.files[0]);
  };

  return (
    <div>
      <div className="img-blk">
        {!previewUrl ? (
          <div className="empty-img"> 상품 이미지를 넣어주세요 :)</div>
        ) : (
          <img className="preview-img" src={previewUrl} alt="previewImg" />
        )}
        <input type="file" onChange={handleOnChange} ref={inputRef} hidden />
      </div>

      <Button className="img-btn" color="secondary" onClick={handleclickInput}>
        이미지 업로드
      </Button>
    </div>
  );
};

export default ImageUploader;
