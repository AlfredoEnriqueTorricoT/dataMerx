export const tableSorter = (_list, _sorter, _multiplier) => {
    let listSortered = [..._list]
    
    listSortered.sort(((dataA,dataB) => {
        let a = dataA[_sorter].toLowerCase()
        let b = dataB[_sorter].toLowerCase()

        if (a == b) {
            return 0
        } else if (a > b) {
            return (1 * _multiplier)
        } else {
            return (-1 * _multiplier)
        }
    }))

    return listSortered
}

export const tableFilter = (_list, _filter, _keys) => {
    let listFiltered = _list.filter((item)=>{
        let filterApproved = false

        for (let x = 0; x < _keys.length; x++) {
            if ((item[_keys[x]] + "").toLowerCase().includes(_filter.toLowerCase())) {
                filterApproved = true;
                break;
            }
        }

        return filterApproved;
    })

    return listFiltered
}