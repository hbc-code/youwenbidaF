import React, { useState } from "react";

import "./index.scss";
import { Avatar, Image } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import { reqGetFeedback } from "@/api/index";
import { feedbackIdStore } from "@/redux/store";
import { useEffect } from "react";

export default function FeedbackContent() {
  const [state, setState] = useState({
    feedbackContent: null,
    feedbackImage: null,
    feedbackRole: null,
    feedbackTime: null,
    feedbackUserName: null,
  });

  useEffect(() => {
    async function req() {
      const res = await reqGetFeedback({
        feedbackId: Number(feedbackIdStore.getState()),
      });
      // console.log(res)
      const {
        feedbackContent,
        feedbackImage,
        feedbackRole,
        feedbackTime,
        feedbackUserName,
      } = res.data;
      setState((pre) => ({
        ...pre,
        feedbackContent,
        feedbackImage,
        feedbackRole,
        feedbackTime,
        feedbackUserName,
      }));
    }
    req();
  }, []);

  const {
    feedbackContent,
    feedbackImage,
    feedbackRole,
    feedbackTime,
    feedbackUserName,
  } = state;
  return (
    <div className="feedback-content">
      {/* <Avatar
                    size={40}
                    src={<Image src={"http://202.202.43.250:8080/img"+feedbackImage} />}
                   /> */}
      <ul className="feedback-content-ul">
        <li>
          反馈者：
          {feedbackUserName}
        </li>
        <li>
          <span>
            {" "}
            {feedbackRole == 1
              ? "教师"
              : feedbackRole == 2
              ? "志愿者"
              : feedbackRole == 3
              ? "学生"
              : "管理员"}
          </span>
        </li>
        <li>{feedbackTime}</li>
      </ul>
      <ul>详情：{feedbackContent}</ul>
      <img
        src={"https://xscqa.cqupt.edu.cn/question/img" + feedbackImage}
        style={{ width: "100%" }}
        alt=""
      />
    </div>
  );
}
