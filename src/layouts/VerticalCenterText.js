import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class VerticalCenterText extends Component {
  render() {
    let aaa = this.props.children;
    let sss = this.props.titleText;

    let title;
    let titleText = this.props.titleText;
    let divHeightValue = this.props.divHeight;
    let pyValue = this.props.py != null ? this.props.py : 0;
    let pxValue = this.props.px != null ? this.props.px : 0;

    let divPadding = pyValue + "vh " + pxValue + "vh";
    let divHeight = divHeightValue + "vh";

    console.log(divPadding);
    console.log(divHeight);
    let divCss = {
      height: divHeight,
      padding: divPadding,
      textAlign: "center",
      verticalAlign: "middle",
    };

    console.log(divCss);

    switch (this.props.titleStyle) {
      case "h1":
        title = <h1>{titleText}</h1>;
        break;
      case "h2":
        title = <h2>{titleText}</h2>;
        break;
      case "h3":
        title = <h3>{titleText}</h3>;
        break;
      case "h4":
        title = <h4>{titleText}</h4>;
        break;
      case "h5":
        title = <h5>{titleText}</h5>;
        break;
      case "h6":
        title = <h6>{titleText}</h6>;
        break;
      default:
        title = <h3>{titleText}</h3>;
    }

    return (
      <div style={divCss}>
        {/* {title} */}
        {title}
        {aaa}
      </div>
    );
  }
}

export default VerticalCenterText;
