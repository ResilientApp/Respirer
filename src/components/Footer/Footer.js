/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          
          <Col>
            <h3 className="title">Visit Our Repository:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://github.com/ResilientApp/Respirer"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-github" />
              </Button>
            </div>
          </Col>
          <Col className="text-center">
           <p style={{marginTop: '20%'}}>Built on Resilient DB</p> 
          </Col>
          <Col className="text-center">
           <p style={{marginTop: '20%'}}>© 2023 Respirer. All Rights Reserved.</p> 
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
