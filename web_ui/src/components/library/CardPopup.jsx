import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextTruncate from "react-text-truncate";

import RottenTomatoeLogo from "../../assets/rotten_tomatoe.svg";
import IMDbLogo from "../../assets/imdb.png";

import "./CardPopup.scss";

class CardPopup extends Component {
    constructor(props) {
        super(props);

        this.popup = React.createRef();

        this.state = {
            styles: {
                card: {
                    left: "50%",
                    right: "unset"
                },
                clipped: {
                    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 5% 100%)",
                    borderRadius: "0 10px 10px 0"
                },
                header: {
                    justifySelf: "end",
                    transform: "translateX(-40px)"
                },
                content: {
                    margin: "0 40px 0 70px"
                }
            }
        };
    }

    componentDidMount() {
        const { x, width } = this.popup.current.getBoundingClientRect();
        const overflowing = (x + width > window.innerWidth - 5);

        this.setState({
            accent: this.props.accent
        });

        if (!overflowing) return;

        this.setState({
            styles: {
                card: {
                    left: "unset",
                    right: "50%"
                },
                clipped: {
                    clipPath: "polygon(0 0, 90% 0, 95% 100%, 0% 100%)",
                    borderRadius: "10px 0 0 10px"
                },
                header: {
                    justifySelf: "start",
                    transform: "translateX(40px)"
                },
                content: {
                    margin: "0 70px 0 40px"
                }
            }
        });

    }

    static getDerivedStateFromProps(nextProps) {
        return {
            accent: nextProps.accent,
        };
    }

    render() {
        const {
            name,
            rating,
            description,
            year,
            play
        } = this.props.data;

        const { accent } = this.props;

        const accentCSS = {
            background: accent.background,
            color: accent.text
        };

        return (
            <div className="card-popup" ref={this.popup} style={this.state.styles.card}>
                <div className="clipped" style={this.state.styles.clipped}></div>
                <section className="header" style={this.state.styles.header}>
                    <h1>{name}</h1>
                    <div className="rating">
                        <img alt="imdb" src={IMDbLogo}></img><p>{rating}/10</p>
                        <img alt="rotten tomatoes" src={RottenTomatoeLogo}></img><p>0%</p>
                    </div>
                </section>
                <section className="content" style={this.state.styles.content}>
                    <section className="description">
                        <h4>Description</h4>
                        <TextTruncate
                            text={description}
                            line={3}
                            textElement="p"
                            truncateText="..."
                        />
                    </section>
                    <section className="info">
                        <div className="tags">
                            <p style={accentCSS}>GENRE</p>
                            <p style={accentCSS}>{year}</p>
                        </div>
                        {/* <a href={trailer}><FontAwesomeIcon icon="play-circle"/>WATCH TRAILER</a> */}
                    </section>
                    <section className="separator"></section>
                    <section className="footer">
                        <div className="length">
                            <p>00:00:00</p>
                            <p>HH MM SS</p>
                        </div>
                        <a href={play} style={accentCSS}>PLAY<FontAwesomeIcon icon="arrow-alt-circle-right"/></a>
                    </section>
                </section>

            </div>
        );
    }
}

export default CardPopup;