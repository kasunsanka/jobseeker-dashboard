import React from "react";
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

const { Sider } = Layout;

export const SideNav = ({navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true }) => {
  const props = { sideNavTheme, routeInfo , hideGroupTitle, localization}
  return (
    <Sider 
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK? 'side-nav-dark' : ''}`} 
      width={SIDE_NAV_WIDTH} 
      collapsed={navCollapsed}
    >




      <Scrollbars autoHide>
      <div key='prof' className={`d-flex align-items-center justify-content-between`} style={{ backgroundColor: "white", textAlign: "center" }}>
  <p style={{marginLeft:"30px",marginTop:"12px",fontSize:"10px"}}>DEVICE MANAGER CONTROL PANEL</p>
</div>
        <MenuContent 
          type={NAV_TYPE_SIDE} 
          {...props}
        />
      </Scrollbars>
    </Sider>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme } =  theme;
  return { navCollapsed, sideNavTheme }
};

export default connect(mapStateToProps)(SideNav);
