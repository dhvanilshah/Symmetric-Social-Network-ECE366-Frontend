import { Icon, Input, AutoComplete, Button, Row, Col } from "antd";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Search from "antd/lib/transfer/search";
import API from "../../api/api";

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const filler = [
  {
    id: "something random",
    name: "Search For Users Here"
  }
];

// FULL USAGE DETAIL: https://ant.design/components/auto-complete/

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.updateData = this.updateData.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  async addFriend(id) {
    const data = await API.get("addFriend/" + id.toString());
  }

  async updateData(value) {
    if (value == "") {
      return;
    }
    const data = await API.get("getUser/" + value.toString());
    this.setState({ data: data.data.payload.value });
  }

  render() {
    const { data } = this.state;
    const options =
      data != null
        ? data.map(opt => (
            <Option key={opt.id} value={opt.id}>
              <NavLink to={"/profile/" + opt.username}>
                <Row>
                  <Col span={6} push={18}>
                    <Button
                      icon="plus"
                      style={{ width: "100%", marginTop: "16px" }}
                      onClick={() => this.addFriend(opt.id)}
                    />
                  </Col>
                  <Col span={18} pull={6}>
                    <h4>{opt.name}</h4>
                    <p>{opt.username}</p>
                  </Col>
                </Row>
              </NavLink>
            </Option>
          ))
        : filler.map(opt => (
            <Option key={opt.id} value={opt.id}>
              {opt.name}
            </Option>
          ));
    return (
      <div className="certain-category-search-wrapper" style={{ width: 250 }}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 250 }}
          size="large"
          style={{ width: "200px" }}
          dataSource={options}
          placeholder="Search for a User"
          optionLabelProp="value"
          onChange={value => this.updateData(value)}
        >
          <Input
            suffix={<Icon type="search" className="certain-category-icon" />}
          />
        </AutoComplete>
      </div>
    );
  }
}

export default Complete;
