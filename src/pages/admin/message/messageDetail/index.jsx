import React from 'react'

import React, { Component } from "react";
import { Avatar, Image } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import AdminTopBar from "../../../../components/admin-topBar/adminTopBar";

import './index.scss'

export default function MessageDetail() {
  return (
    <div className="msg-detail">
      <AdminTopbar tag="资讯详情" timeShow="false" />
      <div>
        <h1>请问毕业签订第三方需要注意什么？</h1>
        <hr />
        <div className="msg-profile">
          <Avatar
            size={40}
            src={
              <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
          />
          <ul className="msg-profile-ul">
            <li>
              <span>aqiuya</span>
            </li>
            <li>
              <CrownOutlined style={{ color: "#30CB88" }} />
              <span> 志愿者</span>
            </li>
            <li>2020-2-20 19:00</li>
          </ul>
          <ul>
            资讯内容：我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容我是资讯内容
          </ul>
        </div>
      </div>
    </div>
  );
}
