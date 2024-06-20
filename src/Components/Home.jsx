import banner1 from '../Resources/banner1.avif'
import banner2 from '../Resources/banner2.avif'
import banner3 from '../Resources/banner3.avif'
import banner4 from '../Resources/banner4.jpg'
function Home() {
  return (
    <div className="container">
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1" aria-current="true"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: "82vh", objectFit: "cover" }}>
            <img src={banner4} alt="Los Angeles" className="d-block w-100" />
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Example headline.</h1>
                <p className="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
                <p><a className="btn btn-lg btn-danger" href="#">Shop Now</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "82vh", objectFit: "cover" }}>
            <img src={banner2} alt="Los Angeles" className="d-block w-100" />
            <div className="container">
              <div className="carousel-caption">
                <h1>Another example headline.</h1>
                <p>Some representative placeholder content for the second slide of the carousel.</p>
                <p><a className="btn btn-lg btn-danger" href="#">Shop Now</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "82vh", objectFit: "cover" }}>
            <img src={banner3} alt="Los Angeles" className="d-block w-100" />
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>Some representative placeholder content for the third slide of this carousel.</p>
                <p><a className="btn btn-lg btn-danger" href="#">Shop Now</a></p>
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