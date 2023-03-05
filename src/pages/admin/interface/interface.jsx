import React from 'react'

import AdminTopBar from "../../../components/admin-topBar/adminTopBar";
import { reqListStaticImg } from "@/api/index";
import UploadImg from "./upload/upload";
import './index.scss'

export default function Interface() {
  return (
    <div className="interface-msg">
      <AdminTopBar tag="界面管理" timeShow="false" />
      <div className="img-content">
        <div className="img-content-part1">
          <div className="title">
            轮播图管理：
            <div className="lunbo">
              <UploadImg num="1" type="1" grade="0" />
              <UploadImg num="1" type="1" grade="1" />
              <UploadImg num="1" type="1" grade="2" />
            </div>
          </div>

          <div className="title">
            系统默认头像：
            <UploadImg num="1" type="2" />
          </div>

          <div className="title">
            小程序背景图片和简介：
            <UploadImg num="1" type="3" />
          </div>

          {/* </div> */}
        </div>
        <div className="img-content-part2">
          <div>
            <div className="title">
              用户信息背景图：
              <UploadImg num="1" type="4" />
            </div>
          </div>
          <div>
            <div className="title">
              成长总积分背景图：
              <UploadImg num="1" type="5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
