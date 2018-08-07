import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal, message } from 'antd';

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

  // onSuccess = (response, file) => {
  //   console.dir(response);
  //   if (response.code == 0) {

  //   }
  // }

  onChange = ({ file, fileList, event }) => {
    console.dir(file);
    console.dir(fileList);
    if (file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
      this.setState({
        fileList,
        loading: false,
      });
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { single, multiple } = this.props;
    // const uploadButton = (
    //   <div>
    //     <Icon type="plus" />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api/upload"
          listType="picture-card"
          fileList={fileList}
          multiple={multiple}
          onPreview={this.handlePreview}
          onChange={this.onChange}
          supportServerRender
          beforeUpload={this.beforeUpload}
          onSuccess={this.onSuccess}
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

