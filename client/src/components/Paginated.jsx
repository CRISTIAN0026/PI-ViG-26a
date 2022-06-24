import React from "react";
import './Paginated.css';

const Paginated = ({ gamesForPage, games, paginated }) => {
    const pageNumbers = []

    for (let i = 1; i <=Math.ceil(games/gamesForPage); i++) {
        pageNumbers.push(i )
    }

    return(
        <nav  >
            {pageNumbers &&
                    pageNumbers.map(n => ( 
                        <button className="sa" onClick={() => paginated(n)} key={n}>{n}</button>
                    ))
                }
        </nav>
    )
}

export default Paginated;