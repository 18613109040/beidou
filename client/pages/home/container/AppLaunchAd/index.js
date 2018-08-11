import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { getAppLaunchAdDetails } from '../../actions/app/appLaunchAd';
import './index.less';

const moment = require('moment');

const { Description } = DescriptionList;
class AppLaunchAdDetail extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        appLaunchAd: {
          lang: '',
          appVersion: '',
          jumpType: 0,
          link: '',
          internalJump: 0,
          fileType: 0,
          photo: '',
          video: '',
          duration: '',
          addedDate: new Date().getTime(),
          dismountedDate: new Date().getTime(),
          status: 0,
          createUser: {
            email: '',
          },
          updataUser: {
            email: '',
          },
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
      };
    }

    componentDidMount() {
      const { id } = this.props.match.params;
      if (id) {
        getAppLaunchAdDetails(id).then((res) => {
          console.dir(res.data);
          console.dir(moment(res.data.createdAt).format('YYYY-MM-DD hh:mm:ss'));
          this.setState({
            appLaunchAd: res.data,
          });
        });
      }
    }

    render() {
      const { appLaunchAd } = this.state;
      return (
        <div className="user-detail" >
          <Card bordered={false} title="开屏广告详情" >
            <DescriptionList size="large" >
              <Description term="语言" >{appLaunchAd.lang}</Description>
              <Description term="App版本号" >{appLaunchAd.appVersion}</Description>
              <Description term="跳转类型" >{appLaunchAd.jumpType === 0 ? '关闭' : appLaunchAd.jumpType === 1 ? '网页链接' : 'APP内部跳转'}</Description>
              {
                appLaunchAd.jumpType === 1 ? <Description term="跳转链接" >{appLaunchAd.link}</Description> : ''
              }
              {
                appLaunchAd.jumpType === 2 ? <Description term="内部跳转页" >{appLaunchAd.internalJump === 0 ? '订单列表' : '会员中心'}</Description> : ''
              }
              <Description term="开屏名称" >{appLaunchAd.name}</Description>
              <Description term="展示时间(秒)" >{appLaunchAd.duration} S</Description>
              <Description term="上架使时间" >{moment(appLaunchAd.addedDate).format('YYYY-MM-DD hh:mm:ss')}</Description>
              <Description term="下架时间" >{moment(appLaunchAd.dismountedDate).format('YYYY-MM-DD hh:mm:ss')}</Description>
              <Description term="状态" >{appLaunchAd.status === 0 ? '显示' : '隐藏'}</Description>
              <Description term="创建人" >{appLaunchAd.createUser.email}</Description>
              <Description term="最后更新人" >{appLaunchAd.updataUser.email}</Description>
              <Description term="创建时间" >{moment(appLaunchAd.createdAt).format('YYYY-MM-DD hh:mm:ss')}</Description>
              <Description term="最后更新时间" >{moment(appLaunchAd.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</Description>
              <Description term="类型" >{appLaunchAd.fileType === 0 ? '图片' : '视频'}</Description>
              {
                appLaunchAd.fileType === 0 ? <Description term="开机图片" >
                  <img src={appLaunchAd.photo} style={{ width: '100px' }} />
                </Description> : <Description term="开机视频" >
                  <video alt="example" style={{ width: '100px' }} controls="controls" src={appLaunchAd.video} className="video" />
                </Description>
              }
            </DescriptionList>
          </Card>
        </div>
      );
    }
}


export default AppLaunchAdDetail;

