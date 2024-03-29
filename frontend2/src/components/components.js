import React, {useEffect, useState} from "react"

export const SpinnerL = () => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      if (count < 4) {
        setTimeout(() => setCount(count + 1), 150);
      }
    });
  
    return (
      <center className="my-5">
        <div className="row" style={{ maxWidth: "100px" }}>
          <div className="col-4">
            <div
              className="spinner-grow text-success m-1"
              style={
                count > 0
                  ? { height: "20px", width: "20px" }
                  : { display: "none" }
              }
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="col-4">
            <div
              className="spinner-grow text-success m-1"
              style={
                count > 1
                  ? { height: "20px", width: "20px" }
                  : { display: "none" }
              }
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="col-4">
            <div
              className="spinner-grow text-success m-1"
              style={
                count > 2
                  ? { height: "20px", width: "20px" }
                  : { display: "none" }
              }
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </center>
    );
  };

  export const SearchBar = props => {
    const { children, ...rest } = props;
  
    return (
      <div className="d-inline-block">
        <div className="input-group">
          <input
            {...rest}
          />
          <div className="input-group-append">
            {children}
          </div>
        </div>
      </div>
    );
  };

 export const getThisDate = (_data) => {
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  let theDate = new Date(_data)

  let _day = theDate.getDate()
  let _month = theDate.getMonth()
  let _year = theDate.getFullYear()
  
  return(_day + " " + meses[_month] + ". " + _year)
 }