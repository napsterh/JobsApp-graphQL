import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JobsList from './components/jobsList';
import JobsForm from './components/jobsForm';
import { fetchData } from './lib/fetchdata';
import './styles.css';

class JobsApp extends React.Component {
    state = { data: { jobs: [] }, loading: true };
    scrolli = this.onScroll;
    scrollTop = 0;
    fetchTimes = 1;
    fetchLimit = false;

    async componentDidMount() {
        const initpagination = 5;
        const query = `query{
            jobs{
                id
                title
                countries{
                name
                }
                cities{
                name
                updatedAt
                }
                company{
                name
                websiteUrl
                logoUrl
                }
            }
        }`;
        const data = await fetchData(query);
        this.setState({ data, loading: false });
        this.fetchTimes += 1;
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrolli);
      }

    onScroll(pagination = 5){
        const totalJobsList = 10;

        return async () => {
            this.scrollTop = document.scrollingElement.scrollTop;
            const { jobs } = this.state.data;
            if (this.state.loading) return;

            if (
                document.scrollingElement.scrollTop + window.innerHeight >=
                document.scrollingElement.scrollHeight
              ) {
                this.setState({ loading: true });
                const query = `query{
                                    jobs(first: ${this.fetchTimes * pagination}){
                                        id
                                        title
                                        countries{
                                        name
                                        }
                                        cities{
                                        name
                                        updatedAt
                                        }
                                        company{
                                        name
                                        websiteUrl
                                        logoUrl
                                        }
                                    }
                                }`;
                const data = await fetchData(query);
                if (jobs.length >= totalJobsList) {
                this.fetchLimit = true;
                }
                this.setState({ data, loading: false });

                this.fetchTimes += 1;
                }
        };
    }

    componentDidUpdate() {
        this.fetchLimit && window.removeEventListener("scroll", this.scrolli);
      }

      render(){
        return (
            <div className="app">
              <header>
                <h1>Jobs App</h1>
              </header>
              <JobsForm/>
              <Router>
                        <Route
                        
                            exact
                            path="/"
                            render={() => {
                            if (!this.fetchLimit) {
                                window.addEventListener("scroll", this.scrolli);
                            }

                            return (
                                <JobsList
                                {...this.state}
                                fetchLimit={this.fetchLimit}
                                scrollTop={this.scrollTop}
                                />
                            );
                            }}
                        />
            </Router>
            <footer className="container">
            <div className="footer-content">
                <p>Homer López Vidal</p>
            </div>
            </footer>
        </div>
        );
    }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<JobsApp />, rootElement);