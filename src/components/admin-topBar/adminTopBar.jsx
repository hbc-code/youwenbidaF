import React from 'react'

import { DatePicker } from "antd";

import './index.scss'

const { RangePicker } = DatePicker;

export default function AdminTopBar({tag, timeShow}) {
  const onChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    // console.log('onOk: ', value);
  };
  return (
    <div className="admin-topbar">
      <div className="admin-topbar-topbar">
        <span style={{ paddingLeft: "15px" }}>
          {" "}
          | {tag ? tag : null}
        </span>
        
        <div
          className="time-pick"
          style={{ display: timeShow === "true" ? "block" : "none" }}
        >
          <span>时间段：</span>
          <RangePicker
            style={{ width: "70%" }}
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
          />
        </div>
      </div>
    </div>
  );
}
