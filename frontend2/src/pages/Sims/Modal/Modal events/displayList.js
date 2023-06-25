import React from 'react'
import PropTypes from 'prop-types'

import { getThisDate, SpinnerL } from 'components/components'
import { ErrorTable } from 'components/tableElements'

import { URL_IMAGE } from 'store/api/AxiosServices'

const DisplayEventList = ({
    activeTab,
    setActiveTab,
    detailStatus,
    idSelected,
    localStore,
    onGet,
    RetryFDetail,
    setDetailStatus,
    setIdSelected,
    setShowImg,
    showImg,
    tabsLocked
}) => {
    const badgeColor = ["buen", "info", "warning", "danger"]
    const badgeText = ["dia", "Informativo", "Advertencia", "Peligro"]

    const DisplayImages = ({images}) => {
        if (images.length)
            return(
                <React.Fragment>
                    {images.map((image, idx) => (
                        <div className="row mb-1" key={"image-"+idx}>
                            <img
                                className="d-block w-100 imgCover"
                                src={URL_IMAGE + image.url}
                                alt="Second slide"
                            />
                        </div>
                    ))}
                </React.Fragment>
            )
        else return(
            <center>
                <h4 className="text-secondary my-5 py-5">Sin imágenes</h4>
            </center>
        )
    }

    const Carrousel = ({images}) => {
        const maxImg = images.length - 1
        const prevF = () => {
            if(showImg == 0) setShowImg(maxImg)
            else setShowImg(showImg - 1)
        }
        const nextF = () => {
            if (showImg >= maxImg) setShowImg(0)
            else setShowImg(showImg + 1)
        }
      
        return(
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {images.map((image, idx) => (
                        <li
                            className={showImg == idx ? "active" : ""}
                            key={"CInd-"+idx}
                            onClick={()=>setShowImg(idx)}>
                        </li>
                    ))}
                </ol>
                <div className="carousel-inner">
                    {images.map((image, idx) => (
                      <div
                        className={`carousel-item ${showImg == idx ? "active" : ""}`}
                        style={{width: "100%", height: "40vh"}}
                        key={"CImg-"+idx}
                      >
                        <img
                            className="d-block w-100 imgCover"
                            src={URL_IMAGE + image.url}
                            alt="Second slide"
                        />
                      </div>
                    ))}
                </div>
                <a className="carousel-control-prev" onClick={prevF} role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" onClick={nextF} role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
            </div>
        )
      }

    return(
        <div className="row">
            <div className="col-7">
                <div className="row border-dark border-bottom">
                    <div className="col-5">
                        <b>Evento</b>
                    </div>
                    <div className="col-3">
                        <b>Fecha</b>
                    </div>
                    <div className="col-4">
                        <b>Tipo</b>
                    </div>
                </div>
                
                <div
                    className="m-0 p-0 grayScroll"
                    style={{maxHeight: "55vh", overflowY: "auto", overflowX: "hidden"}}
                >
                    {localStore.eventList.map((event, idx)=>(
                        <div
                            className={`row border-bottom py-1 ${idSelected == event.id ? ("bg-soft bg-"+badgeColor[event.type_id]) : ""}`}
                            style={{cursor: "pointer"}}
                            onClick={()=>{onGet({saveAs: "eventImage", url: "event-images/"+event.id});setIdSelected(event.id); setDetailStatus(0);}}
                            key={"eventItem-"+idx}>
                            <div className="col-5">
                                <b>{event.title}</b><br />
                                <p>{event.detail}</p>
                            </div>
                            <div className="col-3 justify-content-center">
                                {getThisDate(event.created_at)}
                            </div>
                            <div className="col-4 align-items-center">
                                <center>
                                    <span
                                      className={`badge font-size-11 rounded-pill badge-soft-${
                                        badgeColor[event.type_id]
                                      } text-uppercase`}
                                    >
                                      {badgeText[event.type_id]}
                                    </span>
                                    {"   "}
                                    {event.images.length ?
                                        <i className="fas fa-camera"></i>
                                    : ""}
                                </center>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-5 m-0 p-0 grayScroll" style={{maxHeight: "55vh", overflowY: "auto", overflowX: "hidden"}}>
                {idSelected == -1 ?
                    <center>
                        <h4 className="text-secondary my-5 py-5">Seleccione un evento</h4>
                    </center>
                :
                    <React.Fragment>
                        <DisplayImages images={localStore.eventList.find((event)=>event.id == idSelected).images} />
                    </React.Fragment>
                }
                {detailStatus == 2 ? <ErrorTable cod={localStore.status} retryFunction={RetryFDetail} /> : ""}
            </div>
        </div>
    )
}

DisplayEventList.propTypes = {
    activeTab: PropTypes.any,
    setActiveTab: PropTypes.any,
    detailStatus: PropTypes.any,
    idSelected: PropTypes.any,
    localStore: PropTypes.any,
    onGet: PropTypes.any,
    RetryFDetail: PropTypes.any,
    setDetailStatus: PropTypes.any,
    setIdSelected: PropTypes.any,
    setShowImg: PropTypes.any,
    showImg: PropTypes.any,
    tabsLocked: PropTypes.any
}

export default DisplayEventList