import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddLocation.css";

const AddLocation = () => {
  const navigate = useNavigate();
  const [newLocation, setNewLocation] = useState({
    name: "",
    desc: "",
    lat: "",
    lng: "",
  });

  const handleAddLocation = () => {
    if (
      newLocation.name &&
      newLocation.desc &&
      !isNaN(newLocation.lat) &&
      !isNaN(newLocation.lng)
    ) {
      const storedLocations =
        JSON.parse(localStorage.getItem("locations")) || [];
      const newLoc = {
        id: storedLocations.length + 1,
        name: newLocation.name,
        desc: newLocation.desc,
        position: [parseFloat(newLocation.lat), parseFloat(newLocation.lng)],
      };

      const updatedLocations = [...storedLocations, newLoc];
      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      setNewLocation({ name: "", desc: "", lat: "", lng: "" });

      alert("Lokasi berhasil ditambahkan!");
      navigate("/");
    } else {
      alert("Masukkan data lokasi yang valid!");
    }
  };

  return (
    <div className="add-location-container">
      <h2>Tambah Lokasi Baru</h2>
      <input
        type="text"
        placeholder="Nama Lokasi"
        value={newLocation.name}
        onChange={(e) =>
          setNewLocation({ ...newLocation, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Deskripsi"
        value={newLocation.desc}
        onChange={(e) =>
          setNewLocation({ ...newLocation, desc: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Latitude"
        value={newLocation.lat}
        onChange={(e) =>
          setNewLocation({ ...newLocation, lat: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Longitude"
        value={newLocation.lng}
        onChange={(e) =>
          setNewLocation({ ...newLocation, lng: e.target.value })
        }
      />
      <button onClick={handleAddLocation}>Tambahkan</button>
      <button onClick={() => navigate("/")}>Kembali</button>
    </div>
  );
};

export default AddLocation;
