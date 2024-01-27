import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import Footer from "../components/Footer/Footer";
import Dashboard from "./Dashboard";

export default function Home() {
  let navigate = useNavigate();
  return (
    <>
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1">
            {/* <img
              alt="..."
              className="img-fluid"
              src={require("../assets/img/orange.png")}
            /> */}
          </div>
          <div className="squares square2">
            {/* <img
              width="70%"
              style={{ float: "right" }}
              alt="..."
              className="img-fluid"
              src={require("../assets/img/burger.png")}
            /> */}
          </div>
          <div className="squares square3">
            {/* <img
              alt="..."
              className="img-fluid"
              src={require("../assets/img/butter.png")}
            /> */}
          </div>
          <div className="squares square4">
            {/* <img
              alt="..."
              className="img-fluid"
              src={require("../assets/img/wine.png")}
            /> */}
          </div>
          <div className="squares square5">
            {/* <img
              alt="..."
              className="img-fluid"
              src={require("../assets/img/background.png")}
            /> */}
          </div>
          <div className="squares square6">
            {/* <img
                  alt="..."
                  className="img-fluid"
                  src={require("../assets/img/coffee.png")}
                /> */}
          </div>
          <div className="squares square7">
            {/* <img
              alt="..."
              className="img-fluid"
              src={require("../assets/img/chocobar.png")}
            /> */}
          </div>
          <Container>
            <div className="content-center brand">
              <h1 className="h1-seo">Respirer</h1>
              <h3 className="d-none d-sm-block">
              A Blockchain-Based CO2 Supply Chain Application Built On Resilient DB
              </h3>
              <Button color="success" size="lg"            onClick = {()=>navigate("/track")}>Get Started!</Button>
            </div>
          </Container>
        </div>
        <section className="section section-lg section-safe">
          {/* <img
            alt="..."
            className="path"
            src={require("../assets/img/path5.png")}
          /> */}
          <Container>
            <Row className="row-grid justify-content-between">
              <Col md="5">
                <img
                  style={{ borderRadius: "5rem" }}
                  alt="..."
                  className="img-fluid floating"
                  src={require("../assets/img/respirer-what.png")}
                />
              </Col>
              <Col md="6">
                <div className="px-md-5">
                  <hr className="line-success" />
                  <h3>What is Respirer?</h3>
                  <p>
                    Respirer is an innovative solution that digitizes the food
                    supply chain through a blockchain app, fostering industrial
                    symbiosis between the processing food industry, green
                    hydrogen producers, and cosmetic companies.
                  </p>
                  <p style={{ marginTop: "3rem" }}>
                    Respirer is built on{" "}
                    <a href="https://resilientdb.com">Resilient DB</a>, a robust
                    blockchain fabric, ensuring a secure and efficient platform
                    for transforming the food supply chain and promoting
                    sustainable industrial collaboration.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center" style={{ marginBottom: "-5%" }}>
                  Why Respirer?
                </h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3" className="text-center">
                    <div className="info">
                      <div className="icon icon-warning">
                        <i className="tim-icons icon-link-72" />
                      </div>
                      <h4 className="info-title">Preserve food safety</h4>
                    </div>
                  </Col>
                  <Col lg="3" className="text-center">
                    <div className="info">
                      <div className="icon icon-danger">
                        <i className="tim-icons icon-lock-circle" />
                      </div>
                      <h4 className="info-title">Enhance Food security</h4>
                    </div>
                  </Col>
                  <Col lg="3" className="text-center">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-chart-pie-36" />
                      </div>
                      <h4 className="info-title">Reduce food wastage</h4>
                    </div>
                  </Col>
                  <Col lg="3" className="text-center">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="tim-icons icon-spaceship" />
                      </div>
                      <h4 className="info-title">
                        Boost the valorization of by-products
                      </h4>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <Dashboard /> */}
        <Footer />
      </div>
    </>
  );
}
