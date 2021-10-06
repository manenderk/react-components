import React from 'react'


const Drawer = () => {

  return (
    <>
      <div className="offcanvas offcanvas-end" style={{position:"fixed",right:"30px"}} id="demo">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title">Bookmarks</h1>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <p>Some text lorem ipsum.</p>
          <p>Some text lorem ipsum.</p>
          <button className="btn btn-secondary" type="button">A Button</button>
        </div>
      </div> 
      <div className="offcanvas offcanvas-end" style={{ position: "fixed", right: "38px" }} id="demoTwo">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title">Notes</h1>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <p>Some text lorem ipsum.</p>
          <p>Some text lorem ipsum.</p>
          <button className="btn btn-secondary" type="button">A Button</button>
        </div>
      </div>
      <div className="offcanvas offcanvas-end" style={{ position: "fixed", right: "38px" }} id="demoThree">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title">Additional Notes</h1>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <p>Some text lorem ipsum.</p>
          <p>Some text lorem ipsum.</p>
          <p>Some text lorem ipsum.</p>
          <button className="btn btn-secondary" type="button">A Button</button>
        </div>
      </div>
      <div className="d-flex gap-2" style={{ position: "fixed", top: "50vh", right: "-130px", zIndex: 9999, transform: "rotate(90deg)" }}>
        <button className="btn btn-sm btn-primary shadow-lg rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">Bookmarks</button>
        <button className="btn btn-sm btn-secondary shadow-lg rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#demoTwo">Notes</button>
        <button className="btn btn-sm btn-dark shadow-lg rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#demoThree">Additional Notes</button>
      </div>

    </>
  )
}

export default Drawer

