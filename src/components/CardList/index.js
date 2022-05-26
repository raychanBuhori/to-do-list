import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Card, Col, Row } from 'antd';

import { _setDetail } from 'store/modules/toDo/action';
import { createDate } from 'utils/momentDate';

import CardDetail from './CardDetail';
import AddTask from 'components/AddTask';

class CardList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailVisible: false,
      dataList: []
    }

    this._toggleDetailVisible = this._toggleDetailVisible.bind(this);
    this._handleOpenDetail = this._handleOpenDetail.bind(this);
    this.renderCardList = this.renderCardList.bind(this);
  }

  _toggleDetailVisible = () => {
    this.setState({
      detailVisible: !this.state.detailVisible
    })
  }

  _handleOpenDetail = detail => {
    this.props._setDetail(detail);
    this.setState({
      detailVisible: true
    })
  }

  renderCardList = () => {
    const { list, menu } = this.props;
    let customedList = list;
    if (menu === 'all') {
      customedList = list.sort((a, b) => a.status - b.status);
    }
    if (menu === 'onGoing') {
      customedList = list.sort((a, b) => a.createDate - b.createDate);
    }
    if (menu === 'done') {
      customedList = list.sort((a, b) => b.createDate - a.createDate);
    }

    return customedList.map(el => {
      switch (menu) {
        case 'all':
          return (
            <Col
              key={el.id}
              span={8}
              style={{
                marginTop: '1rem'
              }}
              onClick={() => this._handleOpenDetail(el)}
            >
              <Badge.Ribbon
                text={el.status == 0 ? 'On Going' : 'Done'}
                color={el.status == 0 ? 'blue' : 'green'}
              >
                <Card
                  title={el.title}
                >
                  <div>
                    <p>{el.description}</p>
                    <label>Created: {createDate(el.createdAt)}</label>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          )

        case 'onGoing':
          if (el.status == 0) {
            return (
              <Col
                key={el.id}
                span={8}
                style={{
                  marginTop: '1rem'
                }}
                onClick={() => this._handleOpenDetail(el)}
              >
                <Badge.Ribbon
                  text='On Going'
                  color='blue'
                >
                  <Card title={el.title}>
                    <div>
                      <p>{el.description}</p>
                      <label>Created: {createDate(el.createdAt)}</label>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Col>
            )
          }
          break;

        case 'done':
          if (el.status == 1) {
            return (
              <Col
                key={el.id}
                span={8}
                style={{
                  marginTop: '1rem'
                }}
                onClick={() => this._handleOpenDetail(el)}
              >
                <Badge.Ribbon
                  text='Done'
                  color='green'
                >
                  <Card title={el.title}>
                    <div>
                      <p>{el.description}</p>
                      <label>Created: {createDate(el.createdAt)}</label>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Col>
            )
          }
          break;
        default:
          return <></>
      }
    })
  }

  render() {
    const { detail } = this.props;

    return (
      <div className="site-card-wrapper">
        <AddTask />
        <Row gutter={16}>
          {this.renderCardList()}
        </Row>
        <CardDetail
          detailVisible={this.state.detailVisible}
          detail={detail}
          toggleDetailVisible={this._toggleDetailVisible}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  detail: state.toDo.detail
})

export default connect(mapStateToProps, { _setDetail })(CardList);

CardList.propTypes = {
  list: PropTypes.array.isRequired,
  menu: PropTypes.string.isRequired
}