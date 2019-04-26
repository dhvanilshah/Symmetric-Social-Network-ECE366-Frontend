import { Icon, Input, AutoComplete, Button } from "antd";
import React, { Component } from "react";
import Search from "antd/lib/transfer/search";
import API from "../../api/api";

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const filler = [
  {
    id: "null",
    name: "Search For Songs Here"
  }
];

// FULL USAGE DETAIL: https://ant.design/components/auto-complete/

class SongSearch extends Component {
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
              <div>
                {opt.name}
                <Button stlye={{ float: "right" }}>
                  <Icon type="plus" />
                </Button>
              </div>
            </Option>
          ))
        : filler.map(opt => (
            <Option key={opt.id} value={opt.id}>
              <div>{opt.name}</div>
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
          style={{ width: "290px" }}
          dataSource={options}
          placeholder="Search for a Song"
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

export default SongSearch;
