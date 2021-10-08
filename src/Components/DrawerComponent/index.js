import React from 'react'
import Drawer from './Drawer'

const DrawerComponent = () => {

  return (
    <>
      <Drawer id="demo" title="Bookmarks">
      <p>This is Bookmarks body.</p>
        <button className="btn btn-primary" type="button">A Button</button>
      </Drawer>
      <Drawer id="demoTwo" title="Notes">
        <p>This is notes body.</p>
        <button className="btn btn-secondary" type="button">A Button</button>
      </Drawer>
      <Drawer id="demoThree" title="Additional Notes">
        <p>This is additional notes body.</p>
        <button className="btn btn-dark" type="button">A Button</button>
      </Drawer>
      <div className="d-flex gap-2" style={{ position: "fixed", top: "50vh", right: "-130px", zIndex: 9999, transform: "rotate(90deg)" }}>
        <button className="btn btn-sm btn-primary shadow-lg rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">Bookmarks</button>
        <button className="btn btn-sm btn-secondary shadow-lg rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#demoTwo">Notes</button>
        <button className="btn btn-sm btn-dark shadow-lg rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#demoThree">Additional Notes</button>
      </div>

    </>
  )
}

export default DrawerComponent

