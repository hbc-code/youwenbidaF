import React, { useEffect } from 'react'

import './index.scss'

import * as echarts from "echarts";

import AdminTopBar from '../../../../components/admin-topBar/adminTopBar';
import { reqLoginStatistic, reqQuestionStatistic } from '../../../../api'

export default function Echarts() {
  useEffect(() => {
    async function reqData(){
      const loginResult = await reqLoginStatistic();
      const questionResult = await reqQuestionStatistic();
      const { loginCollege, loginCountByDate } = loginResult.data;
      const { subjectLogin } = questionResult.data;
      // console.log(loginResult)
      // console.log(questionResult)
      //?七天登录人数变化（折线图）
      let myChart1 = echarts.init(
        document.querySelector(".echart-content1-line")
      );
      let option1 = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          text: "七天登陆人数变化",
          left: "center",
          textStyle: {
            color: "#848484",
            fontSize: "16px",
          },
        },
        grid: {
          left: "20%",
        },
        color: ["#30CB88"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: loginResult.data.date,

          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12,
            },
          },
          axisLine: {
            lineStyle: {
              color: "#747474",
            },
          },
        },
        yAxis: {
          type: "value",
          data: [200, 400, 600, 800, 1000, 1200],
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#747474",
              fontSize: 12,
            },
          },
          axisLine: {
            lineStyle: {
              color: "#747474",
            },
          },
        },

        series: [
          {
            name: "登录人数",
            type: "line",
            smooth: true,
            data: loginCountByDate,
          },
        ],
      };
      myChart1.setOption(option1);

      //?七天回答、提问数量变化（折线图）
      let myChart2 = echarts.init(
        document.querySelector(".echart-content2-line")
      );
      let option2 = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          text: "七天提问/回答变化",
          left: "left",
          textStyle: {
            color: "#848484",
            fontSize: "16px",
          },
        },
        grid: {
          left: "20%",
        },
        color: ["#00f2f1", "#ed3f35"],
        legend: {
          top: "0%",
          textStyle: {
            color: "black",
            fontSize: "12",
          },
          right: "10%",
          data: ["提问量", "回答量"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "26",
            "28",
            "29",
            "30",
          ],
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12,
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.2)",
            },
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12,
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
        },

        series: [
          {
            name: "提问量",
            type: "line",
            lineStyle: {
              color: "#0184d5",
              width: 2,
            },
            areaStyle: {
              // 渐变色，只需要复制即可
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1, 132, 213, 0.4)", // 渐变色的起始颜色
                  },
                  {
                    offset: 0.8,
                    color: "rgba(1, 132, 213, 0.1)", // 渐变线的结束颜色
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
              color: "#0184d5",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
            smooth: true,
            data: [
              30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40,
              30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40,
            ],
          },
          {
            name: "回答量",
            type: "line",
            smooth: true,
            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            // 设置拐点 小圆点
            symbol: "circle",
            // 拐点大小
            symbolSize: 5,
            // 设置拐点颜色以及边框
            itemStyle: {
              color: "#00d887",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
            // 开始不显示拐点， 鼠标经过显示
            showSymbol: false,
            data: [
              130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40,
              130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20,
            ],
          },
        ],
      };
      myChart2.setOption(option2);

      //?各学院登录数量分布（饼状图）
      let myChart3 = echarts.init(
        document.querySelector(".echart-content1-bar")
      );
      let option3 = {
        title: {
          text: "各学院登录数量分布",
          left: "center",
          textStyle: {
            color: "#848484",
            fontSize: "16px",
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: loginCollege,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart3.setOption(option3);

      //?各学科问题数量分布（饼状图）
      let myChart4 = echarts.init(
        document.querySelector(".echart-content2-bar")
      );
      let option4 = {
        title: {
          text: "各学科问题数量分布",
          left: "center",
          textStyle: {
            color: "#848484",
            fontSize: "16px",
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: subjectLogin,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart4.setOption(option4);
      window.addEventListener("resize", function () {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
        myChart4.resize();
      });
    }
    reqData()
  },[])

  return (
    <div className="echart">
      <div className="echart1">
        <AdminTopBar tag="登录相关" timeShow="false" />
        <div className="echart-content1">
          <div className="echart-content1-line">曲线图</div>
          <div className="echart-content1-bar">饼状图</div>
        </div>
      </div>
      <div className="echart2">
        <AdminTopBar tag="问题相关" timeShow="false" />
        <div className="echart-content2">
          <div className="echart-content2-line">曲线图</div>
          <div className="echart-content2-bar">饼状图</div>
        </div>
      </div>
    </div>
  );
}
