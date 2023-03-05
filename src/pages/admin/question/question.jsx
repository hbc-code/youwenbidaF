import React, { useEffect, useState } from "react";

import "./question.scss";

import { Link } from "react-router-dom";

import axios from "axios";
import AdminTopBar from "../../../components/admin-topBar/adminTopBar";

//?引入用户信息组件
import ProfileMsg from "./profile-msg";

//?引入修改问题组件
import EditQuestion from "./edit-question";

//?引入请求函数
import {
  reqListQuestion,
  reqUpdateQuestion,
  reqDisapperQuestion,
} from "../../../api";
//?引入存储模块
import memoryUtils from "../../../utils/memoryUtils";
//?引入localstorage模块
import storageUtils from "../../../utils/storageUtils";

//? antd
import {
  Table,
  Modal,
  Input,
  Button,
  Select,
  DatePicker,
  message,
  Space,
} from "antd";
import { questionId, stuId } from "../../../redux/action";
import {
  qID,
  qTitleStore,
  qDescribeStore,
  stuIdStore,
  qImgStore,
} from "../../../redux/store";

import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function Question() {
  const [state, setState] = useState({
    adminId: 0,
    total: 0,
    pageSize: 10,
    profileIsModalVisible: false,
    editIsModalVisible: false,
    questionDataSource: [],
    title: null,
    subjectName: null,
    college: null,
    questionAccountId: null,
    state: null,
    hide: null,
    timeType: "year",
    time: null,
    answerAccountName: null,
  });

  useEffect(() => {
    //?获取管理者ID
    const { adminId } = memoryUtils.user;
    setState((pre) => ({ ...pre, adminId }));
    let param = {
      currentPage: 1,
      pageSize: state.pageSize,
    };
    initQuestionTable(param);
  }, []);

  const initQuestionTable = (param) => {
    reqListQuestion(param).then((res) => {
      //console.log(res)
      let list = res.data ? res.data.list : [];
      let totalRows = res.data ? res.data.pageInfo.totalRows : 0;
      setState((pre) => ({
        ...pre,
        questionDataSource: list,
        total: totalRows,
      }));
    });
    // const res = await reqListQuestion(param);
    // //console.log(res)
  };
  //?监听输入框的值
  const titleSearch = (e) => {
    //   //console.log(e.target.value)
    //   //console.log(e)
    if (e.target.value == "") {
      setState((pre) => ({ ...pre, title: null }));
    } else {
      setState((pre) => ({ ...pre, title: e.target.value }));
    }
  };
  const subjectSearch = (e) => {
    if (e.target.value == "") {
      setState((pre) => ({ ...pre, subjectName: null }));
    } else {
      setState((pre) => ({ ...pre, subjectName: e.target.value }));
    }
  };
  const collegeSearch = (e) => {
    if (e.target.value == "") {
      setState((pre) => ({ ...pre, college: null }));
    } else {
      setState((pre) => ({ ...pre, college: e.target.value }));
    }
  };
  const askSearch = (e) => {
    if (e.target.value == "") {
      setState((pre) => ({ ...pre, questionAccountId: null }));
    } else {
      setState((pre) => ({ ...pre, questionAccountId: e.target.value }));
    }
  };

  //?状态回调函数
  const handleChange = (value) => {
    if (value == "") {
      setState((pre) => ({ ...pre, state: null }));
    } else {
      setState((pre) => ({ ...pre, state: Number(value) }));
    }
    //console.log(`selected ${value}`);
  };

  //?是否隐藏回调函数
  const handleChangeHide = (value) => {
    if (value == "") {
      setState((pre) => ({ ...pre, hide: null }));
    } else {
      setState((pre) => ({ ...pre, hide: Number(value) }));
    }
    //console.log(`selected ${value}`);
  };
  //?设置时间选择器类型
  const setType = (e) => {
    setState((pre) => ({ ...pre, timeType: e }));
  };
  //? 时间选择器回调函数
  const onChange = (date, dateStrings) => {
    //console.log(dateStrings)
    if (dateStrings == "") {
      setState((pre) => ({ ...pre, time: null }));
    } else {
      setState((pre) => ({ ...pre, time: dateStrings }));
    }
  };
  //const onChange = function (date, dateStrings){

  // }

  //?实现搜索问题
  const search = () => {
    const {
      title,
      subjectName,
      college,
      questionAccountId,
      time,
      answerAccountName,
      hide,
    } = state;
    let param = {
      currentPage: 1,
      pageSize: state.pageSize,
      title,
      subjectName,
      college,
      questionAccountId,
      state,
      time,
      answerAccountName,
      deleted: hide,
    };
    reqListQuestion(param)
      .then((res) => {
        //console.log(res)
        const { list } = res.data;
        const { totalRows } = res.data.pageInfo;
        setState((pre) => ({
          ...pre,
          questionDataSource: list,
          total: totalRows,
        }));
      })
      .catch((err) => {
        //console.log(err)
      });
  };

  //?点击提问者
  const showProfile = (e) => {
    //console.log("我点击了提问者")
    //存储提问者学号
    //console.log(e.target.innerHTML)
    stuIdStore.dispatch(stuId(e.target.innerHTML));
    //console.log(stuIdStore.getState())
    setState((pre) => ({ ...pre, profileIsModalVisible: true }));
  };
  //?查看提问者回调函数
  const handleProfile = () => {
    setState((pre) => ({ ...pre, profileIsModalVisible: false }));
  };
  const cancelProfile = () => {
    Modal.destroyAll();
    setState((pre) => ({ ...pre, profileIsModalVisible: false }));
  };

  //?点击修改问题
  const showEditQuesion = (e) => {
    //存储问题id
    qID.dispatch(questionId(e));
    setState((pre) => ({ ...pre, editIsModalVisible: true }));
    // //console.log('我点击了修改问题')
  };

  //?确认修改问题
  const handleEdit = (e) => {
    let describes = qDescribeStore.getState();
    if (describes != null) {
      describes = describes.replace(/[\n]/g, "\\n");
      describes = describes.replace(/[ ]/g, "&nbsp;");
    }
    let formData = new FormData();
    formData.append("questionId", qID.getState());
    formData.append("title", qTitleStore.getState());
    formData.append("describes", describes);
    formData.append("adminId", storageUtils.getUser().adminId);
    formData.append("img", qImgStore.getState());

    axios({
      method: "post",
      url: "https://xscqa.cqupt.edu.cn/question/admin/updateQuestion",
      headers: { "Content-type": "multipart/form-data;charset=UTF-8" },
      data: formData,
    }).then((res) => {
      //console.log(res)
      if (res.data.code == 1) {
        message.success("修改问题成功！");
        setState(pre => ({...pre, editIsModalVisible: false}))
      }
    });
    //     let param = {
    //         questionId:qID.getState(),
    //         title:qTitleStore.getState(),
    //         describes,
    //         adminId:storageUtils.getUser().adminId
    //     }
    //     reqUpdateQuestion(param)
    //     .then(res=>{
    //         //console.log(res)
    //         const {code} = res;
    //         if(1 == code) {
    // message.success('修改问题成功！');
    // this.setState({editIsModalVisible:false})
    //         }
    //     })
    //     .catch(err=>{
    //         //console.log(err)
    //     })
  };
  const cancelEdit = (e) => {
    this.setState({ editIsModalVisible: false });
  };

  //?跳转问题详情页
  const goQuestionDetail = (e) => {
    //?保存用户登录信息到localstorage
    storageUtils.saveQuestionId(e);
    //console.log(e)
    qID.dispatch(questionId(e));
  };

  //?实现分页
  const handleChangeQustion = (value) => {
    //console.log(value)
    const {
      title,
      subjectName,
      college,
      questionAccountId,
      state,
      time,
      answerAccountName,
      hide,
    } = state;
    let param = {
      currentPage: value.current,
      pageSize: value.pageSize,
      title,
      subjectName,
      college,
      questionAccountId,
      state,
      time,
      answerAccountName,
      deleted: hide,
    };
    initQuestionTable(param);
  };

  //?隐藏问题
  const disapper = async(e) => {
    let param = {
      questionId: e,
      adminId: state.adminId,
    };
    const res = await reqDisapperQuestion(param);
    //console.log(res)
    message.success("隐藏成功");
    let param1 = {
      currentPage: 1,
      pageSize: state.pageSize,
    };
    initQuestionTable(param1);
  }

  const questionColumns = [
    {
      title: "标题",
      dataIndex: "title",
      render: (text) => <p>{text.substring(0, 5) + "..."}</p>,
      align: "center",
    },
    {
      title: "提问者",
      dataIndex: "questionAccountId",
      render: (text) => <a onClick={(e) => this.showProfile(e)}>{text}</a>,
      align: "center",
    },
    {
      title: "学科",
      dataIndex: "subjectName",
      align: "center",
    },
    {
      title: "学科所属学院",
      dataIndex: "college",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "state",
      render: (text) => <span>{text == 0 ? "未解决" : "已解决"}</span>,
      align: "center",
    },
    {
      title: "是否隐藏",
      dataIndex: "deleted",
      render: (text) => <span>{text == "0" ? "未隐藏" : "已隐藏"}</span>,
      align: "center",
    },
    {
      title: "时间",
      dataIndex: "publishTime",
      align: "center",
    },
    {
      title: "回答",
      dataIndex: "answerCount",
      align: "center",
    },
    {
      title: "收藏",
      dataIndex: "collectionCount",
      align: "center",
    },
    {
      title: "举报",
      dataIndex: "reportCount",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "questionId",
      render: (questionId) => (
        <>
          <Link
            to="/admin/questionDetail"
            onClick={() => goQuestionDetail(questionId)}
          >
            {" "}
            查看{" "}
          </Link>
          <a onClick={() => showEditQuesion(questionId)}> 修改 </a>{" "}
          <a onClick={() => disapper(questionId)}> 隐藏 </a>
        </>
      ),
      align: "center",
    },
  ];
  const { profileIsModalVisible, editIsModalVisible, timeType } = state;

  return (
    <div className="question-msg">
      <AdminTopBar tag="问题管理" timeShow="false" />
      <div className="question-msg-search">
        <div>
          <ul>
            <li>
              标题：
              <Input
                onChange={(e) => titleSearch(e)}
                style={{ width: 160 }}
              />
            </li>
            <li>
              学科：
              <Input
                onChange={(e) => subjectSearch(e)}
                style={{ width: 160 }}
              />
            </li>
            <li>
              学院：
              <Input
                onChange={(e) => collegeSearch(e)}
                style={{ width: 160 }}
              />
            </li>
            <li>
              提问者：
              <Input
                onChange={(e) => askSearch(e)}
                style={{ width: 160 }}
              />
            </li>
          </ul>
          <ul>
            <li>
              状态：{" "}
              <Select style={{ width: 180 }} onChange={handleChange}>
                <Option value="1">已解决</Option>
                <Option value="0">未解决</Option>
                <Option value="">全部</Option>
              </Select>
            </li>
            <li>
              是否隐藏：{" "}
              <Select style={{ width: 180 }} onChange={handleChangeHide}>
                <Option value="1">已隐藏</Option>
                <Option value="0">未隐藏</Option>
                <Option value="">全部</Option>
              </Select>
            </li>
            <li>
              时间：
              <Space>
                <Select defaultValue={timeType} onChange={setType}>
                  <Option value="date">Date</Option>
                  <Option value="month">Month</Option>
                  <Option value="year">Year</Option>
                </Select>

                <DatePicker picker={timeType} onChange={onChange} />
              </Space>
            </li>
            {/* <li>回答者：<Input onChange={ e => answerSearch(e) } style={{width:180}}/></li> */}
          </ul>
        </div>
        <div>
          <ul>
            <Button
              type="primary"
              onClick={search}
              icon={<SearchOutlined />}
            >
              搜索
            </Button>
          </ul>
          <ul>
            <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=1">
              <Button type="primary" icon={<DownloadOutlined />}>
                导出
              </Button>
            </a>
          </ul>
        </div>
      </div>
      <div className="question-msg-content">
        <Table
          bordered
          align="center"
          onChange={handleChangeQustion}
          pagination={{
            pageSize: state.pageSize,
            total: state.total,
          }}
          dataSource={state.questionDataSource}
          columns={questionColumns}
          rowKey="questionId"
        />
      </div>
      <Modal
        footer={null}
        destroyOnClose
        title="用户信息"
        open={profileIsModalVisible}
        onOk={handleProfile}
        onCancel={cancelProfile}
      >
        <ProfileMsg />
      </Modal>
      <Modal
        destroyOnClose
        title="修改问题"
        open={editIsModalVisible}
        onOk={handleEdit}
        onCancel={cancelEdit}
      >
        <EditQuestion  />
      </Modal>
    </div>
  );
}
