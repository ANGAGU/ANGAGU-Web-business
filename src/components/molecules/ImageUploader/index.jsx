import React, { useRef, useState, useEffect } from 'react';
import { Input, Media, Label, Button } from 'reactstrap';
import './style.css';
import { notify } from 'App';

const ImageUploader = ({ label, setImg, url }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (url !== null && url !== undefined) {
      setPreviewUrl(`http://d3u3zwu9bmcdht.cloudfront.net/${url}`);
    }
  }, [url]);

  const handleclickInput = () => {
    inputRef.current.click();
  };

  const handleOnChange = evt => {
    let checkFileEx = false;
    Array.from(evt.target.files).forEach(item => {
      if (item.name.split('.')[1] === 'jpeg') {
        checkFileEx = true;
      } else if (item.name.split('.')[1] === 'jpg') {
        checkFileEx = true;
      } else if (item.name.split('.')[1] === 'png') {
        checkFileEx = true;
      }
    });
    if (!checkFileEx) {
      notify('잘못된 파일입니다');
      return;
    }
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
        이미지 선택
      </Button>
    </div>
  );
};

export default ImageUploader;
