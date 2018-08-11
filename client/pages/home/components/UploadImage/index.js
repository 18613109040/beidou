import React from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import { Upload, Icon, Modal, message } from 'antd';
import './index.less';

class UploadImage extends React.Component {
    static propTypes = {
      size: PropTypes.number, // 图片大小
      dirPath: PropTypes.string, // 上传图片目录
      onChange: PropTypes.func,
      width: PropTypes.number, // 图片宽度
      height: PropTypes.number, // 图片高度
      value: PropTypes.string,
    };

    static defaultProps = {
      size: 1024 * 1024 * 10,
      dirPath: '',
      width: 100,
      height: 100,
      onChange: () => {},
    };

    constructor(props) {
      super(props);
      // const { columns } = props;
      this.state = {
        previewVisible: false,
        loading: false,
      };
    }


  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = () => {
    this.setState({
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

  deleteImage=() => {
    const { onChange } = this.props;
    onChange('');
  }

  handleChange = ({ file }) => {
    const { onChange } = this.props;
    if (file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (file.status === 'done') {
      message.success(`${file.name}图片上传成功`);
      const { response } = file;
      if (response.code === 0) {
        this.setState({
          loading: false,
        });
        onChange(response.data.url);
      }
    } else if (file.status === 'error') {
      message.error(`${file.name} 图片上传失败`);
      this.setState({
        loading: false,
      });
      onChange('');
    }
  }

  render() {
    const { previewVisible } = this.state;
    const { dirPath, value, width, height } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} style={{ fontSize: 30 }} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="upload-image">
        {
          value ? <div className="image-preview" style={{ width: `${width}px`, height: `${height}px` }}>
            <img style={{ width: '100%' }} src={value} className="image" />
            <span className="item-actions">
              <Icon type="eye-o" className="preview" onClick={this.handlePreview} />
              <Icon type="delete" className="delete" onClick={this.deleteImage} />
            </span>
          </div> :
          <Upload
            accept="image/*"
            action="/api/upload"
            listType="picture-card"
            className="image-uploader"
            showUploadList={false}
            data={file => ({
              name: 'image',
              uid: file.uid,
              dirPath,
            })}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            supportServerRender
            headers={
             { Authorization: `Bearer ${store.get('token')}` }
             }
            beforeUpload={this.beforeUpload}
          >
            {uploadButton }
          </Upload>
        }
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={value} />
        </Modal>
      </div>
    );
  }
}
export default UploadImage;

