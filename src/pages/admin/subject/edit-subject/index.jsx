import React, { useEffect, useState } from "react";

//?引入localstorage模块
import storageUtils from "@/utils/storageUtils";
import {
  subjectIdStore,
  subjectNameStore,
  collegeStore,
  subjectInfoStore,
  subjectNoteStore,
  subjectIconStore,
} from "@/redux/store";
import {
  subjectName,
  college,
  subjectInfo,
  subjectNote,
  subjectIcon,
} from "@/redux/action";
import { Input, Upload, Modal, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqGetSubjectById, reqGetAllCollege } from "@/api/index";
const { TextArea } = Input;
const { Option } = Select;

function getBase64(file) {
  //console.log('进入64')
  //console.log(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default function EditSubject({ type }) {
  const [state, setState] = useState({
    adminId: null,
    college1: null,
    iconPath: null,
    note: "",
    url: "123",
    subjectId: null,
    subjectInfo1: null,
    subjectName1: null,
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    collegeData: [],
    img: null,
    fileList: [],
  });

  useEffect(() => {
    const adminId = storageUtils.getUser().adminId;
    setState((pre) => ({
      ...pre,
      adminId,
      subjectId: Number(subjectIdStore.getState()),
    }));

    if (type == "change") {
      reqGetSubjectById({ subjectId: Number(subjectIdStore.getState()) }).then(
        (res) => {
          //console.log(res)
          const college1 = res.data.college;
          const subjectInfo1 = res.data.subjectInfo;
          const subjectName1 = res.data.subjectName;
          const { note } = res.data;
          let { iconPath } = res.data;
          iconPath = "https://xscqa.cqupt.edu.cn/question/img/" + iconPath;
          const fileList = [{ url: iconPath }];
          // //console.log(college)
          setState((pre) => ({
            ...pre,
            college1,
            iconPath,
            note,
            subjectInfo1,
            subjectName1,
            fileList,
          }));

          //console.log(state.college1)
          collegeStore.dispatch(college(state.college1));
          subjectNameStore.dispatch(subjectName(state.subjectName1));
          subjectInfoStore.dispatch(subjectInfo(state.subjectInfo1));
          subjectNoteStore.dispatch(subjectNote(state.note));
        }
      );
    }
    reqGetAllCollege().then((res) => {
      //console.log(res)
      setState((pre) => ({ ...pre, collegeData: res.data }));
    });
  }, []);

  //?监听学院变化
  const handleCollegeChange = (e) => {
    //console.log(e)
    if (e == "") {
      collegeStore.dispatch(college(null));
      setState((pre) => ({ ...pre, college1: null }));
    } else {
      collegeStore.dispatch(college(e));
      setState((pre) => ({ ...pre, college1: e }));
    }
  };
  const nameTxtChanged = (e) => {
    if (e.target.value == "") {
      subjectNameStore.dispatch(subjectName(null));
      setState((pre) => ({ ...pre, subjectName1: null }));
    } else {
      subjectNameStore.dispatch(subjectName(e.target.value));
      setState((pre) => ({ ...pre, subjectName1: e.target.value }));
    }
  };
  const infoChanged = (e) => {
    if (e.target.value == "") {
      subjectInfoStore.dispatch(subjectInfo(null));
      setState((pre) => ({ ...pre, subjectInfo1: null }));
    } else {
      subjectInfoStore.dispatch(subjectInfo(e.target.value));
      setState((pre) => ({ ...pre, subjectInfo1: e.target.value }));
    }
  };
  const noteChanged = (e) => {
    if (e.target.value == "") {
      subjectNoteStore.dispatch(subjectNote(null));
      setState((pre) => ({ ...pre, note: null }));
    } else {
      subjectNoteStore.dispatch(subjectNote(e.target.value));
      setState((pre) => ({ ...pre, note: e.target.value }));
    }
  };

  const beforeUpload = (file, fileList) => {
    //console.log("上传前")
    //console.log(file)
    subjectIconStore.dispatch(subjectIcon(file));
  };
  const handleCancel = () => {
    setState((pre) => ({ ...pre, previewVisible: false }));
  };

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
    setState((pre) => ({ ...pre, fileList }));
    if (file.status == "done" && type == "add") {
      message.success("成功添加图标！");
    } else if (file.status == "done" && type == "change") {
      message.success("成功修改图标！");
    }
  };

  const {
    adminId,
    previewVisible,
    previewImage,
    fileList,
    previewTitle,
    previewTitlesubjectName,
    subjectName1,
    subjectInfo1,
    subjectId,
    collegeData,
    college1,
    url,
    note,
    iconPath,
  } = state;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const ulStyle = {
    display: "flex",
    justifyContent: "space-between",
  };
  const spanStyle = { whiteSpace: "nowrap" };
  const paramData = {
    subjectId,
    adminId,
  };
  return (
    <>
      <ul style={ulStyle}>
        <span style={spanStyle}>学科图标：</span>
        <Upload
          action={url}
          name="icon"
          beforeUpload={beforeUpload}
          data={paramData}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={"https://xscqa.cqupt.edu.cn/question/img" + iconPath}
          />
        </Modal>
      </ul>
      <ul style={ulStyle}>
        <span style={spanStyle}>学科名称：</span>
        <TextArea
          autoSize
          onChange={(e) => nameTxtChanged(e)}
          value={subjectName1}
        />
      </ul>
      <ul style={ulStyle}>
        <span style={spanStyle}>
          所属学院：
          <Select
            style={{ width: 200 }}
            onChange={handleCollegeChange}
            value={college1}
          >
            {collegeData.map((obj) => {
              return (
                <Option key={obj} value={obj}>
                  {obj}
                </Option>
              );
            })}
          </Select>
        </span>
      </ul>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={spanStyle}>学科简介：</span>
        <TextArea
          autoSize
          onChange={(e) => infoChanged(e)}
          value={subjectInfo1}
        />
      </ul>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={spanStyle}>学科备注：</span>
        <TextArea autoSize onChange={(e) => noteChanged(e)} value={note} />
      </ul>
    </>
  );
}
