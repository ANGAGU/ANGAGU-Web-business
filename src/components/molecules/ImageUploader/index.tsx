import React from 'react';
import { Input, Media, Label } from 'reactstrap';
import './style.css';

type ImageUploaderProps = {
  label: string;
  type: string;
  imgUrl: string;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, type, imgUrl }) => {
  return (
    <div className="row">
      <Media object src="previewSrc" alt={`업로드 된 ${label}`} />
      <div className="row section_upload">
        <div>
          <Label for="img_upload_label" className="btn btn-info">
            <span className="fe fe-upload" />
            <span>{label} 변경</span>
          </Label>
          <Input type="file" multiple accept="image/*" id="img_upload_label" />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
