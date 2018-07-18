
import React from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import PropTypes from 'prop-types';
import request from '../../../../utils/request';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
function BaseList(WrappedComponent) {
  // 创建一个中间组件，该中间组件会在添加了逻辑之后返回
  return class Asss extends React.Component {
    state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    }

    componentDidMount() {
      this.getData((res) => {
        this.setState({
          loading: false,
          data: res.results,
        });
      });
    }

      getData = (callback) => {
        request(fakeDataUrl, {
          type: 'json',
          method: 'GET',
          contentType: 'application/json',
        }).then((res) => {
          callback(res);
        });
      }

      onLoadMore = () => {
        this.setState({
          loadingMore: true,
        });
        this.getData((res) => {
          const data = this.state.data.concat(res.results);
          this.setState({
            data,
            loadingMore: false,
          }, () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          });
        });
      }

      render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
          <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
            {loadingMore && <Spin />}
            {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
          </div>
        ) : null;

        return (
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item actions={<WrappedComponent {...this.props} />}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>content</div>
              </List.Item>
            )}
          />
        );
      }
  };
}

export default BaseList;
