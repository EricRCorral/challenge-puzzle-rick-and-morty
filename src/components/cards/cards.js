import React from 'react';
import { useQuery } from '@apollo/client';
import Card from '../card/card'

// Componente con los resultados de las búsquedas más el paginator

function Cards(props) {

    let filter = (props.queryIndex === 0) ?
        'characters' : (props.queryIndex === 1) ?
            'locations' : 'episodes';

    // Se realiza el query  utilizando los 3 states del app.component
    // Hay 3 estados del query más, por defecto, un return en caso de que el name < 3, es decir que
    // aún no hay data

    const { loading, error, data } = useQuery(
        props.queries[props.queryIndex],
        { variables: { "name": { "name": props.name }, "page": props.page } });

    // Función para cambiar de pagina. La condición if es para no modificar el page más alla de las
    // paginas extremos, minimo 1 y maximo pages.lenght

    function changePage(page) {
        if (page === null) {
            return;
        } else {
            props.setPage(page)
        }
    }

    // Se hace un return si el name.length < 3

    if (props.name.length < 3) {
        return <h3 className="center-align">
            Here will appear what you are searching<span role="img" aria-label="Emoji">🚀</span>
        </h3>;
    }

    // Loader del materialize

    if (loading) return (
        <div className="center-align">
            <div className="preloader-wrapper active big">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Estado del query de error (más precisamente retorna cuando no hay data, state:404)

    if (error) return <h3 className="center-align">
        No results <span role="img" aria-label="Emoji">❌</span>
    </h3>;

    // Array para hacer un mapeo de la cantidad de paginas que hay (dato que viene del query).
    // El Math.random es para utilizar una key que no sea el indice de las pages

    let pages = new Array(data[filter].info.pages).fill(0).map(zero => zero += Math.random())

    return (
        <>

            <div className="row">

                {/* Se hace un mapeo seleccionando el filtro, son muchas variables que la mayoría
                luego las heredan el card.component */}

                {data[filter].results.map(({
                    id, name, image, dimension,
                    episode, type, gender, species,
                    air_date, characters, residents }) => (

                        <div key={id}>

                            <div className="col s6 l3 hoverable">

                                <div className="card">

                                    {/* Se renderizarán las "cartas" dependiendo si el filtro es
                                    characters o no, como el formato de carta de una location o episode
                                    son iguales es que solo necesito una condición. Cada carta abre un
                                    modal (que es el card.component). Utilizo los href de esta manera
                                    para evitar warnings en la consola de desarrollador del browser. */}

                                    {filter === 'characters' ?

                                        <>

                                            <a className="modal-trigger" href={`#${id}`}>

                                                <div className="card-image">
                                                    <img src={image} alt={name} />
                                                </div>

                                                <div className="card-content center-align">
                                                    <div className="truncate">
                                                        <strong>{name}</strong>
                                                    </div>
                                                </div>

                                            </a>

                                            <Card id={id} filter={filter} name={name}
                                                image={image} type={type} gender={gender}
                                                species={species} />

                                        </>

                                        :

                                        <>
                                            <a className="modal-trigger" href={`#${id}`}>

                                                <div className="card-height card-content">

                                                    <div className="card-title center-align">
                                                        <strong>
                                                            {filter === 'locations' ?
                                                                'Location: ' : 'Episode: '}{name}
                                                        </strong>
                                                    </div>

                                                    <div className="card-action center-align">
                                                        {filter === 'locations' && 'Dimension: '}{dimension}
                                                        {filter === 'episodes' && 'Episode code: '}{episode}
                                                    </div>

                                                </div>
                                            </a>

                                            <Card id={id} name={name} episode={episode}
                                                dimension={dimension} air_date={air_date}
                                                type={type} residents={residents}
                                                characters={characters} filter={filter} />

                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Paginator que utiliza la función changePage() explicada más arriba */}

            <div className="row center-align">

                <ul className="pagination">

                    <li
                        className={(props.page === 1) ? 'waves-effect disabled' : 'waves-effect'}
                        onClick={() => changePage(data[filter].info.prev)}>
                        <a href='/#'><i className="material-icons">chevron_left</i></a>
                    </li>

                    {pages.map((random, i) =>
                        (<li key={random}
                            className={(i + 1 === props.page) ? 'waves-effect active' : 'waves-effect'}
                            onClick={() => changePage(i + 1)}>
                            <a href='/#'>{i + 1}</a>
                        </li>)
                    )}

                    <li
                        className={(pages.length === props.page) ?
                            'waves-effect disabled' : 'waves-effect'}
                        onClick={() => changePage(data[filter].info.next)}>
                        <a href='/#'><i className="material-icons">chevron_right</i></a>
                    </li>

                </ul>
            </div>
        </>
    );
}

export default Cards