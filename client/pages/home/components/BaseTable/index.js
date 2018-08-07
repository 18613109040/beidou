import React, { Component } from 'react';
import { Table, Divider, Popconfirm, Button, Form, Row, Col, Select, Icon } from 'antd';
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
      customOperta: PropTypes.object, // 操作栏
      customColumns: PropTypes.array, //
    };

    static defaultProps = {
      bordered: true,
      showPagination: true,
      footer: () => {},
      showHeader: true,
      size: 'default',
      align: 'center',
      customOperta: null,
      customColumns: [],
    };

    constructor(props) {
      super(props);
      // const { columns } = props;
      this.state = {
        loading: false,
        pagination: {
          pageSize: 10,
          currentPage: 1,
          search: JSON.stringify({}),
        },
        expandForm: false,
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
      const { pageSize, currentPage, search } = pagination;
      const { showPagination } = this.props;
      this.props.dispatch(tableList(`/api/${path}`,
        {
          pageSize,
          currentPage,
          isPaging: !!showPagination,
          search,
        }));
    }

    handleTableChange = (pagination, filters, sorter) => {
      this.setState({
        pagination: Object.assign({}, this.state.pagination, pagination),
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

    toggleForm=() => {
      this.setState({
        expandForm: !this.state.expandForm,
      });
    }

    // 去除空对象
    filterEmpty(obj) {
      const newObj = {};
      Object.keys(obj).map((item) => {
        if (obj[item]) {
          newObj[item] = obj[item];
        }
        return item;
      });
      return newObj;
    }

    handleSearch=(e) => {
      e.preventDefault();
      const { form } = this.props;
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        this.getData(Object.assign({}, this.state.pagination, { search: JSON.stringify(this.filterEmpty(fieldsValue)) }));
        this.setState({
          pagination: Object.assign({}, this.state.pagination, { search: JSON.stringify(this.filterEmpty(fieldsValue)) }),
        });
      });
    }

    renderSimpleForm() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      let { fiter } = this.props.tableList;
      if (fiter.length > 2) {
        fiter = fiter.slice(0, 2);
      }
      return (
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex">
            {
              fiter.map(item => (<Col span={8} key={item.key}>
                <FormItem label={item.name}>
                  {getFieldDecorator(item.key)(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="" key="">全部</Option>
                      {item.value.map(it => <Option value={it} key={it}>{it}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </Col>))
            }
            <Col span={8}>
              <span className="submitButtons">
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                {
                  this.props.tableList.fiter.length > 2 ? <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                  </a> : ''
                }
              </span>
            </Col>
          </Row>
        </Form>
      );
    }

    renderAdvancedForm() {
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
                      <Option value="" key="">全部</Option>
                      {item.value.map(it => <Option value={it} key={it}>{it}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </Col>))
            }
          </Row>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
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
      const { loading } = this.state;
      const { bordered, footer, showPagination, showHeader, size, align, customColumns, customOperta } = this.props;
      const { count, list, pageSize, columns, fiter, auth } = this.props.tableList;
      const option = authOperation(auth);
      let columnsList = [];
      if (customColumns.length > 0) {
        columnsList = [...customColumns];
      } else {
        columnsList = [...columns];
      }
      if (customOperta) {
        columnsList.push(customOperta);
      } else {
        columnsList.push({
          title: '操作',
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
                  <a onClick={() => this.search(record)}>查看</a>
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
      }

      columnsList.map((item) => {
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
          {
            fiter.length > 0 ? <div className="tableListForm">{this.renderForm()}</div> : ''
          }

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
            columns={columnsList}
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
export default connect(mapStateToProps)(Form.create()(BaseTable));
