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
                    console.log(this);
                    console.log(this.parentNode);
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
                      console.log(this);
                      console.log(this.parentNode);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </th>)
              :
              <th>
                <b>{item.name}</b>
              </th>
          ))}
        </tr>
      </thead>
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

export {ErrorTable, SearchBar, THeaderSorter}