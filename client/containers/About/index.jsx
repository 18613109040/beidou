import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import TabBar from '../../components/TabBar'
class About extends React.Component {
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
     
     
    }
    render() {
       
        return (
            <div className="home">
					about
                    <div><TabBar/></div>
            </div>

        )
    }
}



export default About
