import React, { Component } from "react";

class BreakLine extends Component {
  render() {
    let brTag;
    let num = this.props.num;

    console.log(num);
    var i;
    for (i = 0; i < num; i++) {
      brTag = (
        <div>
          {brTag} <br />
        </div>
      );
    }

    console.log(brTag);

    return <div>{brTag}</div>;
  }
}

export default BreakLine;
