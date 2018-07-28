import React, { Component, Fragment } from 'react';
import { Table, Alert, Divider, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tableList, tableDelete } from '../../actions/baseTable';
import './index.less';

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
      footer: false,
      showHeader: true,
      size: 'default',
      align: 'center',
      operating: null,
    };

    constructor(props) {
      super(props);
      // const { columns } = props;
      this.state = {
        loading: false,
        pagination: { pageSize: 10, currentPage: 1 },
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
      const { pageSize, current } = pagination;
      this.props.dispatch(tableList(`/api/${path}`,
        {
          pageSize,
          currentPage: current,
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

    render() {
      console.dir(this.props.tableList);

      const { loading } = this.state;
      const { bordered, footer, showPagination, showHeader, size, align, operating } = this.props;
      const { count, list, pageSize, columns } = this.props.tableList;
      columns.push({
        title: '操作',
        dataIndex: 'operating',
        key: 'operating',
        render: (text, record) => (<span>
          <a onClick={() => this.eidtMenu(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除?" okText="确定" cancelText="取消" onConfirm={() => this.delete(record._id)}>
            <a >删除</a>
          </Popconfirm>
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
      console.dir(columns);
      return (
        <div className="base-table">
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
