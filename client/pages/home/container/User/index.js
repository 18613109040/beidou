import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tree, Card, Divider, Button, Table, Popconfirm } from 'antd';
import UserCreate from './create';
import { createUser } from '../../actions/user';
import './index.less';

class User extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        visible: true,
        eidt: false,
      };
    }

    componentDidMount() {

    }


    handleCancel=() => {
      const { form } = this.formRef.props;
      form.resetFields();
      this.setState({
        visible: false,
        eidt: false,
      });
    }

    handleCreate = () => {
      const { form } = this.formRef.props;
      //   const { eidt, eidtData } = this.state;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        createUser(values);
      });
    }

    showFrom=() => {
      this.setState({
        visible: true,
      });
    }

    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }

    eidtMenu = (data) => {
      const { form } = this.formRef.props;
      this.setState({
        visible: true,
        eidt: true,
      });
      form.setFieldsValue(data);
    }

    render() {
      const { visible, eidt } = this.state;
      return (
        <div className="user-manage" >
          <UserCreate
            wrappedComponentRef={this.saveFormRef}
            visible={visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            eidt={eidt}
          />
        </div>
      );
    }
}


function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(User);

