import React from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import { Upload, Icon, Modal, message } from 'antd';
import './index.less';

class UploadImage extends React.Component {
    static propTypes = {
      multiple: PropTypes.bool, // 是否支持多
      size: PropTypes.number, // 图片大小
      single: PropTypes.bool, // 单选
    };

    static defaultProps = {
      multiple: false,
      size: 1024 * 1024 * 10,
      single: true,
    };

    constructor(props) {
      super(props);
      // const { columns } = props;
      this.state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        loading: false,
      };
    }


  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  beforeUpload=(file) => {
    const { size } = this.props;
    const isLt = file.size < size;
    if (!isLt) {
      message.error(`图片大小不能超过${size / 1024 / 1024}M`);
    }
    return isLt;
  }


  onChange = ({ file, fileList, event }) => {
    this.setState({
      fileList,
    });
    if (file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (file.status === 'done') {
      message.success(`${file.name}图片上传成功`);
      const { response } = file;
      const { url, uid } = response.data;
      const tempList = this.state.fileList;
      tempList.map((item) => {
        if (item.uid === uid) {
          item.linkUrl = url;
        }
        return item;
      });
      this.setState({
        loading: false,
        fileList: tempList,
      });
    } else if (file.status === 'error') {
      message.error(`${file.name} 图片上传失败`);
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { single, multiple } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} style={{ fontSize: 30 }} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          accept="image/*"
          action="/api/upload"
          listType="picture-card"
          className="image-uploader"
          fileList={fileList}
          multiple={multiple}
          data={file => ({
            name: 'file',
            uid: file.uid,
          })}
          onPreview={this.handlePreview}
          onChange={this.onChange}
          supportServerRender
          headers={
            { Authorization: `Bearer ${store.get('token')}` }
          }
          beforeUpload={this.beforeUpload}

        >
          {single && fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default UploadImage;

