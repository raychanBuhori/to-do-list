import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu } from 'antd';
import { UnorderedListOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { _updateMenu } from 'store/modules/toDo/action';

const { Header } = Layout;

const LayoutHeader = props => {
  const disaptch = useDispatch();
  const toDo = useSelector(state => state.toDo);

  const _handleUpdateMenu = menu => {
    disaptch(_updateMenu(menu));
  }

  return (
    <Header>
      <div className='logo'>
        <img src='to-do-list.png' />
        <label>To Do List</label>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[toDo.menu]}
        items={[
          {
            key: 'all',
            icon: <UnorderedListOutlined />,
            onClick: () => _handleUpdateMenu('all'),
            label: "All",
          }, {
            key: 'onGoing',
            icon: <PlayCircleOutlined />,
            onClick: () => _handleUpdateMenu('onGoing'),
            label: "On Going"
          }, {
            key: 'done',
            icon: <CheckCircleOutlined />,
            onClick: () => _handleUpdateMenu('done'),
            label: 'Done'
          }
        ]}
      />
    </Header>
  )
}

export default LayoutHeader;

