import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import './style.css';

export default class extends React.Component {
    componentDidMount(){
        document.scrollingElement.scrollTop = this.props.scrollTop
    }
    render(){
        const {
            data: { jobs },
            loading,
            fetchLimit
        } = this.props
        const jobslist = jobs.map((e, i) => {
            return <JobsDesc job={e} key={i} />
        });
        return (
            <div className="container">
                {jobslist}
                {loading && <Loader/>}
                {fetchLimit && (
                    <div>
                        <p>No hay más trabajos encontrados</p>
                    </div>
                )}
            </div>
        );
    }
}

const JobsDesc = ({ job, match }) => {
    return (
            <div className="card-group">
                <div className="card-body">
                    <img className="card-img-top" src={job.company.logoUrl} alt="Card image cap"></img>
                    <div className="card-body">    
                        <Link to={`job/${job.id}`}>
                            <div className="jobsdesc">
                                <p>Compañía: {job.company.name}</p>
                                <p>Título: {job.title}</p>
                                <p>Sitio Web: {job.company.websiteUrl}</p>
                            </div>
                        </Link>
                    </div>        
                </div>    
            </div>     
    );
};
