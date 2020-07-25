import React from "react";
import DataTypeLabel from "./DataTypeLabel";
import { toType } from "./../../helpers/util";

//theme
import Theme from "./../../themes/getStyle";

//attribute store for storing collapsed state
import AttributeStore from "./../../stores/ObjectAttributes";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: AttributeStore.get(
        props.rjvId,
        props.namespace,
        "collapsed",
        true
      ),
    };
  }

  toggleCollapsed = () => {
    this.setState(
      {
        collapsed: !this.state.collapsed,
      },
      () => {
        AttributeStore.set(
          this.props.rjvId,
          this.props.namespace,
          "collapsed",
          this.state.collapsed
        );
      }
    );
  };

  render() {
    const type_name = "string";
    const { collapsed } = this.state;
    const { props } = this;
    const { collapseStringsAfterLength, theme, type } = props;
    let { value } = props;
    let collapsible = toType(collapseStringsAfterLength) === "integer";
    let style = { style: { cursor: "default" } };
    let highLightHtmlStringValue = value; // default

    let fieldName = "";
    if (props.namespace.length > 1) {
      const names = props.namespace.slice(1);
      fieldName = names.join(".");
      if (!props.type) {
        fieldName = fieldName + "." + props.variable.name;
      }
    } else {
      fieldName = props.variable.name;
    }

    if (props.onHighLight && props.kbnHighLight && props.variable) {
      highLightHtmlStringValue = props.onHighLight(
        props.kbnHighLight,
        fieldName,
        props.variable.value,
        props.variable.value,
        false
      );
      // console.log("--------------------------------------");
      // console.log("#### [String] props:", props);
      // console.log("#### [String] variable:", props.variable);
      // console.log("#### [String] props.kbnHighLight:", props.kbnHighLight);
      // console.log("#### [String] variable.name:", props.variable.name);
      // console.log(
      //   "#### [String] highLightHtmlStringValue:",
      //   highLightHtmlStringValue
      // );
    }

    if (collapsible && value.length > collapseStringsAfterLength) {
      style.style.cursor = "pointer";
      if (this.state.collapsed) {
        value = (
          <span>
            {value.substring(0, collapseStringsAfterLength)}
            <span {...Theme(theme, "ellipsis")}> ...</span>
          </span>
        );
      }
    }

    return (
      <div {...Theme(theme, "string")}>
        <DataTypeLabel type_name={type_name} {...props} />
        <span className="string-value" {...style} onClick={this.toggleCollapsed}>
          {highLightHtmlStringValue ? (
            <span>
              "
              <span
                dangerouslySetInnerHTML={{
                  __html: highLightHtmlStringValue.toString(),
                }}
              />
              "
            </span>
          ) : (
            <span>"{value}"</span>
          )}
        </span>
      </div>
    );
  }
}
