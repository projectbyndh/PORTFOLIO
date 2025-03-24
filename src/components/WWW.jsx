import React from "react";
import Slider from "react-slick";
// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WWW() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const companies = [
    { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Apple", logo: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Facebook_New_Logo_%282015%29.svg" },
    { name: "Twitter", logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/Adobe_Corporate_logo.svg" }

  ];
  
  return (
    <div className="slider-container" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", marginTop: "20px" }}>
      <Slider {...settings}>
        {companies.map((company, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            <img 
              src={company.logo} 
              alt={`${company.name} logo`}
              style={{
                maxWidth: "150px",
                maxHeight: "80px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto"
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default WWW;