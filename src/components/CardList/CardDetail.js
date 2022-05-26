import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Button,
  Form,
  Input,
  Switch
} from 'antd';

import { _updateList } from 'store/modules/toDo/action';

const CardDetail = props => {
  const { detailVisible, detail, toggleDetailVisible } = props;
  const dispatch = useDispatch();
  const toDo = useSelector(state => state.toDo);
  const [taskDetail, setTaskDetail] = useState({});

  useEffect(() => {
    if (detail) {
      setTaskDetail({ ...detail });
    }
  }, [detail]);

  const _handleTaskChange = e => {
    const { id, value } = e.target;
    setTaskDetail(taskDetail => ({
      ...taskDetail,
      [id]: value
    }));
  }

  const _handleSwicthChange = checked => {
    setTaskDetail(taskDetail => ({
      ...taskDetail,
      status: checked ? 1 : 0
    }));
  }

  const _handleToUpdate = () => {
    const taskList = toDo.list;
    for (const i in taskList) {
      if (taskList[i].id === taskDetail.id) {
        taskList[i] = {
          ...taskDetail
        }
      }
    }
    dispatch(_updateList(taskList));
    toggleDetailVisible();
  }

  const _handleToDelete = () => {
    let taskList = toDo.list;
    taskList = taskList.filter(el => el.id !== taskDetail.id);
    dispatch(_updateList(taskList));
    toggleDetailVisible();
  }


  return (
    <>
      <Modal
        visible={detailVisible}
        onCancel={toggleDetailVisible}
        title='Edit Task'
        footer={[
          <Button
            key="back"
            danger
            onClick={_handleToDelete}
          >
            Delete
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={_handleToUpdate}
          >
            Done
          </Button>,
        ]}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          size='default'
        >
          <Form.Item label="Title">
            <Input
              id='title'
              value={taskDetail.title}
              onChange={_handleTaskChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              id='description'
              value={taskDetail.description}
              onChange={_handleTaskChange}
            />
          </Form.Item>
          <Form.Item label="Status" valuePropName="checked">
            <Switch
              id='status'
              checkedChildren="Done"
              defaultChecked={taskDetail.status}
              checked={taskDetail.status}
              onChange={_handleSwicthChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CardDetail;

CardDetail.propTypes = {
  detailVisible: PropTypes.bool.isRequired,
  toggleDetailVisible: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired
}

