import React from "react";
import AutosizeTextarea from "react-textarea-autosize";

import { toType } from "./../helpers/util";
import dispatcher from "./../helpers/dispatcher";
import parseInput from "./../helpers/parseInput";
import stringifyVariable from "./../helpers/stringifyVariable";
import CopyToClipboard from "./CopyToClipboard";
import FilterController from "./Filter/FilterController";

//data type components
import {
  JsonBoolean,
  JsonDate,
  JsonFloat,
  JsonFunction,
  JsonInteger,
  JsonNan,
  JsonNull,
  JsonRegexp,
  JsonString,
  JsonUndefined,
} from "./DataTypes/DataTypes";


//clibboard icon
import { Edit, CheckCircle, RemoveCircle as Remove } from "./icons";

//theme
import Theme from "./../themes/getStyle";

class VariableEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log("### VariableEditor props:", props);
    this.state = {
      editMode: false,
      editValue: "",
      renameKey: false,
      parsedInput: {
        type: false,
        value: null,
      },
      hasFilter: false,
    };
  }

  handleUpdateFilterStatus = (hasFilter) => {
    console.log("### [VariableEditor] hasFilter:", hasFilter);
    this.setState({ hasFilter });
  };

  render() {
    const {
      variable,
      src,
      singleIndent,
      type,
      theme,
      namespace,
      indentWidth,
      enableClipboard,
      onEdit,
      onDelete,
      onSelect,
      rjvId,
      onClickFilter,
      filterOptions,
      Tooltip
    } = this.props;

    console.log("### [VariableEditor] this.props:", this.props);
    const { editMode } = this.state;

    const fieldMeta = {
      variable,
      type,
      namespace,
    };

    return (
      <div
        {...Theme(theme, "objectKeyVal", {
          paddingLeft: indentWidth * singleIndent,
        })}
        class="variable-row"
        key={variable.name}
        style={{ fontWeight: this.state.hasFilter ? 800 : 500 }}
      >
        {type == "array" ? (
          <span
            {...Theme(theme, "array-key")}
            key={variable.name + "_" + namespace}
          >
            {variable.name}
            <div {...Theme(theme, "colon")}>:</div>
          </span>
        ) : (
          <span>
            <span
              {...Theme(theme, "object-name")}
              class="object-key"
              key={variable.name + "_" + namespace}
            >
              <span style={{ verticalAlign: "top" }}>"</span>
              <span style={{ display: "inline-block" }}>{variable.name}</span>
              <span style={{ verticalAlign: "top" }}>"</span>
            </span>
            <span {...Theme(theme, "colon")}>:</span>
          </span>
        )}
        <div
          class="variable-value"
          onClick={
            onSelect === false && onEdit === false
              ? null
              : (e) => {
                  let location = [...namespace];
                  if ((e.ctrlKey || e.metaKey) && onEdit !== false) {
                    this.prepopInput(variable);
                  } else if (onSelect !== false) {
                    location.shift();
                    onSelect({
                      ...variable,
                      namespace: location,
                    });
                  }
                }
          }
          {...Theme(theme, "variableValue", {
            cursor: onSelect === false ? "default" : "pointer",
          })}
        >
          {this.getValue(variable, editMode)}
        </div>
        {enableClipboard ? (
          <CopyToClipboard
            hidden={editMode}
            src={variable.value}
            clickCallback={enableClipboard}
            {...{ theme, namespace }}
          />
        ) : null}
        {onEdit !== false && editMode == false ? this.getEditIcon() : null}
        {onDelete !== false && editMode == false ? this.getRemoveIcon() : null}
        <FilterController
          fieldMeta={fieldMeta}
          onClickFilter={onClickFilter}
          filterOptions={filterOptions}
          Tooltip={Tooltip}
          onUpdateFilterStatus={this.handleUpdateFilterStatus}
        />
      </div>
    );
  }

  getEditIcon = () => {
    const { variable, theme } = this.props;

    return (
      <div className="click-to-edit" style={{ verticalAlign: "top" }}>
        <Edit
          className="click-to-edit-icon"
          {...Theme(theme, "editVarIcon")}
          onClick={() => {
            this.prepopInput(variable);
          }}
        />
      </div>
    );
  };

  prepopInput = (variable) => {
    if (this.props.onEdit !== false) {
      const stringifiedValue = stringifyVariable(variable.value);
      const detected = parseInput(stringifiedValue);
      this.setState({
        editMode: true,
        editValue: stringifiedValue,
        parsedInput: {
          type: detected.type,
          value: detected.value,
        },
      });
    }
  };

  getRemoveIcon = () => {
    const { variable, namespace, theme, rjvId } = this.props;

    return (
      <div className="click-to-remove" style={{ verticalAlign: "top" }}>
        <Remove
          class="click-to-remove-icon"
          {...Theme(theme, "removeVarIcon")}
          onClick={() => {
            dispatcher.dispatch({
              name: "VARIABLE_REMOVED",
              rjvId: rjvId,
              data: {
                name: variable.name,
                namespace: namespace,
                existing_value: variable.value,
                variable_removed: true,
              },
            });
          }}
        />
      </div>
    );
  };

  getValue = (variable, editMode) => {
    const type = editMode ? false : variable.type;
    const { props } = this;

    switch (type) {
      case false:
        return this.getEditInput();
      case "string":
        return (
          <JsonString variable={variable} value={variable.value} {...props} />
        );
      case "integer":
        return (
          <JsonInteger variable={variable} value={variable.value} {...props} />
        );
      case "float":
        return (
          <JsonFloat variable={variable} value={variable.value} {...props} />
        );
      case "boolean":
        return <JsonBoolean value={variable.value} {...props} />;
      case "function":
        return (
          <JsonFunction variable={variable} value={variable.value} {...props} />
        );
      case "null":
        return <JsonNull {...props} />;
      case "nan":
        return <JsonNan {...props} />;
      case "undefined":
        return <JsonUndefined {...props} />;
      case "date":
        return <JsonDate value={variable.value} {...props} />;
      case "regexp":
        return <JsonRegexp value={variable.value} {...props} />;
      default:
        // catch-all for types that weren't anticipated
        const displayValue = JSON.stringify(variable.value);
        let highLightHtmlStringValue = displayValue;
        if (props.onHighLight && props.kbnHighLight && variable) {
          highLightHtmlStringValue = props.onHighLight(
            props.kbnHighLight,
            variable.name,
            displayValue,
            displayValue,
            false
          );
        }
        return (
          <div className="object-value">
            {highLightHtmlStringValue ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: highLightHtmlStringValue.toString(),
                }}
              />
            ) : (
              displayValue
            )}
          </div>
        );
    }
  };

  getEditInput = () => {
    const { theme } = this.props;
    const { editValue } = this.state;

    return (
      <div>
        <AutosizeTextarea
          type="text"
          inputRef={(input) => input && input.focus()}
          value={editValue}
          class="variable-editor"
          onChange={(event) => {
            const value = event.target.value;
            const detected = parseInput(value);
            this.setState({
              editValue: value,
              parsedInput: {
                type: detected.type,
                value: detected.value,
              },
            });
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Escape": {
                this.setState({
                  editMode: false,
                  editValue: "",
                });
                break;
              }
              case "Enter": {
                if (e.ctrlKey || e.metaKey) {
                  this.submitEdit(true);
                }
                break;
              }
            }
            e.stopPropagation();
          }}
          placeholder="update this value"
          {...Theme(theme, "edit-input")}
        />
        <div {...Theme(theme, "edit-icon-container")}>
          <Remove
            class="edit-cancel"
            {...Theme(theme, "cancel-icon")}
            onClick={() => {
              this.setState({ editMode: false, editValue: "" });
            }}
          />
          <CheckCircle
            class="edit-check string-value"
            {...Theme(theme, "check-icon")}
            onClick={() => {
              this.submitEdit();
            }}
          />
          <div>{this.showDetected()}</div>
        </div>
      </div>
    );
  };

  submitEdit = (submit_detected) => {
    const { variable, namespace, rjvId } = this.props;
    const { editValue, parsedInput } = this.state;
    let new_value = editValue;
    if (submit_detected && parsedInput.type) {
      new_value = parsedInput.value;
    }
    this.setState({
      editMode: false,
    });
    dispatcher.dispatch({
      name: "VARIABLE_UPDATED",
      rjvId: rjvId,
      data: {
        name: variable.name,
        namespace: namespace,
        existing_value: variable.value,
        new_value: new_value,
        variable_removed: false,
      },
    });
  };

  showDetected = () => {
    const { theme, variable, namespace, rjvId } = this.props;
    const { type, value } = this.state.parsedInput;
    const detected = this.getDetectedInput();
    if (detected) {
      return (
        <div>
          <div {...Theme(theme, "detected-row")}>
            {detected}
            <CheckCircle
              class="edit-check detected"
              style={{
                verticalAlign: "top",
                paddingLeft: "3px",
                ...Theme(theme, "check-icon").style,
              }}
              onClick={() => {
                this.submitEdit(true);
              }}
            />
          </div>
        </div>
      );
    }
  };

  getDetectedInput = () => {
    const { parsedInput } = this.state;
    const { type, value } = parsedInput;
    const { props } = this;
    const { theme } = props;

    if (type !== false) {
      switch (type.toLowerCase()) {
        case "object":
          return (
            <span>
              <span
                style={{
                  ...Theme(theme, "brace").style,
                  cursor: "default",
                }}
              >
                {"{"}
              </span>
              <span
                style={{
                  ...Theme(theme, "ellipsis").style,
                  cursor: "default",
                }}
              >
                ...
              </span>
              <span
                style={{
                  ...Theme(theme, "brace").style,
                  cursor: "default",
                }}
              >
                {"}"}
              </span>
            </span>
          );
        case "array":
          return (
            <span>
              <span
                style={{
                  ...Theme(theme, "brace").style,
                  cursor: "default",
                }}
              >
                {"["}
              </span>
              <span
                style={{
                  ...Theme(theme, "ellipsis").style,
                  cursor: "default",
                }}
              >
                ...
              </span>
              <span
                style={{
                  ...Theme(theme, "brace").style,
                  cursor: "default",
                }}
              >
                {"]"}
              </span>
            </span>
          );
        case "string":
          return <JsonString value={value} {...props} />;
        case "integer":
          return <JsonInteger value={value} {...props} />;
        case "float":
          return <JsonFloat value={value} {...props} />;
        case "boolean":
          return <JsonBoolean value={value} {...props} />;
        case "function":
          return <JsonFunction value={value} {...props} />;
        case "null":
          return <JsonNull {...props} />;
        case "nan":
          return <JsonNan {...props} />;
        case "undefined":
          return <JsonUndefined {...props} />;
        case "date":
          return <JsonDate value={new Date(value)} {...props} />;
      }
    }
  };
}

//export component
export default VariableEditor;
