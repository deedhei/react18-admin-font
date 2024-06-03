import React from "react";
import {
  WechatOutlined,
  QqOutlined,
  WeiboOutlined,
  DingdingOutlined,
} from "@ant-design/icons";
import { Row, Col, Divider } from "antd";
import "@/style/view-style/index.scss";
import LineChart from "./line";
const HomeView = () => {
  return (
    <div className="home">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} xl={6}>
          <div className="baseStyle homeFirst">
            <WechatOutlined className="icon-style" />
            <div className="homeContent">
              <span>999</span>
              <div>微信</div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <div className="baseStyle homeSecond">
            <QqOutlined className="icon-style" />
            <div className="homeContent">
              <span>999</span>
              <div>QQ</div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <div className="baseStyle homeThree">
            <DingdingOutlined className="icon-style" />
            <div className="homeContent">
              <span>999</span>
              <div>钉钉</div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <div className="baseStyle homeFour">
            <WeiboOutlined className="icon-style" />
            <div className="homeContent">
              <span>999</span>
              <div>微博</div>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[, 24]} style={{ marginTop: "20px" }}>
        <Col>
          <div className="baseChartStyle">
            <div className="baseContent">
              <div>图形全屏展示</div>
              <Divider />
              <LineChart></LineChart>
            </div>
          </div>
        </Col>
        <Col>
          <div className="baseChartStyle">
            <div className="baseContent">
              <div>图形全屏展示</div>
              <Divider />
              <LineChart></LineChart>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeView;
