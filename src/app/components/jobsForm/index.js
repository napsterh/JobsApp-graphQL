import React from 'react';


const JobsForm = props => (
    <div className="card card-body">
        <form onSubmit="">
            <div className="form-group">
                <input type="text" name="compania" placeholder="Compañía" className="form-control" autoFocus/>
            </div>
            <div className="form-group">
                <input type="text" name="ciudad" placeholder="Ciudad" className="form-control"/>
            </div>
            <button className="btn btn-success btn-block">
                Buscar Compañía
            </button>
        </form>
    </div>
);

export default JobsForm;