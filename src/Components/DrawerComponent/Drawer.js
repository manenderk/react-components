import React from 'react'

const Drawer = ({id, title,children}) => {
    return (
        <div className="offcanvas offcanvas-end" style={{position:"fixed",right:"30px"}} id={id}>
        <div className="offcanvas-header">
          <h1 className="offcanvas-title">{title}</h1>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          {children}
        </div>
      </div> 
    )
}

export default Drawer
