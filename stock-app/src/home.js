import React from 'react'

function Home(){
    return(
        <div>
            <h1>
                Stock Website
            </h1>
            <form action="https://invest.ameritrade.com/grid/p/site#r=positions">
                <button type="submit">Login</button>
            </form>

            {/* <nav class="navbar navbar-dark bg-dark">
                <li>Home</li>
                <li>Login</li>
            </nav> */}
        </div>
    ) 
}

export default Home;