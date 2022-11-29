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

    calculateBoundingBox = (boxes) => {
        const image = document.getElementById('imageimg');
        const width = Number(image.width);
        const height = Number(image.height);

        return boxes.map((data) => {
            return ({
                top: height * data.top_row,
                bottom: height * (1 - data.bottom_row),
                left: width * data.left_col,
                right: width * (1 - data.right_col),
            });

        });


    }

    onSubmitClicked = () => {
        const { userid, onImageDataChange } = this.props;
        console.log(userid);
        if (this.state.url === '') {
            alert('Link cannot be empty');
        } else {
            onImageDataChange({
                url: this.state.url,
                boundingBoxes: [],
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
                            boundingBoxes: this.calculateBoundingBox(res.data),
                        });
                    } else {
                        switch (res.code) {
                            case '00':
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
                <h2 className="input h2">Paste image link here </h2>
                <div  className="input body">
                    
                                <input onChange={this.onUrlChange} className="input url" placeholder="Enter A link here" type="url" id="inputUrl" />
                                <button onClick={this.onSubmitClicked} className="input button">Submit</button>
                            
                </div>

            </div>
        )
    }
}
