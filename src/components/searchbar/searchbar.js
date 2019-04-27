import { Icon, Input, AutoComplete, Button, Row, Col } from "antd";
import React, { Component } from "react";
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
  }

  async updateData(value) {
    const data = await API.get("getUser/" + value.toString());
    this.setState({ data: data.data });
  }

  render() {
    const { data } = this.state;
    const options =
      data != null
        ? data.map(opt => (
            <Option key={opt.id} value={opt.id}>
              <Row>
                <Col span={6} push={18}>
                  <Button
                    icon="plus"
                    style={{ width: "100%", marginTop: "16px" }}
                    // onClick={() => this.login(this.state.username, this.state.password, this.props.loginRequest)}
                  />
                </Col>
                <Col span={18} pull={6}>
                  <h4>{opt.name}</h4>
                  <p>{opt.id}</p>
                </Col>
              </Row>
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
