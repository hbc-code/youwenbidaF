import React, { useEffect, useState } from "react";

import { reportIdStore } from "@/redux/store";
import { reqGetReportById } from "@/api/index";

export default function InformContent() {
  const [state, setState] = useState({
    content: null,
    imgPath: null,
    reportAccountName: null,
    reportTime: null,
    reportedAccountName: null,
    describes: null,
    publishTime: null,
    imgPath2: null,
  });

  useEffect(() => {
    async function req() {
      let param = {
        reportId: Number(reportIdStore.getState()),
      };
      const res = await reqGetReportById(param);
      const {
        content,
        imgPath,
        reportAccountName,
        reportTime,
        reportedAccountName,
      } = res.data;
      const { describes, publishTime } = res.data.thing;
      const imgPath2 = res.data.thing.imgPath;
      // console.log(imgPath)
      setState((pre) => ({
        ...pre,
        content,
        imgPath,
        reportAccountName,
        reportTime,
        reportedAccountName,
        describes,
        publishTime,
        imgPath2,
      }));
    }
    req();
  }, []);

  const hr = {
    marginBottom: "20px",
    height: "2px",
    border: "none",
    borderTop: "1px solid rgba(128, 128, 128, 0.295)",
  };
  const mydiv = {
    display: "flex",
    justifyContent: "space-between",
  };
  const {
    content,
    imgPath,
    reportAccountName,
    reportTime,
    reportedAccountName,
    describes,
    publishTime,
    imgPath2,
  } = state;
  return (
    <div>
      <div style={mydiv}>
        <span>{reportedAccountName} 被举报</span>
        <span>{reportTime}</span>
      </div>
      <hr style={hr} />
      <div>
        <div>被举报内容：{describes}</div>
        <img
          src={"https://xscqa.cqupt.edu.cn/question/img" + imgPath}
          style={{ display: imgPath == -1 ? "none" : "block", width: "100%" }}
          alt="举报详情图片"
        />
      </div>
      <hr style={hr} />
      <div style={mydiv}>
        <span>举报者：{reportAccountName}</span>
      </div>
      <hr style={hr} />
      <div>举报理由：{content}</div>
    </div>
  );
}
