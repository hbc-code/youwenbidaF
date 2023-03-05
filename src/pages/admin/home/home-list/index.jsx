import React, { useEffect, useState } from "react";

import "./index.scss";

import { Table } from "antd";

import AdminTopBar from "../../../../components/admin-topBar/adminTopBar";

import {
  volunteerColumns,
  subjectColumns,
} from "../../../../config/contentConfig";
import { reqVolunteer, reqSubject } from "../../../../api";

export default function HomeList() {
  const [state, setState] = useState({
    pageSize: 5,
    volunteerTotal: 0,
    subjectTotal: 0,
    volunteerDataSource: [],
    subjectDataSource: [],
  });

  const initVolunteer = async (params) => {
    //?初始化志愿者相关表格数据
    const res = await reqVolunteer(params);
    const { list } = res.data;
    const { totalRows } = res.data.pageInfo;
    setState((pre) => ({
      ...pre,
      volunteerTotal: totalRows,
      volunteerDataSource: list,
    }));
  };
  const initSubject = async (params) => {
    //?初始化学科相关表格数据
    const res = await reqSubject(params);
    // console.log(res)
    const { list } = res.data;
    const { totalRows } = res.data.pageInfo;
    setState((pre) => {
      return { ...pre, subjectTotal: totalRows, subjectDataSource: list };
    });
  };

  useEffect(() => {
    let params = {
      currentPage: 1,
      pageSize: state.pageSize,
    };
    initVolunteer(params);
    initSubject(params);
  }, []);

  //?处理表格分页点击事件
  const handleChangeVolunteer = (value) => {
    // console.log(value)
    let params = {
      currentPage: value.current,
      pageSize: value.pageSize,
    };
    reqVolunteer(params).then((res) => {
      // console.log(res)
      const { list } = res.data;
      setState((pre) => ({ ...pre, volunteerDataSource: list }));
    });
  };
  const handleChangeSubject = (value) => {
    // console.log(value)
    let params = {
      currentPage: value.current,
      pageSize: value.pageSize,
    };
    reqSubject(params).then((res) => {
      // console.log(res)
      const { list } = res.data;
      setState((pre) => ({ ...pre, subjectDataSource: list }));
    });
  };
  return (
    <div className="home-list">
      <div className="home-list1">
        <AdminTopBar tag="志愿者相关" timeShow="false" />
        <div className="home-list-content1">
          <Table
            bordered
            size="small"
            align="center"
            pagination={{
              pageSize: state.pageSize,
              total: state.volunteerTotal,
            }}
            onChange={handleChangeVolunteer}
            dataSource={state.volunteerDataSource}
            columns={volunteerColumns}
            rowKey="college"
          />
        </div>
      </div>
      <div className="home-list2">
        <AdminTopBar tag="学科相关" timeShow="false" />
        <div className="home-list-content2">
          <Table
            bordered
            size="small"
            align="center"
            onChange={handleChangeSubject}
            pagination={{
              pageSize: state.pageSize,
              total: state.subjectTotal,
            }}
            dataSource={state.subjectDataSource}
            columns={subjectColumns}
            rowKey="subjectId"
          />
        </div>
      </div>
    </div>
  );
}
