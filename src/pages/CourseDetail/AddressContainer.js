import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import GoogleMap from "src/components/GoogleMap";

const AddressContainer = ({ addresses = [] }) => {
  const [active, setActive] = useState();
  const toggle = (tab) => active !== tab && setActive(tab);
  const [address, setAddress] = useState();
  useEffect(() => {
    if (!!addresses[0]?.longitude) {
      setAddress({
        lng: Number(addresses[0]?.longitude),
        lat: Number(addresses[0]?.latitude)
      });
      setActive(addresses[0]?.id);
    }
  }, [addresses]);

  return (
    <React.Fragment>
      <Nav tabs className="nav-left">
        {addresses?.map(
          (
            {
              id,
              street_address,
              suburb,
              city_name,
              postal_code,
              state,
              country_name,
              longitude,
              latitude
            },
            idx
          ) => (
            <NavItem key={`nav-key-${id}-${idx}`}>
              <a
                onClick={() => {
                  toggle(id);
                  setAddress({ lng: Number(longitude), lat: Number(latitude) });
                }}
                href="#!"
                className={`nav-link ${active === id ? "active" : ""}`}
              >
                {suburb ? suburb : city_name}
              </a>
            </NavItem>
          )
        )}
      </Nav>
      <TabContent className="container p-4 p-sm-0" activeTab="1">
        <TabPane tabId="1">
          <div className="map map-height-one rounded map-gray">
            {!!address?.lat ? (
              <GoogleMap
                addressList={[address]}
                center={!!address ? address : undefined}
              />
            ) : null}
          </div>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default AddressContainer;
