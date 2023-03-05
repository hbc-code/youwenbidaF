import React, { useEffect, useState } from "react";

import AdminTopBar from "../../../components/admin-topBar/adminTopBar";
//? antd
import {
  Table,
  Modal,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  message,
} from "antd";

import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";

//?引入localstorage模块
import storageUtils from "@/utils/storageUtils";

//?引入请求
import {
  reqWarnAccount,
  reqUpdateReportState,
  reqListReport,
  reqListFeedback,
  reqDeleteReportById,
  reqDeleteFeedbackById,
  reqUpdateFeedbackState,
} from "@/api/index";

//?引入redux
import { reportIdStore, feedbackIdStore } from "@/redux/store";
import { reportId, feedbackId } from "@/redux/action";

import "./index.scss";
import FeedbackContent from "./feedback-content";
import InformContent from "./inform-content";
const { Option } = Select;
export default function Feedback() {
  const [state, setState] = useState({
    adminId: null,
    timeType: "year",
    pageSize: 5,
    state: null,
    time: null,
    informIsModalVisible: false,
    informTotal: null,
    informContent: null,
    informType: null,
    informedName: null,
    informName: null,
    feedbackIsModalVisible: false,
    feedbackTotal: null,
    feedbackContent: null,
    feedbackName: null,
    informDataSource: [],
    feedbackDataSource: [],
  });

  useEffect(() => {
    //?获取管理者ID
    const adminId = storageUtils.getUser().adminId;
    // const {adminId} = memoryUtils.user;
    setState((pre) => ({ ...pre, adminId }));
    let param = {
      currentPage: 1,
      pageSize: state.pageSize,
    };

    //?初始化举报列表
    initInformTable(param);

    //?初始化反馈列表
    initFeedbackTable(param);
  }, []);

  //?举报列表请求
  const initInformTable = async (param) => {
    const res = await reqListReport(param);
    // console.log(res)
    const { list } = res.data;
    const { totalRows } = res.data.pageInfo;
    setState((pre) => ({
      ...pre,
      informDataSource: list,
      informTotal: totalRows,
    }));
  };
  //?反馈列表请求
  const initFeedbackTable = async (param) => {
    const res = await reqListFeedback(param);
    // console.log(res)
    const { list } = res.data;
    const { totalRows } = res.data.pageInfo;
    setState((pre) => ({
      ...pre,
      feedbackDataSource: list,
      feedbackTotal: totalRows,
    }));
  };
  //?实现举报分页
  const handleChangeInform = (value) => {
    const { informContent, informType, informedName, informName, state, time } =
      state;
    // console.log(informContent)
    let param = {
      currentPage: value.current,
      pageSize: value.pageSize,
      content: informContent,
      reportTime: time,
      reportAccountName: informName,
      reportedAccountName: informedName,
      state,
      type: informType,
    };
    initInformTable(param);
  };

  //?监听举报查询条件变化
  const informContent = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, informContent: null }));
    } else {
      setState((pre) => ({ ...pre, informContent: e.target.value }));
    }
    // console.log(state.informContent)
  };
  const informType = (value) => {
    if (value === "") {
      setState((pre) => ({ ...pre, informType: null }));
    } else {
      setState((pre) => ({ ...pre, informType: Number(value) }));
    }
    // console.log(`selected ${value}`);
  };
  const informedName = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, informedName: null }));
    } else {
      setState((pre) => ({ ...pre, informedName: e.target.value }));
    }
  };
  const informName = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, informName: null }));
    } else {
      setState((pre) => ({ ...pre, informName: e.target.value }));
    }
  };

  //?搜索举报
  const informSearch = () => {
    // console.log("我点击了搜索")
    const { informContent, informType, informedName, informName, state, time } =
      state;
    // console.log(informContent)
    let param = {
      currentPage: 1,
      pageSize: state.pageSize,
      content: informContent,
      reportTime: time,
      reportAccountName: informName,
      reportedAccountName: informedName,
      state,
      time,
      type: informType,
    };
    initInformTable(param);
  };

  //?点击查看举报
  const showInform = (e) => {
    //存储举报id到redux
    reportIdStore.dispatch(reportId(e));
    setState((pre) => ({ ...pre, informIsModalVisible: true }));
  };
  const handleInform = () => {
    setState((pre) => ({ ...pre, informIsModalVisible: false }));
  };
  const cancelInform = () => {
    setState((pre) => ({ ...pre, informIsModalVisible: false }));
  };

  //?隐藏举报
  // const disapperInform = (e) => {
  //     let param = {
  //         adminId:state.adminId,
  //         reportId:Number(e)
  //     }
  //     reqDeleteReportById(param)
  //     .then(res=>{
  //         if(res.data){
  //             message.success("隐藏成功")
  //             informSearch()
  //         }else{
  //             message.error("隐藏失败")
  //         }
  //     })
  //     .catch(err=>{
  //         console.log(err)
  //         message.error("发生错误")
  //     })
  // }
  //?解决举报
  const solveInform = (e) => {
    let param = {
      adminId: state.adminId,
      reportId: Number(e),
    };
    reqUpdateReportState(param)
      .then((res) => {
        if (res.data.code == 1) {
          message.success("成功解决");
          informSearch();
        } else {
          message.error("解决失败");
        }
      })
      .catch((err) => {
        // console.log(err)
        message.error("发生错误");
      });
  };
  //?对被举报者进行警告
  const warnInform = (e) => {
    let param = {
      adminId: state.adminId,
      reportId: Number(e),
    };
    reqWarnAccount(param).then((res) => {
      if (res.data) {
        message.success("警告成功");
        informSearch();
      } else {
        message.error("警告失败");
      }
    });
  };
  //?点击查看反馈
  const showFeedback = (e) => {
    // console.log(e)
    //存储反馈id到redux
    feedbackIdStore.dispatch(feedbackId(e));
    setState((pre) => ({ ...pre, feedbackIsModalVisible: true }));
    // console.log(e)
    // console.log('我点击了提问者')
  };
  const handleFeedback = () => {
    setState((pre) => ({ ...pre, feedbackIsModalVisible: false }));
  };
  const cancelFeedback = () => {
    setState((pre) => ({ ...pre, feedbackIsModalVisible: false }));
  };

  //?实现反馈分页
  const handleChangeFeedback = (value) => {
    // console.log(value)
    const { feedbackContent, feedbackName, state, time } = state;
    let param = {
      currentPage: value.current,
      pageSize: value.pageSize,
      content: feedbackContent,
      feedbackTime: time,
      accountName: feedbackName,
      state,
    };

    initFeedbackTable(param);
  };

  //?搜索反馈
  const feedbackSearch = () => {
    const { pageSize, feedbackContent, feedbackName, state, time } = state;
    let param = {
      currentPage: 1,
      pageSize,
      content: feedbackContent,
      feedbackTime: time,
      accountName: feedbackName,
      state,
    };
    initFeedbackTable(param);
  };

  //?隐藏反馈
  // const disapperFeedback = (e) => {
  //     let param = {
  //         adminId:state.adminId,
  //         feedbackId:Number(e)
  //     }
  //     reqDeleteFeedbackById(param)
  //     .then(res=>{
  //         if(res.code == 1){
  //             message.success("隐藏成功")
  //             feedbackSearch()
  //         }
  //     })
  // }
  //?解决反馈
  const solveFeedback = (e) => {
    let param = {
      adminId: state.adminId,
      feedbackId: Number(e),
    };
    reqUpdateFeedbackState(param).then((res) => {
      if (res.code == 1) {
        message.success("已解决");
        feedbackSearch();
      }
    });
  };

  //?监听反馈查询条件变化
  const feedbackContent = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, feedbackContent: null }));
    } else {
      setState((pre) => ({ ...pre, feedbackContent: e.target.value }));
    }
  };
  const feedbackName = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, feedbackName: null }));
    } else {
      setState((pre) => ({ ...pre, feedbackName: e.target.value }));
    }
  };

  //?设置时间选择器类型
  const setType = (e) => {
    setState((pre) => ({ ...pre, timeType: e }));
  };
  //? 时间选择器回调函数
  const onChange = (date, dateStrings) => {
    // console.log(dateStrings)
    if (dateStrings === "") {
      setState((pre) => ({ ...pre, time: null }));
    } else {
      setState((pre) => ({ ...pre, time: dateStrings }));
    }
  };
  //?处理状态
  const handleChange = (value) => {
    if (value === "") {
      setState((pre) => ({ ...pre, state: null }));
    } else {
      setState((pre) => ({ ...pre, state: value }));
    }
    // console.log(`selected ${value}`);
  };

  const informColumns = [
    {
      title: "举报内容",
      dataIndex: "content",
      // dangerouslySetInnerHTML = {{__html:text.substring(0,35)+"..."}}
      render: (text) => (
        <p
          dangerouslySetInnerHTML={{ __html: text.substring(0, 35) + "..." }}
        ></p>
      ),
      align: "center",
    },
    {
      title: "举报类型",
      dataIndex: "type",
      render: (text) => (
        <span>{text == 1 ? "问题" : text == 2 ? "回答" : "评论"}</span>
      ),
      align: "center",
    },
    {
      title: "被举报者",
      dataIndex: "reportedAccountName",
      align: "center",
    },
    {
      title: "举报者",
      dataIndex: "reportAccountName",
      align: "center",
    },
    {
      title: "举报理由",
      dataIndex: "reason",
      align: "center",
    },
    {
      title: "举报时间",
      dataIndex: "reportTime",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "state",
      render: (text) => <span>{text == 0 ? "未解决" : "已解决"}</span>,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "reportId",
      render: (reportId) => (
        <>
          <a onClick={() => showInform(reportId)}>查看 </a>
          <a onClick={() => warnInform(reportId)}>警告</a>
          {/* <a onClick={() => disapperInform(reportId)}> 隐藏</a> */}
          {/* <a onClick={() => solveInform(reportId)}> 解决</a> */}
        </>
      ),
      align: "center",
    },
  ];
  const feedbackColumns = [
    {
      title: "反馈内容",
      dataIndex: "content",
      render: (text) => (
        <p
          dangerouslySetInnerHTML={{ __html: text.substring(0, 8) + "..." }}
        ></p>
      ),
      align: "center",
    },
    {
      title: "反馈者",
      dataIndex: "accountName",
      align: "center",
    },
    {
      title: "反馈时间",
      dataIndex: "feedbackTime",
      align: "center",
    },
    {
      title: "点赞",
      dataIndex: "agreeCount",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "state",
      render: (text) => <span>{text == 0 ? "未解决" : "已解决"}</span>,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "feedbackId",
      render: (feedbackId) => (
        <>
          <a onClick={() => showFeedback(feedbackId)}>查看 </a>
          <a onClick={() => solveFeedback(feedbackId)}> 解决 </a>
          {/* <a onClick={() => disapperFeedback(feedbackId)}> 隐藏</a> */}
        </>
      ),
      align: "center",
    },
  ];
  const {
    informIsModalVisible,
    feedbackIsModalVisible,
    timeType,
    informTotal,
    feedbackTotal,
  } = state;
  return (
    <div>
      <div className="feedback-infrom-msg">
        <AdminTopBar tag="举报管理" timeShow="false" />
        <div className="feedback-infrom-msg-search">
          <div>
            <ul>
              <li>
                举报原因：
                <Input
                  onChange={(e) => informContent(e)}
                  style={{ width: 180 }}
                />
              </li>
              <li>
                举报类型：
                <Select style={{ width: 180 }} onChange={informType}>
                  <Option value="1">问题</Option>
                  <Option value="2">回答</Option>
                  <Option value="3">评论</Option>
                  <Option value="">无</Option>
                </Select>
              </li>
              <li>
                被举报者：
                <Input
                  onChange={(e) => informedName(e)}
                  style={{ width: 180 }}
                />
              </li>
            </ul>
            <ul>
              <li>
                举报者：
                <Input
                  onChange={(e) => informName(e)}
                  style={{ width: 180 }}
                />
              </li>
              <li>
                举报时间：
                <Space>
                  <Select defaultValue={timeType} onChange={setType}>
                    <Option value="date">Date</Option>
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                  </Select>
                  <DatePicker picker={timeType} onChange={onChange} />
                </Space>
              </li>
              <li>
                处理状态：
                <Select style={{ width: 180 }} onChange={handleChange}>
                  <Option value="1">已解决</Option>
                  <Option value="0">未解决</Option>
                  <Option value="">全部</Option>
                </Select>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <Button
                type="primary"
                onClick={informSearch}
                icon={<SearchOutlined />}
              >
                搜索
              </Button>
            </ul>
            <ul>
              <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=5">
                <Button type="primary" icon={<DownloadOutlined />}>
                  导出
                </Button>
              </a>
            </ul>
          </div>
        </div>
        <div className="feedback-infrom-msg-content">
          <Table
            bordered
            onChange={handleChangeInform}
            pagination={{ pageSize: state.pageSize, total: informTotal }}
            align="center"
            dataSource={state.informDataSource}
            columns={informColumns}
            rowKey="reportId"
          />
        </div>
        <Modal
          title="举报详情"
          destroyOnClose
          footer={null}
          open={informIsModalVisible}
          onOk={handleInform}
          onCancel={cancelInform}
        >
          <InformContent />
        </Modal>
      </div>
      <div className="feedback-infrom-msg">
        <AdminTopBar tag="反馈管理" timeShow="false" />
        <div className="feedback-infrom-msg-search">
          <div>
            <ul>
              <li>
                反馈内容：
                <Input
                  onChange={(e) => feedbackContent(e)}
                  style={{ width: 180 }}
                />
              </li>
              <li>
                反馈者：
                <Input
                  onChange={(e) => feedbackName(e)}
                  style={{ width: 180 }}
                />
              </li>
            </ul>
            <ul>
              <li>
                处理状态：
                <Select style={{ width: 180 }} onChange={handleChange}>
                  <Option value="1">已解决</Option>
                  <Option value="0">未解决</Option>
                  <Option value="">无</Option>
                </Select>
              </li>
              <li>
                反馈时间：
                <Space>
                  <Select defaultValue={timeType} onChange={setType}>
                    <Option value="date">Date</Option>
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                  </Select>
                  <DatePicker picker={timeType} onChange={onChange} />
                </Space>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <Button
                type="primary"
                onClick={feedbackSearch}
                icon={<SearchOutlined />}
              >
                搜索
              </Button>
            </ul>
            <ul>
              <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=6">
                <Button type="primary" icon={<DownloadOutlined />}>
                  导出
                </Button>
              </a>
            </ul>
          </div>
        </div>
        <div className="feedback-infrom-msg-content">
          <Table
            bordered
            align="center"
            onChange={handleChangeFeedback}
            pagination={{ pageSize: state.pageSize, total: feedbackTotal }}
            dataSource={state.feedbackDataSource}
            columns={feedbackColumns}
            rowKey="feedbackId"
          />
        </div>
        <Modal
          title="反馈详情"
          destroyOnClose
          footer={null}
          open={feedbackIsModalVisible}
          onOk={handleFeedback}
          onCancel={cancelFeedback}
        >
          <FeedbackContent />
        </Modal>
      </div>
    </div>
  );
}
