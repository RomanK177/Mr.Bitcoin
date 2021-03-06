import React, { Component } from "react";

export class ContactFilter extends Component {
  state = {
    filterBy: "",
  };

  onChangeHandler = (ev) => {
    // const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ filterBy: value }, () => {
      // console.log(this.state);
      this.props.onSetFilter({ ...this.state });
    });
  };

  render() {
    const { filterBy } = this.state;
    return (
      <div>
        <form className="contact-filter">
          {/* <label htmlFor="">Search</label> */}
          <input
            type="text"
            value={filterBy}
            onChange={this.onChangeHandler}
            placeholder="Search"
          />
        </form>
      </div>
    );
  }
}
