import React, { useEffect, useState } from 'react'

import './header.scss'

export default function Header() {
  const [data, setData] = useState({
    name:'',
    flag:null
  })
  
  useEffect(() => {
    
  })

  const {name} = data 
  return (
    <div className="header">
      <div className="header-left">
        <h1>邮问必答重邮学习发展中心</h1>
        <span>后台管理系统</span>
      </div>
      <div className="header-right">
        <span>{name}</span>
        <span> | </span>
        <a href="https://ids.cqupt.edu.cn/authserver/logout">退出</a>
      </div>
    </div>
  );
}
