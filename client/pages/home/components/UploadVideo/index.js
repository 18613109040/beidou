import React from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import { Upload, Icon, Modal, message } from 'antd';
import './index.less';

class UploadVideo extends React.Component {
    static propTypes = {
      size: PropTypes.number, // 图片大小

    };

    static defaultProps = {
      size: 1024 * 1024 * 100,

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
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div className="clearfix">
        <Upload
          accept="video/*"
          action="/api/upload"
          listType="picture-card"
          className="image-uploader"
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
          {imageUrl ? <video src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <video alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default UploadVideo;

