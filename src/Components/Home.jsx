import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container pb-4">
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1" aria-current="true"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ overflow: "hidden" }}>
            <Link to="/products" state="Offers">
              <img src={require("../Resources/banner2_11zon.jpeg")} className="d-block w-100" alt="..." style={{ objectFit: "cover" }} /></Link>
            <div className="container">
              <div className="carousel-caption text-start d-none d-md-block">
                <h1>Example headline.</h1>
                <p className="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
                <Link to="/products" state="Offers" className="btn btn-lg btn-danger">Shop Now</Link>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ overflow: "hidden" }}>
            <Link to="/products" state="Offers">
              <img src={require("../Resources/banner3_11zon.jpeg")} className="d-block w-100" alt="..." style={{ objectFit: "cover" }} /> </Link>
            <div className="container">
              <div className="carousel-caption d-none d-md-block">
                <h1>Another example headline.</h1>
                <p>Some representative placeholder content for the second slide of the carousel.</p>
                <Link to="/products" state="Offers" className="btn btn-lg btn-danger">Shop Now</Link>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ overflow: "hidden" }}>
            <Link to="/products" state="Offers">
              <img src={require("../Resources/banner4_11zon.jpg")} className="d-block w-100" alt="..." style={{ objectFit: "cover" }} /></Link>
            <div className="container">
              <div className="carousel-caption text-end d-none d-md-block">
                <h1>One more for good measure.</h1>
                <p>Some representative placeholder content for the third slide of this carousel.</p>
                <Link to="/products" state="Offers" className="btn btn-lg btn-danger">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );

};
export default Home;