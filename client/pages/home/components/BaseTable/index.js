import React, { Component, Fragment } from 'react';
import { Table, Alert, Divider, Popconfirm, Button, Form, Row, Col, Select, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authOperation } from 'client/utils/utils';
import { tableList, tableDelete } from '../../actions/baseTable';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
class BaseTable extends Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    static propTypes = {
      bordered: PropTypes.bool, // 是否展示外边框和列边框
      showPagination: PropTypes.bool, // 是否显示分页
      footer: PropTypes.func, // 表格尾部
      showHeader: PropTypes.bool, // 是否显示表头
      size: PropTypes.string, // 正常或迷你类型，default or small
      align: PropTypes.string, // 设置列内容的对齐方式 'left' | 'right' | 'center'
      operating: PropTypes.object, // 操作栏
    };

    static defaultProps = {
      bordered: true,
      showPagination: true,
      footer: () => {},
      showHeader: true,
      size: 'default',
      align: 'center',
      operating: {},
    };

    constructor(props) {
      super(props);
      // const { columns } = props;
      this.state = {
        loading: false,
        pagination: {
          pageSize: 10,
          currentPage: 1,
        },
      };
    }

    componentWillMount() {

    }

    componentDidMount() {
      const { pagination } = this.state;
      this.getData(pagination);
    }

    componentWillReceiveProps() {

    }

    getData(pagination) {
      const { pathname } = this.context.router.history.location;
      const path = pathname.split('/').pop();
      const { pageSize, currentPage } = pagination;
      this.props.dispatch(tableList(`/api/${path}`,
        {
          pageSize,
          currentPage,
          isPaging: true,
        }));
    }

    handleTableChange = (pagination, filters, sorter) => {
      this.setState({
        pagination,
      });
      this.getData(pagination);

      // const { onChange } = this.props;
      // onChange(pagination, filters, sorter);
    };

    delete(id) {
      const { pathname } = this.context.router.history.location;
      const path = pathname.split('/').pop();
      tableDelete(`/api/${path}/${id}`, {}, (res) => {
        const { pagination } = this.state;
        this.getData(pagination);
      });
    }

    search(record) {
      const { pathname } = this.context.router.history.location;
      this.context.router.history.push(`${pathname}/${record._id}`);
    }

    eidt(record) {
      const { pathname } = this.context.router.history.location;
      this.context.router.history.push(`${pathname}/create/${record._id}`);
    }

    create() {
      const { pathname } = this.context.router.history.location;
      this.context.router.history.push(`${pathname}/create`);
    }

    renderSimpleForm() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      const { fiter } = this.props.tableList;
      return (
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            {
              fiter.map(item => (<Col md={8} sm={24} key={item.key}>
                <FormItem label={item.name}>
                  {getFieldDecorator(item.key)(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      {item.value.map(it => <Option value={item} key={item}>{it}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </Col>))
            }
            <Col md={8} sm={24}>
              <span className="submitButtons">
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                </a>
              </span>
            </Col>
          </Row>
        </Form>
      );
    }

    renderAdvancedForm() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="规则编号">
                {getFieldDecorator('no')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="使用状态">
                {getFieldDecorator('status')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">关闭</Option>
                    <Option value="1">运行中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="调用次数">
                {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="更新日期">
                {getFieldDecorator('date')(
                  <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="使用状态">
                {getFieldDecorator('status3')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">关闭</Option>
                    <Option value="1">运行中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="使用状态">
                {getFieldDecorator('status4')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">关闭</Option>
                    <Option value="1">运行中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </div>
        </Form>
      );
    }

    renderForm() {
      const { expandForm } = this.state;
      return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    render() {
      console.dir(this.props.tableList);
      const { loading } = this.state;
      const { bordered, footer, showPagination, showHeader, size, align, operating } = this.props;
      const { count, list, pageSize, columns, fiter, auth } = this.props.tableList;
      const option = authOperation(auth);
      columns.push({
        title: '操作',
        // dataIndex: 'operating',
        // key: 'operating',
        render: (text, record) => (<span>
          {option.updata ?
            <span>
              <a onClick={() => this.eidt(record)}>编辑</a>
              <Divider type="vertical" />
            </span> : ''
          }
          {
            option.read ?
              <span>
                <a onClick={() => this.eidt(record)}>查看</a>
                <Divider type="vertical" />
              </span> : ''

          }
          {
            option.delete ?
              <Popconfirm title="确定删除?" okText="确定" cancelText="取消" onConfirm={() => this.delete(record._id)}>
                <a >删除</a>
              </Popconfirm> : ''
          }

        </span>),
      });
      columns.map((item) => {
        item.align = align;
        return item;
      });
      const paginationProps = {
        showSizeChanger: true,
        total: count,
        pageSize,
        hideOnSinglePage: true,

      };
      return (
        <div className="base-table">
          {option.add ?
            <div className="tab-add">
              <Button icon="plus" type="primary" onClick={() => this.create()}>
                新建
              </Button>
            </div> : ''}
          <Table
            bordered={bordered}
            loading={loading}
            rowKey="_id"
            footer={footer}
            showHeader={showHeader}
            size={size}
            dataSource={list}
            columns={columns}
            // pagination={paginationProps}
            pagination={showPagination ? paginationProps : false}
            onChange={this.handleTableChange}
            // pagination={showPagination ? paginationProps : false}
          />
        </div>
      );
    }
}

// export default BaseTable;

function mapStateToProps(state) {
  return {
    tableList: state.tableList,
  };
}
export default connect(mapStateToProps)(BaseTable);
