import React from 'react'

const Cell = ({ x, y, size }) => {
    return (
        <div className="cell" style={{ left: x * size, top: y * size, width: size, height: size }}></div>
    )
}

export default Cell