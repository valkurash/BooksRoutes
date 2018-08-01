import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  VKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  ViberShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  VKIcon,
  TelegramIcon,
  WhatsappIcon,
  ViberIcon
} from "react-share";

export default class ShareButtons extends Component {
  static propTypes = {
    shareUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  };

  render() {
    const { shareUrl, title, cover } = this.props;

    return (
      <div
        className="share-container"
        style={{
          display: "flex",
          position: "fixed",
          bottom: "0",
          right: "20px",
          background: "#fff",
          borderRadius: "4px"
        }}
      >
        <div
          className="share-item"
          style={{ padding: "2px 5px", cursor: "pointer" }}
        >
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div
          className="share-item"
          style={{ padding: "2px 5px", cursor: "pointer" }}
        >
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div
          className="share-item"
          style={{ padding: "2px 5px", cursor: "pointer" }}
        >
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>

        <div
          className="share-item"
          style={{ padding: "2px 5px", cursor: "pointer" }}
        >
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>

        <div
          className="share-item"
          style={{ padding: "2px 5px", cursor: "pointer" }}
        >
          <GooglePlusShareButton url={shareUrl} className="share-button">
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </div>

        <div
          className="share-item"
          style={{ padding: "2px 5px", cursor: "pointer" }}
        >
          <VKShareButton
            url={shareUrl}
            image={cover}
            windowWidth={660}
            windowHeight={460}
            className="share-button"
          >
            <VKIcon size={32} round />
          </VKShareButton>
        </div>
        <div
          className="share-item"
          style={{ padding: "2px 5px", cursor: "pointer" }}
        >
          <ViberShareButton
            url={shareUrl}
            title={title}
            body="body"
            className="share-button"
          >
            <ViberIcon size={32} round />
          </ViberShareButton>
        </div>
      </div>
    );
  }
}
