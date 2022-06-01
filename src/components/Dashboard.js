import React from 'react';
import {Link} from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () =>{
    return(
        <div className='dashboard-container'>
            <h1 className='dashboard-container-heading'>Micro Frontend Dashboard</h1>
            <p className='dashboard-container-para'>Microfrontends are sections of your UI, often consisting of dozens of components, that use frameworks like React, Vue, and Angular to render their components. Each microfrontend can be managed by a different team and may be implemented using its own framework. It is practical and suggested to use just one framework for all your microfrontends, although you may add additional frameworks when migrating or when experimenting. Each microfrontend has its own git repository, its own package.json file, and its own build tool configuration. As a result, each microfrontend has an independent build process and an independent deploy / CI. This generally means that each repo has fast build times.</p>
            <Link to='/marketing' >Marketing App</Link>
        </div>
    )
}

export default Dashboard;