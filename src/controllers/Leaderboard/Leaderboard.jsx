
import React, { Component } from "react";
import { backend } from "../App/App";
import './Leaderboard.css'



export default class Leaderboard extends Component {

    constructor(params) {
        super(params);
        const { user } = this.props;
        this.state = {
            listtype: 'total',
            user: user,
            data: {
                unique: [],
                total: [],
            },
            loading: {
                state: false,
                id: 0,
            },
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    updateLeaderboard = () => {
        this.setState(
            {
                loading: {
                    state: true,
                    id: 0,
                }
            }
        );
        fetch(`${backend.mainUrl}/leaderboard`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                userid: this.state.user.userid,
            }),
            headers: {
                'Accept': 'application/json,*/*',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {

                this.setState(
                    {
                        loading: {
                            state: false,
                            id: 0,
                        }
                    }
                );
                if (res.status === 'success') {
                    this.setState({ data: res.data })
                } else {
                    switch (res.code) {
                        case '00':
                            alert('Authentication Failed');
                            break;
                        case '01':
                            alert('Unknown Error accrued');
                            break;
                        default:
                            break;
                    }
                }
            })
            .catch(err => {
                this.setState(
                    {
                        loading: {
                            state: false,
                            id: 0,
                        }
                    }
                );
                console.log(err);
                this.props.changeRoute('home');
                alert('Unknown Error accrued');
            })
    }

    componentDidMount() {
        this.updateLeaderboard();
    }

    loading = () => {
        switch (this.state.loading.id) {
            case 0:
                setTimeout(() => {
                    this.setState({
                        loading: {
                            state: this.state.loading.state,
                            id: 1,
                        }
                    })
                }, 500)
                return (
                    <div id="leaderboardLoading" className="leaderboard loading" > Loading </div>
                );

            case 1:
                setTimeout(() => {
                    this.setState({
                        loading: {
                            state: this.state.loading.state,
                            id: 2,
                        }
                    })
                }, 500)
                return (
                    <div id="leaderboardLoading" className="leaderboard loading" > Loading . </div>
                );

            case 2:
                setTimeout(() => {
                    this.setState({
                        loading: {
                            state: this.state.loading.state,
                            id: 3,
                        }
                    })
                }, 500)
                return (
                    <div id="leaderboardLoading" className="leaderboard loading" > Loading .. </div>
                );

            case 3:
                setTimeout(() => {
                    this.setState({
                        loading: {
                            state: this.state.loading.state,
                            id: 0,
                        }
                    })
                }, 500)
                return (
                    <div id="leaderboardLoading" className="leaderboard loading" > Loading ... </div>
                );

            default:
                return (
                    <></>
                )
        }
    }

    render() {

        return (
            <div className="leaderBoard main" >
                <div className="leaderboard dataContainer" style={(this.state.loading.state) ? { opacity: 0.2 } : { opacity: 1 }}>
                    <div className="leaderboard uniqueTable">
                        <h2>UNIQUE</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rank</th>
                                    <th>Entries</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.unique.map((data, i) => {

                                        if (i > 9) {
                                            return (<></>);
                                        }
                                        return (
                                            <tr key={i}>
                                                <td>{data.name}</td>
                                                <td>{data.rank}</td>
                                                <td>{data.count}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>

                        </table>

                    </div>
                    <div className="leaderboard totalTable">
                        <h2>TOTAL</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rank</th>
                                    <th>Entries</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.total.map((data, i) => {

                                        if (i > 9) {
                                            return (<></>);
                                        }
                                        return (
                                            <tr key={i}>
                                                <td>{data.name}</td>
                                                <td>{data.rank}</td>
                                                <td>{data.count}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
                {
                    (this.state.loading.state) ?
                        this.loading()
                        :
                        <></>
                }
            </div>
        );
    }
}