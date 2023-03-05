import React from 'react'

import './home.scss'

import { Layout } from 'antd'

import SumCard from './sum-card'
import Echarts from './echarts'
import HomeList from './home-list'

const { Header, Content } = Layout;
export default function Home() {

  return (
    <Layout>
      <Header className="admin-home-header">
        <SumCard />
      </Header>
      <Content className="admin-home-content">
        <Echarts />
      </Content>
      <Content className="admin-home-content">
        <HomeList />
      </Content>
    </Layout>
  );
}
