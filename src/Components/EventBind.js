import React, { Component } from 'react'

class EventBind extends Component {

constructor(props) {
    super(props)

    this.state = {
         message: 'Hallo'
    }

this.clickHandler = this.clickHandler.bind(this)

}

clickHandler () {
    this.setState ({
    message: 'Good bye!'
    })
    console.log(this)
}

    render() {
        return (
            <div>
                <div>{this.state.message}</div>
                {/* <button onClick={this.clickHandler.bind(this)}>Click for Indus</button> */}
                {/* <button onClick={() => this.clickHandler()}>Click for Indus</button> */}
                <button onClick={this.clickHandler}>Click for Indus</button>
                
            </div>
        )
    }
}

export default EventBind
