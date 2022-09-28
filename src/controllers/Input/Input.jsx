import React, { Component } from "react";
import { backend } from "../App/App";
import './Input.css'

const initialState = {
    input: 'link',
    url: ''
}

export default class Input extends Component {
    constructor(params) {
        super(params);

        this.state = initialState;
    }

    onUrlChange = (event) => {
        this.setState({ url: event.target.value });
    }

    onSubmitClicked = () => {
        const { userid, changeRoute, onImageDataChange } = this.props;
        if (this.state.url === '') {
            alert('Link cannot be empty');
        } else {
            onImageDataChange({
                url: this.state.url,
            });
            fetch(`${backend.mainUrl}/detectImage`, {
                method: "PUT",
                credentials: 'include',
                body: JSON.stringify({
                    imageUrl: this.state.url,
                    userid: userid,
                }),
                headers: {
                    'Accept': 'application/json,*/*',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 'success') {
                        onImageDataChange({
                            url: this.state.url,
                            boundingBoxes:res.data,
                        });
                    } else {
                        switch (res.code) {
                            case '00':
                                changeRoute('signout');
                                alert('authentication failed');
                                break;
                            case '01':
                                alert('could not detect faces');
                                break;

                            default:
                                break;
                        }
                    }
                })
                .catch(console.log)
        }
    }

    render() {
        return (
            <div className="input main">
                <div className="input button_container">
                    <p onClick={() => { this.setState({ input: 'link' }) }} className="input button">Link</p>
                    <p onClick={() => { this.setState({ input: 'upload' }) }} className="input button">Upload</p>
                </div>
                <div className="input body">
                    {
                        (this.state.input === 'link') ?
                            <>
                                <input onChange={this.onUrlChange} className="input url" placeholder="Enter A link here" type="url" id="inputUrl" />
                                <button onClick={this.onSubmitClicked} className="input button">Submit</button>
                            </>
                            :
                            <>
                                <p>Under development</p>
                            </>
                    }
                </div>

            </div>
        )
    }
}
