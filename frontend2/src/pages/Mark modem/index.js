import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { createPetition } from "store/actions"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

const MarkModemPage = ({onCreatePetition}) => {
    const [state, _zetState] = useState({})

    const setState = (data) => {
        _zetState({...state, _zetState})
    }

    useEffect(()=>{
        onCreatePetition({type: "GET", url: ""}, {})
    }, [])
}

MarkModemPage.propTypes = {
    onCreatePetition: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onCreatePetition : (pType, data) => dispatch(createPetition(pType, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(useTranslation()(MarkModemPage))