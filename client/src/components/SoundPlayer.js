import React from "react";
import ReactAudioPlayer from "react-audio-player";
const SoundPlayer = ({ playBackUrl }) => {
  return <ReactAudioPlayer src={playBackUrl} controls autoPlay />;
};

export default SoundPlayer;
