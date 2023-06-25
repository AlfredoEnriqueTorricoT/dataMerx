import React, {useState} from "react"

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const SearchBar = props => {
    const { _onChange, _value } = props;
  
    return (
      <div className="search-box me-2 d-inline-block">
        <div className="position-relative">
          <label htmlFor="" className="search-label mb-0">
            <span className="sr-only"></span>
            <input
              className="form-control"
              onChange={i => _onChange(i.target.value)}
              placeholder="Buscar..."
              type="text"
              value={_value}
            />
          </label>
          <i className="bx bx-search-alt search-icon" />
        </div>
      </div>
    );
  };

  const THeaderSorter = props => {
    const {sorter, setSorter, headerNames} = props
    return (
      <thead>
        <tr>
          {headerNames.map((item, idx)=>(
              item.arrow ?
              (<th key={"t-"+idx+"-"+item.name}>
                <b
                  onClick={() => {
                    setSorter(idx + 1);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item.name}
                </b>
                {Math.abs(sorter) === idx + 1 && (
                  <i
                    className={`fa fa-caret-${sorter < 0 ? "up" : "down"} mx-2`}
                    onClick={() => {
                      setSorter(idx + 1);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </th>)
              :
              <th key={"t-"+idx+"-"+item.name}>
                <b>{item.name}</b>
              </th>
          ))}
        </tr>
      </thead>
    );
};

const MobileDataShow = ({title, desc}) => {
  return(
    <div className="row mb-1">
      <div className="col-4"><b>{title}</b></div>
      <div className="col-8">{desc}</div>
    </div>
  )
}

const ErrorTable = props => {
    const {retryFunction, cod} = props

    return (
        <center>
            <h4>Error ({cod})</h4>
            <br />
            <button className="btn btn-primary" onClick={retryFunction}>
                {props.children}
            </button>
        </center>
    )
}

const OptionsButton = ({buttonsList}) => {
  return(
    <UncontrolledDropdown>
      <DropdownToggle
        className="card-drop"
        tag="i"
        style={{ cursor: "pointer" }}
      >
        <i className="mdi mdi-dots-horizontal font-size-18" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        {buttonsList.map(({_label, ..._button}, idx) => (
          <DropdownItem
          key={"dI-" + idx}
          {..._button}
        >
          {_label}
        </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

const DropdownButton = ({title, buttons, className}) => {
  // const [active, setActive] = useState(false)
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        className={`card-drop ${className}`}
        tag="i"
        style={{ cursor: "pointer" }}
      >
        {title}
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
      {buttons.map(({title, ..._button}, idx) => (
          <DropdownItem
          key={"dI-" + idx}
          {..._button}
        >
          {title}
        </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  // <div className={`dropdown ${className}`}>
  //   <button
  //     className={`${buttonClassName} dropdown-toggle ${active ? "dropdown-show" : ""}`}
  //     type="button"
  //     onClick={()=>setActive(!active)}
  //     >
  //     {title}
  //   </button>
  //   <div className={`dropdown-menu ${active ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
  //     {children}
  //   </div>
  // </div>
)}

const EmptyData = () => (
  <span className="badge badge-pill badge-soft-secondary font-size-12">--</span>
)

export {DropdownButton, EmptyData, ErrorTable, SearchBar, OptionsButton, MobileDataShow, THeaderSorter}