import React, { useEffect, useState } from "react";

import "./index.scss";

import AdminTopBar from "../../../components/admin-topBar/adminTopBar";
import axios from "axios";
import { Table, Modal, Input, Button, Select, Popconfirm, message } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
//?引入请求函数
import {
  reqGetAllCollege,
  reqListSubject,
  reqDeleteSubject,
  reqAddSubject,
  reqUpdateSubject,
} from "@/api/index";
//?引入localstorage模块
import storageUtils from "@/utils/storageUtils";
//?引入redux
import {
  subjectIdStore,
  subjectNameStore,
  collegeStore,
  subjectInfoStore,
  subjectNoteStore,
  subjectIconStore,
} from "@/redux/store";

import { subjectId } from "@/redux/action";
import EditSubject from "./edit-subject";

const { Option } = Select;
export default function Subject() {
  const [state, setState] = useState({
    adminId: null,
    pageSize: 10,
    total: null,
    subjectName: null,
    college: null,
    subjectIsModalVisible: false,
    subjectAddIsModalVisible: false,
    subjectDataSource: [],
    collegeData: [],
  });

  const initUserTable = async (param) => {
    const res = await reqListSubject(param);
    const { list } = res.data;
    const { totalRows } = res.data.pageInfo;
    setState((pre) => ({ ...pre, subjectDataSource: list, total: totalRows }));
  };

  useEffect(() => {
    const adminId = storageUtils.getUser().adminId;
    setState((pre) => ({ ...pre, adminId }));
    let param = {
      currentPage: 1,
      pageSize: state.pageSize,
    };
    reqGetAllCollege().then((res) => {
      //console.log(res)
      setState((pre) => ({ ...pre, collegeData: res.data }));
    });
    initUserTable(param);
  }, []);

  //?监听查询条件变化
  const subjectName = (e) => {
    //console.log(e)
    if (e.target.value == "") {
      setState((pre) => ({ ...pre, subjectName: null }));
    } else {
      setState((pre) => ({ ...pre, subjectName: e.target.value }));
    }
  };
  const handleChange = (e) => {
    if (e == "") {
      setState((pre) => ({ ...pre, college: null }));
    } else {
      setState((pre) => ({ ...pre, college: e }));
    }
  };

  //?实现分页
  const handleChangeSubject = (value) => {
    const { subjectName, college } = state;
    let param = {
      currentPage: value.current,
      pageSize: value.pageSize,
      subjectName,
      college,
    };
    initUserTable(param);
  };

  //?实现搜索
  const searchSubject = () => {
    const { subjectName, college, pageSize } = state;
    let param = {
      currentPage: 1,
      pageSize,
      subjectName,
      college,
    };
    initUserTable(param);
  };

  //? 点击修改学科回调函数
  const showEditSubject = (e) => {
    subjectIdStore.dispatch(subjectId(e));
    setState((pre) => ({ ...pre, subjectIsModalVisible: true }));
  };
  const changeEdit = () => {
    //  //console.log("我点击了OK")
    let formData = new FormData();
    formData.append("subjectId", subjectIdStore.getState());
    formData.append("icon", subjectIconStore.getState());
    formData.append("subjectName", subjectNameStore.getState());
    formData.append("college", collegeStore.getState());
    formData.append("subjectInfo", subjectInfoStore.getState());
    formData.append("note", subjectNoteStore.getState());
    formData.append("adminId", state.adminId);
    axios({
      method: "post",
      //url: "https://xscqa.cqupt.edu.cn/question/admin/updateSubject",
      url: "/admin/updateSubject",
      headers: { "Content-type": "multipart/form-data;charset=UTF-8" },
      data: formData,
    }).then((res) => {
      //console.log(res)
      if (res.data.code == 1) {
        message.success("成功修改学科！");
        searchSubject();
      }
    });
    setState((pre) => ({ ...pre, subjectIsModalVisible: false }));
  };
  const cancelChangeEditEdit = () => {
    setState((pre) => ({ ...pre, subjectIsModalVisible: false }));
  };

  //?清空
  // const clearAll = () => {
  // console.log("清空")
  /* setState(pre => ({...pre, subjectName:null, college:null})) */
  //console.log(state.subjectName);
  //console.log(state.college)
  // }
  //?添加学科
  const showAddSubject = () => {
    setState((pre) => ({ ...pre, subjectAddIsModalVisible: true }));
  };
  const addEdit = () => {
    //console.log("add")
    //console.log(subjectIconStore.getState())
    let formData = new FormData();
    formData.append("icon", subjectIconStore.getState());
    formData.append("subjectName", subjectNameStore.getState());
    formData.append("college", collegeStore.getState());
    formData.append("subjectInfo", subjectInfoStore.getState());
    formData.append("note", subjectNoteStore.getState());
    formData.append("adminId", state.adminId);
    axios({
      method: "post",
      url: "https://xscqa.cqupt.edu.cn/question/admin/addSubject",
      headers: { "Content-type": "multipart/form-data;charset=UTF-8" },
      data: formData,
    }).then((res) => {
      //console.log(res)
      if (res.data.code == 1) {
        message.success("成功添加学科！");
        searchSubject();
      }
    });
    setState((pre) => ({ ...pre, subjectAddIsModalVisible: false }));
  };
  const cancelAddEdit = () => {
    setState((pre) => ({ ...pre, subjectAddIsModalVisible: false }));
  };

  //?删除学科
  const deleteSubject = (e) => {
    //console.log(e)
    let param = {
      subjectId: e,
      adminId: state.adminId,
    };
    reqDeleteSubject(param).then((res) => {
      if (res.code == 1) {
        message.success("删除成功");
        searchSubject();
      } else {
        message.error("删除失败");
      }
    });
  };

  const subjectColumns = [
    {
      title: "学科名称",
      dataIndex: "subjectName",
      align: "center",
    },
    {
      title: "所属学院",
      dataIndex: "college",
      align: "center",
    },
    {
      title: "教师",
      dataIndex: "teacherCount",
      align: "center",
    },
    {
      title: "志愿者",
      dataIndex: "volunteerCount",
      width: "10%",
      align: "center",
    },
    {
      title: "累计提问",
      dataIndex: "questionCount",
      align: "center",
      //
    },
    {
      title: "累计回答",
      dataIndex: "answerCount",
      align: "center",
    },
    {
      title: "累计解决",
      dataIndex: "solvedQuestionCount",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "subjectId",
      render: (subjectId) => (
        <>
          <a onClick={() => showEditSubject(subjectId)}>修改/查看 </a>
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteSubject(subjectId)}
          >
            <a href="#">删除</a>
          </Popconfirm>
          {/* <a onClick={}> 删除</a> */}
        </>
      ),
      align: "center",
    },
  ];

  const {
    subjectIsModalVisible,
    subjectAddIsModalVisible,
    collegeData,
    pageSize,
    total,
  } = state;
  return (
    <div className="subject-search">
      <AdminTopBar tag="学科管理" timeShow="false" />
      <div className="subject-search-top">
        <ul>
          <li>
            学科名称：
            <Input onChange={(e) => subjectName(e)} style={{ width: 200 }} />
          </li>
          <li>
            所属学院：
            <Select style={{ width: 200 }} onChange={handleChange}>
              {collegeData.map((obj) => {
                return (
                  <Option key={obj} value={obj}>
                    {obj}
                  </Option>
                );
              })}
            </Select>
          </li>
        </ul>
        <ul>
          {/* <Button type="primary" onClick={clearAll} icon={<CloseCircleOutlined />}>
                            清空
                        </Button> */}
          {/* <Button type="primary" onClick={clearAll}> 清空</Button> */}
          <Button
            type="primary"
            style={{ marginLeft: 30 }}
            onClick={() => searchSubject()}
            icon={<SearchOutlined />}
          >
            搜索
          </Button>

          <Button
            type="primary"
            style={{ marginLeft: 30 }}
            onClick={(e) => showAddSubject(e)}
          >
            + 添加
          </Button>
          <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=4">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{ marginLeft: 30 }}
            >
              导出
            </Button>
          </a>
        </ul>
      </div>
      <div className="subject-search-list">
        <Table
          bordered
          align="center"
          onChange={handleChangeSubject}
          pagination={{ pageSize: pageSize, total: total }}
          dataSource={state.subjectDataSource}
          columns={subjectColumns}
          rowKey="subjectId"
        />
      </div>
      <Modal
        title="修改学科"
        destroyOnClose
        open={subjectIsModalVisible}
        onOk={changeEdit}
        onCancel={cancelChangeEditEdit}
      >
        <EditSubject type="change" />
      </Modal>
      <Modal
        title="添加学科"
        destroyOnClose
        open={subjectAddIsModalVisible}
        onOk={addEdit}
        onCancel={cancelAddEdit}
      >
        <EditSubject type="add" />
      </Modal>
    </div>
  );
}
