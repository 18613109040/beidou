import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import fetch from "isomorphic-fetch";
import {testGet,testPost} from '../../actions/home'
import Layout from '../../components/Layout' 
import './index.less'
class Home extends React.Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        

    }
    componentDidMount() {
        testGet();
        testPost();
    }
    
    render() {
        return (
            <div className="home">
				<Layout>
                    

                </Layout>
            </div>

        )
    }
}



export default Home
