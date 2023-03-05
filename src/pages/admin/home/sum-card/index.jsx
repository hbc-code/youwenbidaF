import React, { useEffect, useState } from "react";

import { Card } from "antd";

import "./index.scss";

import { reqTodayData } from "../../../../api";

//? 在 antd 中使用阿里图标
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2372127_cicuaidwmxq.js",
});

export default function SumCard() {
  const [data, setData] = useState({
    loginCount: "",
    questionCount: "",
    answerCount: "",
    solveCount: "",
  });

  useEffect(() => {
    async function reqData() {
      const result = await reqTodayData();
      setData(result.data)
    }
    reqData()
  }, []);
  const { loginCount, questionCount, answerCount, solveCount } = data;
  const sumConfig = [
    {
      icon: "icon-denglu-duanxin",
      num: loginCount,
      intro: "今日登录人数",
    },
    {
      icon: "icon-tiwen",
      num: questionCount,
      intro: "今日提问人数",
    },
    {
      icon: "icon-huida",
      num: answerCount,
      intro: "今日回答人数",
    },
    {
      icon: "icon-wenti",
      num: solveCount,
      intro: "今日解决问题数量",
    },
  ];
  return (
    <>
      {sumConfig.map((sumObj) => {
        return (
          <Card.Grid className="card-grid" key={sumObj.icon}>
            <IconFont className="sum-icon" type={sumObj.icon} />
            <div>
              <h1>{sumObj.num}</h1>
              <div>{sumObj.intro}</div>
            </div>
          </Card.Grid>
        );
      })}
    </>
  );
}
