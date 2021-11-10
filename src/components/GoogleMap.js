import React from "react";
import GoogleMapReact from "google-map-react";

import { MapPin } from "react-feather";
const Marker = ({}) => (
  <span
    styel={{
      position: "absolute",
      height: "20px",
      width: "100px",
      left: "-10px",
      top: "-20px"
    }}
  >
    <MapPin />
  </span>
);

/**
 *
 * @param center default center point of map
 * @param zoom default zoom value
 * @param addressList list of markers to show in map
 */
const GoogleMap = ({
  center,
  defaultCenter = { lat: 27.5, lng: 83.45 },
  zoom = 12,
  addressList = []
}) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process?.env?.NEXT_PUBLIC_MAP_API_KEY || ""
      }}
      defaultCenter={defaultCenter}
      defaultZoom={zoom}
      center={center}
      yesIWantToUseGoogleMapApiInternals
      options={{
        panControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true
      }}
    >
      {addressList?.length &&
        addressList?.map((address) => (
          <Marker key={address} lat={address?.lat} lng={address?.lng} />
        ))}
    </GoogleMapReact>
  );
};

export default GoogleMap;
