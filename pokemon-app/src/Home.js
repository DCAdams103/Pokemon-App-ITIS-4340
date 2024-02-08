import React from 'react';
import VerticalCarousel from './VerticalCarousel';
import {config} from 'react-spring';


let slides = [
    {
      key: 1,
      content: "1"
    },
    {
      key: 2,
      content: "2"
    },
    {
      key: 3,
      content: "2"
    },
    {
      key: 4,
      content: "3"
    },
    {
      key: 5,
      content: "4"
    },
    {
      key: 6,
      content: "5"
    },
    {
      key: 7,
      content: "6"
    },
    {
      key: 8,
      content: "7"
    }
  ];

export default class Home extends React.Component {

    state = {
        goToSlide: 0,
        offsetRadius: 0,
        showNavigation: true,
        config: config.gentle
      };
    
    render() {
        return (
            <div
                style={{
                    position: "fixed",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "75vw",
                    height: "75vh",
                    margin: "0 auto",
                    background: "#7FfFbF"
                }}
            >
            <VerticalCarousel
                slides={slides}
                offsetRadius={this.state.offsetRadius}
                showNavigation={this.state.showNavigation}
                animationConfig={this.state.config}
            />
      </div>
        )
    }
}