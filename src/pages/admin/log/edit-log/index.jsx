import React, { useEffect, useState } from 'react'

import { reqGetLogById } from '../../../../api'
import { logIdStore } from "@/redux/store"; 

export default function EditLog() {
  const [state, setState] = useState({
    adminName: null,
    content: null,
    imgPath: null,
    ip: null,
    logTime: null,
    type: null,
  });

  useEffect(() => {
    async function req() {
      const res = await reqGetLogById({ logId: Number(logIdStore.getState()) });
      //console.log(res);
      const { adminName, content, imgPath, ip, logTime, type } = res.data;
      setState((pre) => ({
        ...pre,
        adminName,
        content,
        imgPath,
        ip,
        logTime,
        type,
      }));
    }
    req()
  }, [])

  const { adminName, content, imgPath, ip, logTime, type } = state;
  return (
    <div>
      <ul>
        <li>账户：{adminName}</li>
        <li>
          动作：
          {type == 1 ? "增加" : type == 2 ? "删除" : type == 3 ? "修改" : "无"}
        </li>
        <li>
          <span>动作内容：</span>
          <span dangerouslySetInnerHTML={{ __html: content }}></span>
        </li>
        <img src={"https://xscqa.cqupt.edu.cn/question/" + imgPath} />
        <li>IP地址：{ip}</li>
        <li>时间：{logTime}</li>
      </ul>
    </div>
  );
}
