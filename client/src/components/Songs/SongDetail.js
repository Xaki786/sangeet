import React, { Fragment } from "react";
import { CardHeader } from "@material-ui/core";
const SongDetail = ({ name, duration }) => {
  return (
    <Fragment>
      <CardHeader title={name} subheader={`Duration: ${duration}`} />
    </Fragment>
  );
};

export default SongDetail;
