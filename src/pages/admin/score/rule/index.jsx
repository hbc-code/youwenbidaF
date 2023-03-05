import React, { useEffect, useState } from "react";

import { Tag, Button, Modal, Input, message } from "antd";

//?引入localstorage模块
import storageUtils from "@/utils/storageUtils";

//?引入请求函数
import { reqAllRules, reqUpdateRule } from "@/api/index";
const { TextArea } = Input;

export default function Rule() {
  const [state, setState] = useState({
    adminId: null,
    ruleArr: [],
    scoreIsModalVisible: false,
    preRule: null,
    preScore: null,
    ruleType: null,
    newScore: null,
    ruleInfo: null,
  });

  const initRule = () => {
    reqAllRules().then((res) => {
      //console.log(res.data)
      setState((pre) => ({ ...pre, ruleArr: res.data }));
    });
  };

  useEffect(() => {
    //?获取管理者ID
    const adminId = storageUtils.getUser().adminId;
    // const {adminId} = memoryUtils.user;
    setState((pre) => ({ ...pre, adminId }));
    initRule();
  }, []);

  //?点击修改
  const showChange = (e) => {
    //console.log(e)
    setState((pre) => ({
      ...pre,
      scoreIsModalVisible: true,
      preRule: e.ruleInfo,
      preScore: e.score,
      ruleType: e.ruleType,
    }));
  };
  //?确定修改回调函数
  const handlescore = () => {
    const { newScore, ruleType, adminId, ruleInfo } = state;
    let param = {
      newScore: Number(newScore),
      ruleType: Number(ruleType),
      adminId: Number(adminId),
      ruleInfo,
    };
    reqUpdateRule(param).then((res) => {
      if (res.code === 1) {
        message.success("修改成功");
        initRule();
      } else {
        message.error("修改失败");
      }
      //console.log(res)
    });
    setState((pre) => ({ ...pre, scoreIsModalVisible: false }));
  };
  const cancelscore = () => {
    Modal.destroyAll();
    setState((pre) => ({ ...pre, scoreIsModalVisible: false }));
  };
  const ScoreChange = (e) => {
    //console.log(e.target.value);
    setState((pre) => ({ ...pre, newScore: e.target.value }));
  };
  const ruleChange = (e) => {
    //console.log(e.target.value);
    setState((pre) => ({ ...pre, ruleInfo: e.target.value }));
  };
  return (
    <div>
      <ul>
        {state.ruleArr.map((item, index) => (
          <div key={index}>
            <Tag color="lime">
              <li>{item.ruleInfo}</li>
            </Tag>
            <Button type="primary" onClick={() => showChange(item)}>
              修改
            </Button>
          </div>
        ))}
      </ul>
      <Modal
        destroyOnClose
        title="修改规则"
        open={state.scoreIsModalVisible}
        onOk={handlescore}
        onCancel={cancelscore}
      >
        <ul>
          <li>
            规则：
            <TextArea
              placeholder={state.preRule}
              allowClear
              style={{ width: 420 }}
              onChange={ruleChange}
            />
          </li>
          <br></br>
          <li>
            积分：
            <Input
              placeholder={state.preScore}
              allowClear
              style={{ width: 160 }}
              onChange={ScoreChange}
            />
          </li>
        </ul>
      </Modal>
      {/* <ul style={{backgroundColor:"#D2F1E3",padding:8,borderRadius:"3px"}}>
                    总积分 = <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 
                </ul> */}
      {/* <ul style={{textAlign:'center'}}>
                    <Button type="primary">保存</Button>
                    <Button type="primary" style={{marginLeft:'20px'}}>导出</Button>
                </ul> */}
    </div>
  );
}
