import React, { useEffect, useState } from "react";

import { Avatar, Image } from "antd";
import { reqGetAccountById } from "../../../../api";
import { stuIdStore } from "../../../../redux/store";

export default function ProfileMsg() {
  const [state, setState] = useState({
    imgPath: null,
    userName: null,
    role: null,
    introduce: null,
    questionCount: null,
    answerCount: null,
    agreeCount: null,
    collectionCount: null,
    solveCount: null,
    score: null,
  });

  useEffect(() => {
    async function reqData() {
      const res = await reqGetAccountById({ accountId: stuIdStore.getState() });
      //console.log(res)
      if (res.code == 1) {
        let {
          imgPath,
          userName,
          role,
          introduce,
          questionCount,
          answerCount,
          agreeCount,
          collectionCount,
          solveCount,
          score,
        } = res.data;
        introduce = introduce.replace(/&nbsp;/gi, " ");
        introduce = introduce.replace(/\\n/gi, "\n");
        setState({
          imgPath: "https://xscqa.cqupt.edu.cn/question/img" + imgPath,
          userName,
          role,
          introduce,
          questionCount,
          answerCount,
          agreeCount,
          collectionCount,
          solveCount,
          score,
        });
      }
    }
    reqData();
  },[]);
  const profileBox = {
    display: "flex",
    justifyContent: "space-between",
  };
  let {
    imgPath,
    userName,
    role,
    introduce,
    questionCount,
    answerCount,
    agreeCount,
    collectionCount,
    solveCount,
    score,
  } = state;

  return (
    <>
      <ul>
        <li>
          <Avatar size={50} src={<Image src={imgPath} />} />
        </li>
      </ul>
      <ul style={profileBox}>
        <li>姓名：{userName}</li>
        <li>
          角色：
          {role == 1
            ? "教师"
            : role == 2
            ? "志愿者"
            : role == 3
            ? "学生"
            : "管理员"}
        </li>
        {/* <li>学历：本科</li>
                    <li>学院：经济管理学院</li> */}
      </ul>
      <ul>
        <li>个人简介：{introduce}</li>
        <li>
          成就：提问{questionCount}次，回答{answerCount}次，累计收藏
          {collectionCount}个问题，答案被采纳{solveCount}次，答案被赞同
          {agreeCount}次
        </li>
        <li>积分：{score}</li>
      </ul>
    </>
  );
}
