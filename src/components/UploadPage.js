import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
/* antd는 노션말고 사이트에 있는거 보면서해 */
import { Form, Input, Button, Upload, Divider, InputNumber, message } from "antd";
import "./UploadPage.css";
import axios from "axios";
import { API_URL } from "../config/constants";
const { TextArea } = Input;
const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Hello, Ant Design!");
  };
  const navigate = useNavigate();
  const onFinish = (val) => {
    console.log(val);

    axios
      .post(`${API_URL}/products`, {
        name: val.name,
        description: val.description,
        price: val.price,
        seller: val.seller,
        imageUrl: imageUrl,
      })
      .then((result) => {
        // console.log(result);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        message.error(`error!`);
      });
  };
  const onChangeImage = function (info) {
    if (info.file.status === "uploading") {
      return;
    } else if (info.file.status === "done") {
      const reponse = info.file.response;
      const imageUrl = reponse.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="uploadForm" onFinish={onFinish}>
        <Form.Item name="upload" valuePropName="image">
          {/* 모든것들은 form item 안에 있어야 한다. */}
          <Upload name="image" action="http://localhost:8080/image" listType="picture" showUploadList={false} onChange={onChangeImage}>
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="" />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="" />
                <span>이미지를 업로드 해주세요</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider></Divider>

        <Form.Item label={<span className="upload-label">상품명</span>} name="name" rules={[{ required: true, message: "상품명은 필수 입력 사항입니다." }]}>
          <Input className="upload-name" placeholder="상품명을 입력해주세요" size="large" />
        </Form.Item>
        <Divider></Divider>
        <Form.Item label={<span className="upload-price">판매가</span>} name="price" rules={[{ required: true, message: "판매가는 필수 입력 사항입니다." }]}>
          {/* err initioalvalue=0 */}
          <InputNumber className="upload-price" size="large" min={0} defaultValue={0} />
        </Form.Item>
        <Form.Item label={<span className="upload-seller">판매자명</span>} name="seller" rules={[{ required: true, message: "판매자명은 필수 입력 사항입니다." }]}>
          <Input className="upload-name" placeholder="판매자명을 입력해주세요" size="large" />
          {/*   <TextArea size="large" id="description" showCount maxLength={300} placeholder="판매자명을 작성해주세요"></TextArea> */}
        </Form.Item>
        <Divider></Divider>
        <Form.Item label={<span className="upload-label">상품설명</span>} name="description" rules={[{ required: true, message: "상품설명은 필수 입력 사항입니다." }]}>
          <TextArea size="large" id="description" showCount maxLength={300} placeholder="상품설명을 작성해주세요"></TextArea>
        </Form.Item>
        <Divider></Divider>
        <Form.Item>
          {/* button과 use연결 */}
          {contextHolder}
          <Button id="submit-button" htmlType="submit" onClick={info}>
            상품등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UploadPage;
