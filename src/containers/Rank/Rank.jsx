import React from "react";
import './Rank.css'


const Rank = ({ user }) => {
    const {name,entries}=user;
    return (
        <div className="rank main">
            {
                (user.entries.length === 0) ?
                    <p className="rank text">{`Hello ${name} !, You haven't submitted any request yet`}</p>
                    : (user.entries.length === 1) ?
                        <p className="rank text">{`Hello ${name} !, You have submitted only one request till now`}</p>
                        :
                        <p className="rank text">{`Hello ${name} !, You have submitted ${entries.length} requests till now`}</p>
            }
        </div>
    );
}

export default Rank;