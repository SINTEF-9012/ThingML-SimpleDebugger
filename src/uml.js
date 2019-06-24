import React from 'react';
import reqwest from 'reqwest';

class UML extends React.Component {

  constructor(props){
    super(props);
    this.state={
        d: '',
        type:this.props.type,
    }
  }

    componentDidMount() {
        this.fetch();
    }

    fetch = (params = {}) => {
      reqwest({
        url: 'http://127.0.0.1:8080/svg/'+this.state.type+'/LightSensorApp',
        method: 'get',
        type: 'image/svg+xml',
      }).then((data) => {
        this.setState({d: data.response})
      });
    }

    render() {
        return (
          <span dangerouslySetInnerHTML={{__html: this.state.d}} />
        );
      }

}

export default UML;