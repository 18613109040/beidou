import React from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import { Upload, Icon, message } from 'antd';
import './index.less';

class UploadVideo extends React.Component {
    static propTypes = {
      size: PropTypes.number, // 图片大小
      dirPath: PropTypes.string, // 上传视频目录
      onChange: PropTypes.func,
    };

    static defaultProps = {
      size: 1024 * 1024 * 100,
      dirPath: '',
      onChange: () => {},
    };

    constructor(props) {
      super(props);
      // const { columns } = props;
      this.state = {
        loading: false,
        // videoSrc: '',
      };
    }


  beforeUpload=(file) => {
    const { size } = this.props;
    const isLt = file.size < size;
    if (!isLt) {
      message.error(`视频大小不能超过${size / 1024 / 1024}M`);
    }
    return isLt;
  }


  handleChange = ({ file }) => {
    const { onChange } = this.props;
    if (file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (file.status === 'done') {
      message.success(`${file.name}视频上传成功`);
      const { response } = file;

      if (response.code === 0) {
        this.setState({
          loading: false,
        });
        onChange(response.data.url);
      }
    } else if (file.status === 'error') {
      message.error(`${file.name} 视频上传失败`);
      this.setState({
        loading: false,
      });
      onChange('');
    }
  }

  deleteVideo=() => {
    const { onChange } = this.props;
    // this.setState({
    //   videoSrc: '',
    // });
    onChange('');
  }

  render() {
    // console.dir(this.props);
    const { dirPath, value } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} style={{ fontSize: 30 }} />
        <div className="ant-upload-text">视频上传</div>
      </div>
    );
    return (
      <div className="upload-video">


        {
          value ? <div className="video-preview">
            <video alt="example" style={{ width: '100%' }} controls="controls" src={value} className="video" />
            <span className="item-actions">
              <Icon type="delete" className="delete" onClick={this.deleteVideo} />
            </span>
          </div> :
          <Upload
            accept="video/*"
            action="/api/upload"
            listType="picture-card"
            className="video-uploader"
            showUploadList={false}
            data={file => ({
              name: 'video',
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

      </div>
    );
  }
}
export default UploadVideo;

