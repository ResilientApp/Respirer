import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Container,
  CardFooter,
  ListGroup,
  ListGroupItem,
  UncontrolledAlert,
} from "reactstrap";

import { FETCH_TRANSACTION } from "../utils/ResDbApis";
import { sendRequest } from "../utils/ResDbClient";
import { CardHeader } from "react-bootstrap";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables } from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);
ChartJS.register(SankeyController, Flow);

function ProductTracker() {
  const [productStages, setProductStages] = useState([]);
  const [product, setProduct] = useState("");
  const [initialProduct, setInitialProduct] = useState({});
  const [productFound, setProductFound] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const chartRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    document
      .getElementById("track-section")
      .scrollIntoView({ behavior: "smooth" });
    trackProduct();
  };

  const dataObjects = (stage) => {
    return {
      labels: ['Inherent', 'Pesticides', 'Fertilizers', 'Equipment', 'Fuel'],
      datasets: [
        {
          label: 'CO2 Emissions',
          data: [
            stage.Inherent,
            stage.Pesticides,
            stage.Fertilizers,
            stage.Equipment,
            stage.Fuel
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],    
    };
  };

  const sankeyData = {
    datasets: [{
      data: productStages.map(stage => ({
        from: 'Stage ' + stage.StageNo,
        to: {
          Inherent: stage.Inherent,
          Pesticides: stage.Pesticides,
          Fertilizers: stage.Fertilizers,
          Equipment: stage.Equipment,
          Fuel: stage.Fuel
        }
      }))
    }]
  };

  const PieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

//   useEffect(() => {
//     let sankeyChart=null;
//     if (chartRef && chartRef.current) {
//       const ctx = chartRef.current.getContext("2d");
//       sankeyChart = new ChartJS(ctx, {
//         type: 'sankey',
//         data: sankeyData,
//         options: {
//           plugins: {
//             legend: {
//               display: false
//             }
//           }
//         }
      
//       // setCurrentChart(chart);
    
//   })
  
// }
// return()=>{
//   sankeyChart?.destroy();
//   ChartJS.unregister('sankey');
// }
// }, []);


  useEffect(() => {
    if (productStages.length != 0) {
      setProductFound(true);
    }
  }, [productStages]);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const trackProduct = async () => {
    console.log("Tracking product: ", product);
    if (product == "") {
      setProductFound(false);
      return;
    }
    const query = FETCH_TRANSACTION("", "");
    try {
      sendRequest(query).then((res) => {
        if (res && res.data && res.data.getFilteredTransactions) {
          // if (res.data.getFilteredTransactions.length == 0)
          //   setProductFound(false);
          // else setProductFound(true);

          let adj = [...productStages];
          let te=0;
          res.data.getFilteredTransactions.forEach((item) => {
            let info = JSON.parse(item.asset.replace(/'/g, '"')).data;
            if (
              info != undefined &&
              info != null &&
              info["FinalProduct"] == product
            ) {
              let stageNo = info["StageNo"];
              adj[stageNo] = info;
              te+=info["CO2"];
            }
          });
          setProductStages(adj);
          setTotalEmissions(te);
          console.log(adj);
          console.log(te);
        } else {
          // trackProduct(); // BUG: Temporary fix for the intermittent graphql error
        }
      });
    } catch (error) {
      setProductFound(false);

      console.log("Product tracking error ", error);
    }
  };

  const renderChain = () => {
    if (productStages == []) {
      return null;
    }
    console.log("In render", productStages);
    return (
      <>

        {productStages.map((item, index) => (
          <ListGroupItem
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <Card key={index} className="round-card"
            onMouseEnter={() => handleHover(index)} 
            // onMouseLeave={()=>handleMouseLeave()}
            >
              <CardHeader className="round-card-header">
                <h3>{item.Stage}</h3>
              </CardHeader>
              <CardBody className="round-card-body">
                <p>{item.CO2} CO<sub>2</sub>E </p></CardBody>
            </Card>
            {hoveredIndex === index && productStages[index] && (
            <div className="tooltip-or-modal">
              <Pie data={dataObjects(productStages[index])} options={PieOptions}/>
            </div>
          )}
            
          </ListGroupItem>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("../assets/img/blob.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                Discover the carbon footprint of your plate – because every bite counts! 🌍 <br />
                  {/* <span className="text-white">secured</span> */}
                </h1>
                <p className="text-white mb-3">
                Track the CO2 units in your food and tread lightly on the planet
                </p>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  height="5rem"
                  className="img-fluid"
                  src={require("../assets/img/plants.png")}
                />
              </Col>
            </Row>
            <Row>
              <Container>
                <Row className="justify-content-between">
                  <Col>
                    <Card>
                      <CardBody style={{background: "#212124"}}>
                        <Input
                          type="text"
                          placeholder="Get started, track your CO2!"
                          onChange={(e) => setProduct(e.target.value)}
                          required
                        />
                      </CardBody>
                    </Card>
                    <div className="btn-wrapper">
                      <Button
                        // className="btn-simple"
                        color="success"
                        href="#pablo"
                        onClick={handleSubmit}
                      >
                        <i className="tim-icons icon-bulb-63" /> Track
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Row>
          </div>
        </div>
        <div className="section" id="track-section">
          {/* <img
            alt="..."
            className="path"
            width="100%"
            src={require("../assets/img/waves.png")}
          /> */}
          {productStages && Object.keys(productStages).length > 0 ? (
            <Container style={{ marginTop: "2rem"}}>
              <div>
              {/* <Button
                className="btn-simple"
                color="warning"
                size="lg"
              > */}
                <h3 className="text-success text-center">
                Gross CO<sub>2</sub> Emissions: {totalEmissions} CO<sub>2</sub>E
                </h3>
                {/* </Button> */}
                </div>
              <UncontrolledAlert className="alert-with-icon" color="success">
                <span data-notify="icon" className="tim-icons icon-bulb-63" />
                <span>
                  <b>Voila! </b>
                  Here’s the path builded with purpose, the path shaped with
                  traceability for sustainability.
                </span>
              </UncontrolledAlert>
              <canvas ref={chartRef} />
              <h3 className="text-white mb-3"></h3>
              <ListGroup
                horizontal
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  width: "100%",
                  marginBottom: "2rem",
                }}
                className="list-group-scroll"
              >
                <ListGroupItem
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {/* <Card>
                    <CardHeader>
                      <h3>{initialProduct["OutputProducts"]}</h3>
                    </CardHeader>
                    <CardBody>
                      <Card className="text-left card-stats bg-default">
                        <CardBody>
                          <ul>
                            <li>Name: {initialProduct.Name}</li>
                            <li>Desc: {initialProduct.Description}</li>
                            <li>Event: {initialProduct.EventType}</li>
                            <li>Byproducts: {initialProduct.ByProducts}</li>
                          </ul>
                        </CardBody>
                      </Card>
                    </CardBody>
                  </Card> */}
                </ListGroupItem>
                {renderChain()}
              </ListGroup>
            </Container>
          ) : productFound ? (
            <div />
          ) : (
            <h2 className="text-danger text-center">Product not found!</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductTracker;
