
import React from 'react';
import { List, Avatar, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRoleList } from '../../actions/role';

import './index.less';

class RoleList extends React.Component {
    state = {
      loading: true,
    }

    componentDidMount() {
      this.getData();
    }

    getData=() => {
      this.setState({
        loading: true,
      });
      this.props.dispatch(getRoleList({
        pageSize: 10,
        currentPage: 1,
        isPaging: true,
      }, () => {
        this.setState({
          loading: false,
        });
      }));
    }

    create = () => {
      console.dir(this.props);
      this.props.history.push('/role/create');
    }
    // onLoadMore = () => {
    //     this.setState({
    //       loadingMore: true,
    //     });
    //     this.getData((res) => {
    //       const data = this.state.data.concat(res.results);
    //       this.setState({
    //         data,
    //         loadingMore: false,
    //       }, () => {
    //         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //         // In real scene, you can using public method of react-virtualized:
    //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //         window.dispatchEvent(new Event('resize'));
    //       });
    //     });
    //   }

    render() {
      const { loading } = this.state;
      const { roleList } = this.props;
      return (
        <div className="role-list">
          <Card bordered={false}>
            <div className="tableList">
              <div className="tableListOperator">
                <Button icon="plus" type="primary" onClick={() => this.create()}>
                新建
                </Button>
                {/* {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )} */}
              </div>
              <List
                key="1"
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                dataSource={roleList.list}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  showTotal: (total, range) => `${range[1]}/${total}`,
                  current: roleList.currentPage,
                  pageSize: roleList.pageSize,
                  total: roleList.count,
                }}
                renderItem={item => (
                  <List.Item actions={[<a>编辑</a>, <a>查看</a>]}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={item.des}
                    />
                    <div>{item.createdAt}</div>
                  </List.Item>
                )}
              />
            </div>
          </Card>

        </div>
      );
    }
}
function mapStateToProps(state) {
  return {
    roleList: state.roleList,
  };
}
export default connect(mapStateToProps)(RoleList);

