import React, { useEffect, useState } from "react";

import "./index.scss";
import AdminTopBar from "../../../components/admin-topBar/adminTopBar";
import { Table, Modal, Input, Button, Select, Space } from "antd";
import { DatePicker } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
//?引入redux
import { logIdStore } from "@/redux/store";
import { logId } from "@/redux/action";
//?引入请求函数
import { reqListLog, reqGetLogById } from "@/api/index";
import EditLog from "./edit-log";

const { Option } = Select;

export default function Log() {
  const [state, setState] = useState({
    timeType: "year",
    pageSize: 10,
    total: null,
    logName: null,
    logTime: null,
    type: null,
    logIsModalVisible: false,
    logDataSource: [],
  });

  //?初始化日志列表
  const initLogTable = async (param) => {
    const res = await reqListLog(param);
    // console.log(res)
    const { list } = res.data;
    const { totalRows } = res.data.pageInfo;
    setState((pre) => ({ ...pre, logDataSource: list, total: totalRows }));
  };

  useEffect(() => {
    let param = {
      currentPage: 1,
      pageSize: state.pageSize,
    };
    initLogTable(param);
  }, []);

  //?监听查询条件的变化
  const logName = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, logName: null }));
    } else {
      setState((pre) => ({ ...pre, logName: e.target.value }));
    }
    // console.log(state.informContent)
  };

  //?动作类型
  const handleChange = (value) => {
    if (value === "") {
      setState((pre) => ({ ...pre, type: null }));
    } else {
      setState((pre) => ({ ...pre, type: Number(value) }));
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
    if (dateStrings === "") {
      setState((pre) => ({ ...pre, logTime: null }));
    } else {
      setState((pre) => ({ ...pre, logTime: dateStrings }));
    }
  };
  //?实现分页
  const handleChangeLog = (value) => {
    const { logName, logTime, type } = state;
    let param = {
      currentPage: value.current,
      pageSize: value.pageSize,
      logName,
      logTime,
      type,
    };
    initLogTable(param);
  };

  //?实现搜索
  const logSearch = () => {
    const { pageSize, logName, logTime, type } = state;
    let param = {
      currentPage: 1,
      pageSize,
      logName,
      logTime,
      type,
    };
    initLogTable(param);
  };

  //? 点击查看日志或添加日志回调函数
  const showEditLog = (e) => {
    logIdStore.dispatch(logId(e));
    setState((pre) => ({ ...pre, logIsModalVisible: true }));
  };
  const handleEdit = () => {
    setState((pre) => ({ ...pre, logIsModalVisible: false }));
  };
  const cancelEdit = () => {
    setState((pre) => ({ ...pre, logIsModalVisible: false }));
  };

const logColumns = [
  {
    title: "账户",
    dataIndex: "adminName",
    align: "center",
  },
  {
    title: "动作",
    dataIndex: "type",
    render: (type) => (
      <span>
        {type == 1 ? "增加" : type == 2 ? "删除" : type == 3 ? "修改" : "无"}
      </span>
    ),

    align: "center",
  },
  {
    title: "动作内容",
    render: (text) => (
      <p
        dangerouslySetInnerHTML={{ __html: text.substring(0, 20) + "..." }}
      ></p>
    ),
    dataIndex: "content",
    align: "center",
  },
  {
    title: "时间",
    dataIndex: "logTime",
    align: "center",
  },
  {
    title: "IP",
    dataIndex: "ip",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "logId",
    render: (logId) => <a onClick={() => showEditLog(logId)}>查看</a>,
    align: "center",
  },
];
const { logIsModalVisible, timeType, pageSize, total } = state;

  return (
    <div className="log-search">
      <AdminTopBar tag="日志管理" timeShow="false" />
      <div className="log-search-top">
        <ul>
          <li>
            账户：
            <Input onChange={(e) => logName(e)} style={{ width: 180 }} />
          </li>
          <li>
            动作：
            <Select style={{ width: 180 }} onChange={handleChange}>
              <Option value="1">增加</Option>
              <Option value="2">删除</Option>
              <Option value="3">修改</Option>
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
        </ul>
        <ul>
          <li>
            <Button
              type="primary"
              onClick={logSearch}
              icon={<SearchOutlined />}
            >
              搜索
            </Button>
          </li>
          <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=7">
            <Button type="primary" icon={<DownloadOutlined />}>
              导出
            </Button>
          </a>
        </ul>
      </div>
      <div className="log-search-list">
        <Table
          bordered
          align="center"
          onChange={handleChangeLog}
          pagination={{ pageSize: pageSize, total: total }}
          dataSource={state.logDataSource}
          columns={logColumns}
          rowKey="logId"
        />
      </div>
      <Modal
        title="日志"
        destroyOnClose
        footer={null}
        open={logIsModalVisible}
        onOk={handleEdit}
        onCancel={cancelEdit}
      >
        <EditLog />
      </Modal>
    </div>
  );
}
