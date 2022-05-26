import React from 'react';
import { connect } from 'react-redux';

import { _getInitialToDoList } from 'store/modules/toDo/action';

import ToDoLayout from 'components/Layout';
import CardList from 'components/CardList';

class ToDo extends React.Component {
  componentDidMount() {
    const { list } = this.props;
    if (list.length === 0) {
      this.props._getInitialToDoList();
    }
  }

  render() {
    return (
      <ToDoLayout>
        <CardList
          list={this.props.list}
          menu={this.props.menu}
        />
      </ToDoLayout>
    )
  }
}

const mapStateToProps = state => ({
  list: state.toDo.list,
  menu: state.toDo.menu
})

export default connect(mapStateToProps, {
  _getInitialToDoList
})(ToDo);