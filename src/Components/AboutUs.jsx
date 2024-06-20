
function AboutUs() {
  return <div className="container aboutUs my-4 p-4" style={{ backgroundColor: "#f2f2f2" }}>
    <h1 className="text-center mb-4">About Us</h1>
    <div className="row row-cols-1 row-cols-sm-3">
      <div className="col mb-4">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">Our Story</h5>
            <p className="card-text">"Our journey began with a passion for creating furniture that not only enhances living spaces but also brings joy to people's lives. Founded in 2010 by furniture enthusiasts John Smith and Lisa Johnson, FurniCo has since grown into a trusted name in the industry, known for our commitment to quality and customer satisfaction."
            </p>
            {/* <a href="#" className="btn btn-danger">Go somewhere</a> */}
          </div>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">Our Values and Commitments</h5>
            <p className="card-text">"We are committed to creating furniture that not only meets the highest standards of quality and design but also upholds our values of sustainability and ethical practices. From sourcing eco-friendly materials to ensuring fair labor practices, we strive to make a positive impact on both our customers and the planet."
            </p>
            {/* <a href="#" className="btn btn-danger">Go somewhere</a> */}
          </div>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">Our ESG Commitment</h5>
            <p className="card-text">"We are committed to Environmental, Social, and Governance (ESG) principles. We prioritize sustainability by sourcing materials responsibly, and investing in energy-efficient technologies. ESG is our guiding philosophy, driving us to create value for all stakeholders while making a positive impact on the world." </p>
            {/* <a href="#" className="btn btn-danger">Go somewhere</a> */}
          </div>
        </div>
      </div>
    </div>
  </div>
};
export default AboutUs;