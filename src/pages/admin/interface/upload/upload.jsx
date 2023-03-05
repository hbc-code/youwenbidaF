import React, { useEffect, useState } from "react";

import { Upload, Modal, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqListStaticImg } from "@/api/index";
import axios from "axios";

//?引入localstorage模块
import storageUtils from "@/utils/storageUtils";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function UploadImg({ type, grade, num }) {
  const [state, setState] = useState({
    imgId: null,
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    thefile: null,
    status: 0,
  });

  const initPic = () => {
    let fileList = [];
    reqListStaticImg().then((res) => {
      //console.log(res)
      const { list } = res.data;
      //console.log(list.length)
      let lunboArr = [];
      for (let i = 0; i < list.length; i++) {
        list[i].url = "https://xscqa.cqupt.edu.cn/question/img" + list[i].url;
        if (list[i].imgType === type && type === 1) {
          lunboArr.push(list[i]);
        } else if (list[i].imgType === type) {
          fileList.push(list[i]);
          setState((pre) => ({ ...pre, imgId: list[i].imgId }));
        }
      }
      if (type === 1) {
        let num = Number(grade);
        fileList.push(lunboArr[num]);
        //console.log("ID")
        //console.log(lunboArr[num].imgId)
        setState((pre) => ({ ...pre, fileList, imgId: lunboArr[num].imgId }));
        //console.log(state.imgId)
      } else {
        setState((pre) => ({ ...pre, fileList }));
      }
      //console.log(fileList)
    });
  };

  useEffect(() => {
    initPic();
  }, []);

  const beforeUpload = (file, fileList) => {
    //console.log("上传前")
    //console.log(file)
    setState((pre) => ({ ...pre, thefile: file, status: 1, fileList }));
  };

  const handleCancel = () =>
    setState((pre) => ({ ...pre, previewVisible: false }));

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState((pre) => ({
      ...pre,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    }));
  };

  const handleChange = ({ file, fileList }) => {
    //console.log(fileList)
    // const {imgId} = file
    // setState((pre) => ({ ...pre, imgId }));
    setState((pre) => ({ ...pre, fileList }));
    if (file.status === "done") {
      message.success("修改图片成功！");
      setState((pre) => ({ ...pre, status: 0 }));
    }
  };

  // componentWillUnmount(){
  //   setState = () => false
  // }
  //?确定修改
  const change = () => {
    let formData = new FormData();
    formData.append("img", state.thefile);
    formData.append("imgId", state.imgId);
    formData.append("adminId", storageUtils.getUser().adminId);
    formData.append("type", type);
    axios({
      method: "post",
      url: "https://xscqa.cqupt.edu.cn/question/admin/updateStaticImg",
      headers: { "Content-type": "multipart/form-data;charset=UTF-8" },
      data: formData,
    }).then((res) => {
      //console.log(res)
      if (res.data.code == 1) {
        message.success("修改成功");
        initPic();
      }
    });
  };

  const { previewVisible, previewImage, fileList, previewTitle, imgId } = state;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  // const adminId = storageUtils.getUser().adminId
  // let paramData = {
  //   adminId,
  //   imgId,
  //   type
  // }
  return (
    <div>
      <Upload
        // action="https://xscqa.cqupt.edu.cn/question/admin/updateStaticImg"
        action="123"
        name="img"
        // data={paramData}
        beforeUpload={beforeUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        key={Math.floor(Math.random() * 10000)}
        // maxCount={3}
      >
        {fileList.length >= num ? "" : uploadButton}
      </Upload>
      <Button
        type="primary"
        disabled={state.status == 0}
        onClick={change}
        style={{ marginLeft: 5 }}
      >
        确定修改
      </Button>
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
