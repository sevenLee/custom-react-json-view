import React from "react";
import classNames from "classnames";

const FilterInIcon = (props) => {
  const id = "filterIn";

  return (
    <div
      onClick={() => props.onClick(id)}
      className={classNames({
        "filter-icon-root": true,
        active: props.active,
      })}
      style={{
        display: "flex",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Group-26" transform="translate(-223.000000, -270.000000)">
            <g
              id="ic-selected-in"
              transform="translate(223.000000, 270.000000)"
            >
              <path
                d="M14.4271654,6.47470259 L14.6084,6.6481 C14.6084,6.6481 14.6094,6.6491 14.6094,6.6491 C16.7064,8.7511 16.7994,12.0941 14.8904,14.3061 L15.1404,14.5571 L15.2654,14.4321 C15.3634,14.3351 15.5234,14.3351 15.6214,14.4321 L18.9264,17.7371 C19.0244,17.8361 19.0244,17.9951 18.9264,18.0931 L18.0944,18.9241 C17.9964,19.0231 17.8374,19.0231 17.7384,18.9241 L14.4334,15.6201 C14.3354,15.5221 14.3354,15.3621 14.4334,15.2641 L14.5574,15.1401 L14.3064,14.8901 C12.0954,16.8021 8.7494,16.7091 6.6494,14.6101 C4.4504,12.4121 4.4504,8.8481 6.6484,6.6491 C8.78602162,4.51050541 12.2177499,4.45175888 14.4271654,6.47470259 Z M7.8014,7.7991 C6.2394,9.3621 6.2394,11.8951 7.8014,13.4581 C9.3634,15.0201 11.8964,15.0201 13.4584,13.4581 C15.0204,11.8951 15.0204,9.3621 13.4584,7.7991 C11.8954,6.2401 9.3654,6.2401 7.8014,7.7991 Z M10.6304,7.6296 C10.9894,7.6296 11.2804,7.9206 11.2804,8.2796 L11.2804,9.9806 L12.9804,9.9806 C13.3394,9.9806 13.6304,10.2716 13.6304,10.6296 C13.6304,10.9886 13.3394,11.2796 12.9804,11.2796 L11.2804,11.2796 L11.2804,12.9806 C11.2804,13.3386 10.9894,13.6296 10.6304,13.6296 C10.2714,13.6296 9.9804,13.3386 9.9804,12.9806 L9.9804,11.2786 L8.2804,11.2796 C7.9214,11.2796 7.6304,10.9886 7.6304,10.6296 C7.6304,10.2716 7.9214,9.9806 8.2804,9.9806 L9.9804,9.9796 L9.9804,8.2796 C9.9804,7.9206 10.2714,7.6296 10.6304,7.6296 Z"
                id="Combined-Shape"
                fill={props.active ? "#ffffff" : "#121419"}
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

const FilterOutIcon = (props) => {
  const id = "filterOut";

  return (
    <div
      onClick={() => props.onClick(id)}
      className={classNames({
        "filter-icon-root": true,
        active: props.active,
      })}
      style={{
        display: "flex",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Group-26" transform="translate(-249.000000, -270.000000)">
            <g
              id="ic-selected-out"
              transform="translate(249.000000, 270.000000)"
            >
              <path
                d="M14.4269443,6.47470259 L14.6081,6.6481 C14.6081,6.6481 14.6091,6.6491 14.6091,6.6491 C16.7061,8.7511 16.7991,12.0941 14.8901,14.3061 L15.1401,14.5571 L15.2651,14.4321 C15.3631,14.3351 15.5231,14.3351 15.6211,14.4321 L18.9261,17.7371 C19.0251,17.8361 19.0251,17.9951 18.9261,18.0931 L18.0951,18.9241 C17.9961,19.0231 17.8371,19.0231 17.7391,18.9241 L14.4341,15.6201 C14.3361,15.5221 14.3361,15.3621 14.4341,15.2641 L14.5571,15.1401 L14.3061,14.8901 C12.0951,16.8021 8.7491,16.7091 6.6491,14.6101 C4.4511,12.4121 4.4501,8.8481 6.6481,6.6491 C8.78669459,4.51050541 12.2184492,4.45175888 14.4269443,6.47470259 Z M7.8021,7.7991 C6.2391,9.3621 6.2391,11.8951 7.8021,13.4581 C9.3641,15.0201 11.8971,15.0201 13.4591,13.4581 C15.0211,11.8951 15.0211,9.3621 13.4591,7.7991 C11.8951,6.2401 9.3651,6.2401 7.8021,7.7991 Z M12.9801,9.9806 C13.3391,9.9806 13.6301,10.2716 13.6301,10.6296 C13.6301,10.9886 13.3391,11.2796 12.9801,11.2796 L8.2801,11.2796 C7.9211,11.2796 7.6301,10.9886 7.6301,10.6296 C7.6301,10.2716 7.9211,9.9806 8.2801,9.9806 L12.9801,9.9806 Z"
                id="Combined-Shape"
                fill={props.active ? "#ffffff" : "#121419"}
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default class FilterController extends React.PureComponent {
  state = {
    filterIn: false,
    filterOut: false,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const preState = this.state[id];

    this.setState(
      {
        filterIn: false,
        filterOut: false,
      },
      () => {
        this.setState({ [id]: !preState });
        
      }
    );
  }

  render() {
    return (
      <div className="click-to-edit">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FilterInIcon
            onClick={this.handleClick}
            active={this.state.filterIn}
          />
          <FilterOutIcon
            onClick={this.handleClick}
            active={this.state.filterOut}
          />
        </div>
      </div>
    );
  }
}
