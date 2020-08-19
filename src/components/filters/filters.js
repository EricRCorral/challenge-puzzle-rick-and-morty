import React from 'react';

function Filters(props) {

    const radios = [
        'Characters',
        'Locations',
        'Episodes'
    ]

    // Los filtros funcionan con un indice el cual selecciona uno de los 3 querys del app.component
    // Se coloca la pagina uno para prevenir posibles fallos de diferencias de paginas entre filtros

    function selectFilter(i) {
        props.setQueryIndex(i)
        props.setPage(1)
    }

    return (
        <>

            <h4>Filters</h4>

            <form>

                {radios.map((name, i) => (

                    <p key={name}>

                        <label>

                            <input
                                checked={i === props.queryIndex}
                                className="with-gap"
                                type="radio"
                                onChange={() => selectFilter(i)} />

                            <span>{name}</span>

                        </label>
                    </p>
                ))}
            </form>
        </>
    );
}

export default Filters