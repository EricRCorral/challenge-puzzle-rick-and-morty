import React, { useEffect } from 'react'
import M from 'materialize-css'

// Los card son el equivalente al modal que se abre desde el cards.component

function Card(props) {

    // Array que toma los primeros 5 miembros dependiendo del filtro seleccionado. El caso del undefined
    // es para evitar errores si el filter es characters (no tiene residents ni characters como prop)

    const arr5 = props.filter !== 'characters' ?
        props.filter === 'locations' ?
            props.residents.slice(0, 5)
            :
            props.characters.slice(0, 5)
        :
        undefined;

    // Requerido para inicializar el modal

    useEffect(() => {

        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])

    return (

        <>

            {/* El modal se abre en base al id heredado del cards.component */}

            <div id={props.id} className="modal">

                <div className="modal-content">

                    <i className="material-icons modal-close">close</i>

                    {/* Similar al cards.component se condiciona dependiendo si el filtro es characters
                    o no. En caso de ser characters no se requiere hacer ningún mapeo, se usa la data
                    heredada y se mostrará o no el type dependiendo si su valor es distinto de vacío */}

                    {props.filter === 'characters' ?

                        <>

                            <div className="center-align">

                                <img className="responsive-img" src={props.image} alt={props.name} />

                                <h4 >{props.name.toUpperCase()}</h4>

                            </div>

                            <h5>Gender: {props.gender}</h5>

                            <h5>Specie: {props.species}</h5>

                            {props.type !== '' && <h5>Type: {props.type}</h5>}

                        </>
                        :
                        <>

                            {/* En caso de que el filter no sea characters se condicionan algunos elementos
                         de locations o episodes, luego se hace un mapeo de la data del arr5 que tiene
                         los residents(locations) o characters(episodes). El data.image !== null es una
                         condición para evitar errores en caso de que no haya data y termine generando
                         una card vacia (solo el marco sin imagen) */}

                            <h4 className="center-align">{props.name.toUpperCase()}</h4>

                            {props.dimension && <h5>Dimension: {props.dimension}</h5>}

                            {props.type && <h5>Type: {props.type}</h5>}

                            {props.episode && <h5>Episode code: {props.episode}</h5>}

                            {props.air_date && <h5>Air date: {props.air_date}</h5>}

                            {props.filter === 'locations' ? <h5>Residents:</h5> : <h5>Characters:</h5>}

                            <div className="row">

                                {arr5.map(data => (

                                    <div className="col s12 m3" key={data.id}>

                                        <div className="card">

                                            {data.image !== null &&

                                                <>

                                                    <div className="card-image">
                                                        <img src={data.image} alt={data.name} />
                                                    </div>

                                                    <div
                                                        className="card-content truncate">
                                                        {data.name}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </div>
            </div>
        </>)
}

export default Card