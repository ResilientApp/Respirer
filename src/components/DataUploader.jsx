import React, { useContext, useEffect, useState } from "react";
import * as xlsx from "xlsx";
import {
  Input,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Container,
} from "reactstrap";
import { POST_TRANSACTION, FETCH_TRANSACTION } from "../utils/ResDbApis";
import { sendRequest } from "../utils/ResDbClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DataUploader() {
  const {currentUser, userKeys} = useContext(AuthContext);
  const navigate = useNavigate();

  const ALLOWED_FILE_TYPES = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];

  //TODO: Remove encryption keys from code
  const metadata = {
    signerPublicKey: "MtYFdjE1FYj4Wypf5r4FPNUvbdH3S8k41BEKF2n8BGD",
    signerPrivateKey: "6ETApZwk2HSDG53b4GPSphxSnmdDh77wyCddHEMm3WE1",
    recipientPublicKey: process.env.REACT_APP_ADMIN_PUBLIC_KEY,
  };

  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    console.log("Fetching inventory...");
    const query = FETCH_TRANSACTION(
      metadata.signerPublicKey,
      metadata.recipientPublicKey
    );
    try {
      await sendRequest(query).then((res) => {
        if (res && res.data && res.data.getFilteredTransactions) {
          let json = [];
          res.data.getFilteredTransactions.forEach((item) => {
            json.push(JSON.parse(item.asset.replace(/'/g, '"')).data);
          });
          setInventory(json);
        } else {
          // fetchInventory(); // BUG: Temporary fix for the intermittent graphql error
        }
      });
    } catch (error) {
      console.log("Fetch Inventory error ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document
      .getElementById("inventory-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const readExcel = async (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile && ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      document
      .getElementById("inventory-section")
      .scrollIntoView({ behavior: "smooth" });
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "json" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(metadata);
        json.forEach((dataItem) => {
          // dataItem["Timestamp"] = new Date(dataItem["Timestamp"]);
          sendRequest(
            POST_TRANSACTION(metadata, JSON.stringify(dataItem))
          ).then((res) => {
            console.log("Inventory added successfully ", res);
          });
        });
        fetchInventory();
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    } else {
      setError("Please select only Excel files");
    }
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
                <h1 
                className="text-white"
                style={{fontWeight:"600"}}>
                Empower your insights, load your data with us!  
                </h1>
                <p className="text-white mb-3">
                Unleash the potential of your information and embark on a data-driven journey like never before. 🚀 
                </p>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("../assets/img/globe-hands.png")}
                />
              </Col>
            </Row>
            <Row>
              <Container>
                <Row className="justify-content-between">
                  <Col>
                    <Card style={{background: "#212124"}}>
                      <CardBody>
                        <Input style={{borderColor:"#FFFFFF", background:"#212124", color:"#FFFFFF"}}
                          type="file"
                          placeholder="Upload here!"
                          onChange={readExcel}
                          disabled={currentUser==null}
                        />
                      {error && (
                        <h4 className="text-danger text-center">
                          {error}
                          </h4>
                      )}
                      </CardBody>
                    </Card>
                    <div className="btn-wrapper">
                      {
                        currentUser==null?
                        <Button
                        className="btn-wrapper"
                        color="success"
                        href="#pablo"
                        onClick={()=>navigate("/login")}
                      >
                        <i className="tim-icons icon-badge" /> Please log in to view/upload your data
                      </Button>:
                        <Button
                        // className="btn-simple"
                        color="success"
                        href="#pablo"
                        onClick={handleSubmit}
                      >
                        <i className="tim-icons icon-notes" /> Display My Data
                      </Button>

                      }
                    </div>
                  </Col>
                </Row>
              </Container>
            </Row>
          </div>
        </div>
        <div className="section" id="inventory-section" style={{marginLeft: '-10rem'}}>
          {/* <img
            alt="..."
            className="path"
            width="100%"
            src={require("../assets/img/waves.png")}
          /> */}
          <Container style={{ marginTop: "2rem" }}>
            {inventory.length > 0 ? (
              <table className="tablesorter" >
                <thead className="text-white">
                  <tr>
                    {Object.keys(inventory[0]).map((key) => (
                      <th className="header text-center" style={{padding: '1rem'}}>{key}</th>
                    ))}
                  </tr>
                  
                </thead>
                <tbody>
                  {inventory.map((item, index) => (
                    <tr>
                      {Object.keys(item).map((key) => (
                        <td className="text-center" style={{padding: '1rem', color: "white"}}>{item[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-100 text-center mt-2 text-white">No inventory found!</div>
            )}
          </Container>
        </div>
      </div>
    </>
  );
}
export default DataUploader;
