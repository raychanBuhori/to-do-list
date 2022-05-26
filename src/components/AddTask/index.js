import React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  Form,
  Input,
  Switch
} from 'antd';

import { _updateList } from 'store/modules/toDo/action';
import { addDate } from 'utils/momentDate';

class AddTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addTaskVisible: false,
      taskData: {
        id: 0,
        title: '',
        description: '',
        status: 0,
        createAt: addDate(new Date())
      }
    }

    this._handleSwicthChange = this._handleSwicthChange.bind(this);
    this._toggleAddTaskVisible = this._toggleAddTaskVisible.bind(this);
    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleToAdd = this._handleToAdd.bind(this);
    this._handleToCancel = this._handleToCancel(this);
    this._handleUpdateList = this._handleUpdateList.bind(this);
  }

  _toggleAddTaskVisible = () => {
    this.setState({
      addTaskVisible: !this.state.addTaskVisible
    })
  }

  _handleTaskChange = e => {
    const { id, value } = e.target;
    this.setState({
      taskData: {
        ...this.state.taskData,
        [id]: value
      }
    });
  }

  _handleSwicthChange = checked => {
    this.setState({
      taskData: {
        ...this.state.taskData,
        status: checked ? 1 : 0
      }
    });
  }

  _handleToAdd = () => new Promise((resolve, reject) => {
    if (!this.props.list) return reject(this.props.list);

    let taskList = this.props.list;
    let task = this.state.taskData;

    let highestId = 0;
    for (const i in taskList) {
      if (taskList[i].id > highestId) {
        highestId = taskList[i].id
      }
    }
    task.id = highestId + 1;
    task.status = task.status ? task.status : 0;
    taskList.push(task);

    return resolve(taskList);
  })

  _handleUpdateList = () => {
    this._handleToAdd()
      .then(res => {
        this.props._updateList(res);
        window.location.reload();
      });
  }

  _handleToCancel = () => {
    this._toggleAddTaskVisible();
  }

  render() {
    const { taskData, addTaskVisible } = this.state;

    return (
      <>
        <Button
          type='primary'
          onClick={this._toggleAddTaskVisible}
        >
          Add Task
        </Button>
        <Modal
          visible={addTaskVisible}
          onCancel={this._toggleAddTaskVisible}
          title='Edit Task'
          footer={[
            <Button
              key="cancel"
              onClick={this._handleToCancel}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this._handleUpdateList}
            >
              Add
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
                value={taskData.title}
                onChange={this._handleTaskChange}
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                id='description'
                value={taskData.description}
                onChange={this._handleTaskChange}
              />
            </Form.Item>
            <Form.Item label="Status" valuePropName="checked">
              <Switch
                id='status'
                checkedChildren="Done"
                defaultChecked={taskData.status}
                onChange={this._handleSwicthChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
};

const mapStateToProps = state => ({
  list: state.toDo.list
})

export default connect(mapStateToProps, {
  _updateList
})(AddTask);

