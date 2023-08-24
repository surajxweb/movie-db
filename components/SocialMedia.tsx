"use client";

import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import styles from "./SocialMedia.module.css";

interface SocialMediaProps {
  socialID: {
    instagram_id: string;
    twitter_id: string;
  };
}

const iframeStyle = {
  width: "500px",
  height: "380px",
  borderRadius: "15px", // Adjust the value as needed
};

const SocialMedia: React.FC<SocialMediaProps> = ({ socialID }) => {
  return (
    <div className={styles.container}>
      {socialID.instagram_id?.length > 0 && (
        <div className={styles.instagram}>
          <iframe
            style={iframeStyle}
            width='350'
            height='380'
            src={`https://www.instagram.com/${socialID.instagram_id}/embed/`}
            frameBorder={0}
          ></iframe>
        </div>
      )}
      {socialID.twitter_id?.length > 0 && (
        <div className={styles.twitter}>
          <TwitterTimelineEmbed
            sourceType='profile'
            screenName={socialID.twitter_id}
            options={{ height: 380 }}
          />
        </div>
      )}
      {!socialID.twitter_id &&
        !socialID.instagram_id &&
        "Social Media not available."}
    </div>
  );
};

export default SocialMedia;
