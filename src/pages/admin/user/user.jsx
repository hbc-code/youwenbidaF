import React, { useEffect, useState } from "react";

import axios from "axios";
import AdminTopBar from "../../../components/admin-topBar/adminTopBar";
import { Table, Input, Button, Select, Cascader, message, Upload } from "antd";
//?引入localstorage模块
import storageUtils from "@/utils/storageUtils";

import {
  SearchOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.scss";
import {
  reqListAllSubject,
  reqListAccount,
  reqDisapperQuestion,
  reqUpdateAccountRole,
  reqDeleteAccountById,
} from "@/api/index";
import { use } from "echarts";
const { Option } = Select;

export default function User() {
  const [state, setState] = useState({
    adminId: null,
    college: null,
    userName: null,
    userCode: null,
    role: null,
    newRole: null,
    subjectId: null,
    pageSize: 10,
    total: null,
    type: storageUtils.getUser().type,
    userDataSource: [],
    options: [],
    status: 0,
  });

  const initUserTable = async (param) => {
    const res = await reqListAccount(param);
    //console.log(res)
    const { list } = res.data;
    const { totalRows } = res.data.pageInfo;
    setState((pre) => ({ ...pre, userDataSource: list, total: totalRows }));
  };

  useEffect(() => {
    async function req() {
      let param = {
        currentPage: 1,
        pageSize: state.pageSize,
      };
      const adminId = storageUtils.getUser().adminId;
      //console.log(adminId)
      initUserTable(param);
      const res = await reqListAllSubject();
      //console.log(res)
      setState((pre) => ({
        ...pre,
        options: res.data,
        adminId: Number(adminId),
      }));
      //console.log(state.adminId)
    }
    req();
  }, []);

  //?实现分页
  const handleChangeUser = (value) => {
    console.log(value);
    const { college, userName, role } = state;
    let param = {
      currentPage: value.current,
      pageSize: value.pageSize,
      college,
      userName,
      role,
    };
    initUserTable(param);
  };

  //?监听搜索条件变化
  const userNameSearch = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, userName: null }));
    } else {
      setState((pre) => ({ ...pre, userName: e.target.value }));
    }
  };
  const userCodeSearch = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, userCode: null }));
    } else {
      setState((pre) => ({ ...pre, userCode: e.target.value }));
    }
  };
  const collegeSearch = (e) => {
    if (e.target.value === "") {
      setState((pre) => ({ ...pre, college: null }));
    } else {
      setState((pre) => ({ ...pre, college: e.target.value }));
    }
  };
  const onChange = (e) => {
    console.log(e);
    if (e === "") {
      setState((pre) => ({ ...pre, role: null }));
    } else {
      setState((pre) => ({ ...pre, role: e }));
    }
  };

  //?实现搜索
  const userSearch = () => {
    const { college, userName, role, pageSize, userCode } = state;
    let param = {
      currentPage: 1,
      pageSize,
      college,
      userName,
      role,
      accountId: userCode,
      excel: null,
    };
    //console.log(param)
    initUserTable(param);
  };

  //?监控角色级联选择
  const handleChange = (value) => {
    //console.log(value.length-1)
    //console.log(value[value.length-1])
    if (value === []) {
      setState((pre) => ({ ...pre, newRole: null }));
    } else if (1 === value.length) {
      setState((pre) => ({ ...pre, newRole: Number(value[value.length - 1]) }));
    } else {
      setState((pre) => ({
        ...pre,
        newRole: Number(value[0]),
        subjectId: Number(value[value.length - 1]),
      }));
      setTimeout(() => {
        console.log(state);
      }, 1000);
    }
  };

  //?删除用户
  /* const disapper = async (e) => {
    let param = {
      accountId: Number(e),
      adminId: Number(storageUtils.getUser().adminId),
    };
    //console.log(param)
    const res = await reqDeleteAccountById(param);
    if (res.code == 1) {
      message.success("删除成功");
      userSearch();
    }
  }; */

  //?修改角色
  const updateUserRole = (e) => {
    const { newRole, adminId, subjectId } = state;
    console.log(e);
    let param = {
      accountId: e,
      newRole,
      adminId,
      subjectId,
    };
    reqUpdateAccountRole(param)
      .then((res) => {
        if (res.code == 1) {
          message.success("成功修改角色！");
          userSearch();
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //?批量导入
  const exportF = () => {
    let formData = new FormData();
    console.log(state.excel);
    formData.append("excel", state.excel);
    axios({
      method: "post",
      //url: "https://xscqa.cqupt.edu.cn/question/admin/importVolunteer",
      url: "/admin/importVolunteer",
      headers: { "Content-type": "multipart/form-data;charset=UTF-8" },
      data: formData,
    }).then((res) => {
      console.log(res);
      if (res.data.code == 1) {
        message.success("成功导入！");
      } else {
        message.error("导入失败！");
      }
    });
  };

  const beforeUpload = (file, fileList) => {
    //console.log("上传前");
    // console.log(file)
    setState((pre) => ({ ...pre, excel: file, status: 1 }));
    return false;
  };
  const handleUpload = (info) => {
    if (info.file.status !== "uploading") {
      //console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const { options } = state;
  const options2 = options.slice(0, 3);
  const userColumns = [
    {
      title: "姓名",
      dataIndex: "userName",
      align: "center",
    },
    {
      title: "所属学院",
      dataIndex: "college",
      align: "center",
    },
    {
      title: "总积分",
      dataIndex: "score",
      align: "center",
    },
    {
      title: "角色",
      dataIndex: "role",
      render: (text) => {
        if (state.type == 1) {
          return (
            <>
              <Cascader
                options={options}
                onChange={handleChange}
                placeholder={
                  text == 1
                    ? "教师"
                    : text == 2
                    ? "志愿者"
                    : text == 3
                    ? "学生"
                    : "管理员"
                }
              />
            </>
          );
        } else {
          return (
            <Cascader
              options={options2}
              onChange={handleChange}
              placeholder={
                text == 1
                  ? "教师"
                  : text == 2
                  ? "志愿者"
                  : text == 3
                  ? "学生"
                  : "管理员"
              }
            />
          );
        }
      },
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "accountId",
      render: (accountId) => (
        <>
          <a onClick={() => updateUserRole(accountId)}>修改角色</a>
          {/* <a onClick={() => disapper(accountId)}>删除</a> */}
        </>
      ),
      align: "center",
    },
  ];
  return (
    <div className="user-search">
      <AdminTopBar tag="用户管理" timeShow="false" />
      <div className="user-search-top">
        <ul>
          <li>
            姓名：
            <Input onChange={(e) => userNameSearch(e)} style={{ width: 110 }} />
          </li>
          <li>
            统一认证码：
            <Input onChange={(e) => userCodeSearch(e)} style={{ width: 110 }} />
          </li>
          <li>
            所属学院：
            <Input onChange={(e) => collegeSearch(e)} style={{ width: 110 }} />
          </li>
          <li>
            角色：
            <Select style={{ width: 110 }} onChange={onChange}>
              <Option value="1">教师</Option>
              <Option value="2">志愿者</Option>
              <Option value="3">学生</Option>
              <Option value="4">管理员</Option>
              <Option value="">全部</Option>
            </Select>
          </li>
        </ul>
        <ul>
          <div>
            <Upload
              name="excel"
              //action="123"
              beforeUpload={beforeUpload}
              onChange={handleUpload}
            >
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                icon={<UploadOutlined />}
              >
                选择文件
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={exportF}
              disabled={state.status == 0}
              style={{ marginTop: 16 }}
            >
              上传
            </Button>
          </div>

          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={userSearch}
            icon={<SearchOutlined />}
          >
            搜索
          </Button>

          <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=2">
            <Button type="primary" icon={<DownloadOutlined />}>
              导出
            </Button>
          </a>
        </ul>
      </div>
      <div className="user-search-list">
        <Table
          bordered
          align="center"
          onChange={handleChangeUser}
          pagination={{
            pageSize: state.pageSize,
            total: state.total,
          }}
          dataSource={state.userDataSource}
          columns={userColumns}
          rowKey="userName"
        />
      </div>
    </div>
  );
}
