import React from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";

import "./admin.scss";

import LeftNav from "../../components/left-nav/leftNav";
import Header from "../../components/header/header";

const { Footer, Sider, Content } = Layout;
export default function Admin() {
  return (
    <Layout  style={{ minHeight: "100vh", minWidth: "1400px" }}>
      <Header />
      <Layout>
        <Sider style={{ backgroundColor: "white" }} width="180">
          <LeftNav />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer
        style={{
          backgroundColor: "#30CB88",
          color: "#ffffff",
          textAlign: "center",
          marginBottom: "-20px",
        }}
      >
        重庆邮电大学学生处
      </Footer>
    </Layout>
  );
}
