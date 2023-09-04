import React, { useContext, useState } from "react";
import { PlaceContext } from "../../Context/PlaceContext";
import axiosConnect from "../../Token/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [placeSearch, setPlaceSearch] = useState("");
  const [hotelSearch, setHotelSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { setPlaces, setLoading } = useContext(PlaceContext);

  const searchPlace = async (e) => {
    clearTimeout(searchTimeout);
    setPlaceSearch(e.target.value);

    if (placeSearch.trimStart() !== "") {
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosConnect.get(
            `/places/search/${placeSearch.trimStart()}`
          );
          setPlaces(data);
          setLoading(false);
        }, 500)
      );
    }
  };

  const searchHotel = async (e) => {
    clearTimeout(searchTimeout);
    setHotelSearch(e.target.value);

    if (hotelSearch.trimStart() !== "") {
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosConnect.get(
            `/places/searchhotel/${hotelSearch.trimStart()}`
          );
          setPlaces(data);
          setLoading(false);
        }, 500)
      );
    }
  };

  return (
    <div>
      <div className="">
        <div className="header-nav App shadow">
          <input
            type="text"
            className="form-control header-inp-bar"
            id="username"
            placeholder="Anywhere"
            value={placeSearch}
            onChange={(e) => searchPlace(e)}
          />
          <div className="vr vr-line ver-line"></div>
          <input
            type="text"
            className="form-control header-inp-bar"
            id="username"
            placeholder="Any Hotel"
            value={hotelSearch}
            onChange={(e) => searchHotel(e)}
          />
          {/* <label style={{ padding: "10px" }}>Any week</label> */}
          <div className="vr vr-line ver-line"></div>
          <label>Add Guests</label>
          <button className="btn-search" onClick={searchPlace}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
