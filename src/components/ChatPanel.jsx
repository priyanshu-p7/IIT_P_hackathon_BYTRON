import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Filter, Star, ExternalLink } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Custom marker icons
const attractionIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});
const foodIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  iconSize: [30, 30],
});
const stayIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/139/139899.png",
  iconSize: [30, 30],
});
const emergencyIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3176/3176364.png",
  iconSize: [30, 30],
});

const MapPanel = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Attractions", "Food", "Stay", "Emergency"];

  const recommendations = [
    {
      id: 1,
      name: "Cathedral of St. Mary",
      description: "Historic cathedral with stunning architecture and guided tours available.",
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      category: "Attractions",
      position: [48.8566, 2.3522], // Paris
    },
    {
      id: 2,
      name: "Bella Italia Restaurant",
      description: "Authentic Italian cuisine with fresh pasta and wood-fired pizzas.",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      category: "Food",
      position: [48.8584, 2.2945], // near Eiffel Tower
    },
    {
      id: 3,
      name: "Grand Plaza Hotel",
      description: "Luxury accommodation in the heart of the city with spa facilities.",
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      category: "Stay",
      position: [48.8606, 2.3376], // near Louvre
    },
    {
      id: 4,
      name: "Central Park",
      description: "Beautiful green space perfect for walking, picnics, and outdoor activities.",
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      category: "Attractions",
      position: [40.7851, -73.9683], // NYC Central Park
    },
  ];

  const filteredRecommendations =
    activeFilter === "All"
      ? recommendations
      : recommendations.filter((item) => item.category === activeFilter);

  const getIcon = (category) => {
    switch (category) {
      case "Attractions":
        return attractionIcon;
      case "Food":
        return foodIcon;
      case "Stay":
        return stayIcon;
      case "Emergency":
        return emergencyIcon;
      default:
        return attractionIcon;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Filter Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter:
          </h3>
        </div>
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeFilter === filter
                  ? filter === "Emergency"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="h-80 relative">
        <MapContainer
          center={[48.8566, 2.3522]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filteredRecommendations.map((place) => (
            <Marker
              key={place.id}
              position={place.position}
              icon={getIcon(place.category)}
            >
              <Popup>
                <div className="text-sm">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-32 h-20 object-cover rounded mb-2"
                  />
                  <strong>{place.name}</strong>
                  <p>{place.description}</p>
                  <p>⭐ {place.rating}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Recommendations Panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Recommended Places</h3>
          <div className="space-y-4">
            {filteredRecommendations.map((place) => (
              <div
                key={place.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex space-x-4">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {place.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {place.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {place.description}
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                      View More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
