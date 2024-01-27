import React, { useState } from "react";
import { Card, CardHeader, Container, Row, Col } from "reactstrap";

function Profile() {
    const [imageUrl, setImageUrl] = useState("peel.png"); 
    const [isHovering, setIsHovering] = useState(false);
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target.result);
        reader.readAsDataURL(file);
      }
    };

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content-center brand">
            <Container>
              <Row>
                <Col>
                  <Card className="card-coin card-plain">
                    <CardHeader>
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        >
                        <img src={require(imageUrl)} alt="Upload" style={{ width: '300px', height: '200px' }} />
                        {isHovering && (
                            <div style={{ position: 'absolute', top: 0, left: 0 }}>
                            <input type="file" onChange={handleImageChange} />
                            </div>
                        )}
                        </div>
                      {/* <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={require("../assets/img/peel.png")}
                      /> */}
                      <i className="tim-icons icon-single-02" /> 
                      <h4 className="title">Foo Bar</h4>
                    </CardHeader>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
