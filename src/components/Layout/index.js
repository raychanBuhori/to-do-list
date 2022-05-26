import React from 'react';
import { Layout } from 'antd';

import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

class ToDoLayout extends React.Component {
  render() {
    return (
      <Layout className='layout'>
        <Header />
        <Content>
          <div className="site-layout-content">
            {this.props.children}
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}

export default ToDoLayout;