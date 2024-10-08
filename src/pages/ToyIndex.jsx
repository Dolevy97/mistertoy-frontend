import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from "../store/actions/toy.actions.js";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToyList } from "../cmps/ToyList.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { ToySort } from "../cmps/ToySort.jsx";
import { Button } from "@mui/material";

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
    const defaultSort = toyService.getSortFromSearchParams(searchParams)

    useEffect(() => {
        setSearchParams({ ...filterBy, ...sortBy })
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
                console.log('Cannot load toys! err:', err)
            })
    }, [filterBy, sortBy])

    useEffect(() => {
        setFilterBy(defaultFilter)
        setSortBy(defaultSort)
    }, [])

    function onAddToy() {
        navigate('/toy/edit')
    }

    function onMoveToToy(toyId) {
        navigate(`/toy/${toyId}`)
    }

    async function onRemoveToy(ev, toyId) {
        ev.stopPropagation()
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed successfully')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
            throw err
        }
    }

    function onEditToy(ev, toyId) {
        ev.stopPropagation()
        navigate(`/toy/edit/${toyId}`)
    }

    function onSetFilter(filter) {
        setFilterBy(filter)
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    if (!toys) return <h2>Loading toys..</h2>
    return (
        <section className="toy-index">
            <Button color="info" variant="contained" onClick={onAddToy} className="btn btn-add">Add Toy</Button>
            <section className="filter-and-sort">
                <ToyFilter toys={toys} filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>
            {toys.length && <ToyList toys={toys} onMoveToToy={onMoveToToy} onRemoveToy={onRemoveToy} onEditToy={onEditToy} /> || null}
        </section>
    )
}