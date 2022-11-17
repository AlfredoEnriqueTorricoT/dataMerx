import React from "react"

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

  const showHeader = (name, id) => {
    return (
      <React.Fragment>
        <b
          onClick={() => {
            setSorter(id);
          }}
          style={{ cursor: "pointer" }}
        >
          {name}
        </b>
        {Math.abs(sorter) === id && (
          <i
            className={`fa fa-caret-${sorter < 0 ? "up" : "down"} mx-2`}
            onClick={() => {
              setSorter(id);
            }}
            style={{ cursor: "pointer" }}
          />
        )}
      </React.Fragment>
    );
};

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

export {ErrorTable, SearchBar, showHeader}