import React from "react";
import DataTypeLabel from "./DataTypeLabel";

//theme
import Theme from "./../../themes/getStyle";

export default class extends React.PureComponent {
  render() {
    const type_name = "int";
    const { props } = this;
    let highLightHtmlStringValue = props.value; // default

    if (props.onHighLight && props.kbnHighLight && props.variable) {
      highLightHtmlStringValue = props.onHighLight(
        props.kbnHighLight,
        props.variable.name,
        props.variable.value,
        props.variable.value,
        false
      );
    }

    return (
      <div {...Theme(props.theme, "integer")}>
        <DataTypeLabel type_name={type_name} {...props} />
        {highLightHtmlStringValue ? (
          <span
            dangerouslySetInnerHTML={{
              __html: highLightHtmlStringValue.toString(),
            }}
          />
        ) : (
          this.props.value
        )}
      </div>
    );
  }
}
