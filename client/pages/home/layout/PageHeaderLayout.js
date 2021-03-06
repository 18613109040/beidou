import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './PageHeaderLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={`page-header-layout ${wrapperClassName}`} >
    {top}
    <PageHeader key="pageheader" {...restProps} linkElement={Link} />
    {children ? <div className="content">{children}</div> : null}
  </div>
);
