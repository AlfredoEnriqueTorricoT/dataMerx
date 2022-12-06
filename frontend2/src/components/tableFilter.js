export const tableSorter = (_list, _sorter, _multiplier) => {
    let listSortered = [..._list]
    
    listSortered.sort(((dataA,dataB) => {
        let a, b

        if ((Number(dataA[_sorter]) + "") == "NaN" || (Number(dataB[_sorter]) + "") == "NaN") {
            a = (dataA[_sorter] + "").toLowerCase()
            b = (dataB[_sorter] + "").toLowerCase()
        } else {
            a = Number(dataA[_sorter])
            b = Number(dataB[_sorter])
        }

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
            try {
                if ((item[_keys[x]] + "").toLowerCase().includes(_filter.toLowerCase())) {
                    filterApproved = true;
                    break;
                }
            } catch (error) {
                if (("- - -").includes(_filter))
                    filterApproved = true;
            }
        }

        return filterApproved;
    })

    return listFiltered
}