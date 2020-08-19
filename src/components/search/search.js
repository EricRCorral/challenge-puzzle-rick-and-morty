import React from 'react';

// Este componente unicamente modifica el state "name"

function Searcher(props) {

    function noSubmit(e) {
        e.preventDefault()
    }

    return (
        <>

            <form className="row valign-wrapper" onSubmit={e=> noSubmit(e)}>

                <div className="input-field col s11 m10">

                    <i className="material-icons prefix">search</i>

                    <input value={props.name} onChange={e => props.setName(e.target.value)} type="text" />

                    <label htmlFor="icon_prefix">Character, location, episode...</label>

                </div>

                <button
                    className="btn-floating btn waves-effect waves-light red"
                    onClick={() => props.setName('')}>
                    <i className="material-icons">clear</i>
                </button>

            </form>
        </>
    );
}

export default Searcher