import { useState, useEffect, useRef } from "react";
import { useFlightContext } from "../../../context/SearchFlights";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../Hooks/useDeBounce";

const FlightSearchForm = () => {
  const { searchFlights, loading, fetchSuggestions } = useFlightContext();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
  });
  const [suggestions, setSuggestions] = useState({
    origin: [],
    destination: [],
  });
  const [activeInput, setActiveInput] = useState(null);

  const debouncedOrigin = useDebounce(formData.origin, 300);
  const debouncedDest = useDebounce(formData.destination, 300);

  useEffect(() => {
    const fetchSuggestionsForActiveInput = async () => {
      if (!activeInput) return;

      const searchTerm =
        activeInput === "origin" ? debouncedOrigin : debouncedDest;
      if (searchTerm.length < 2) {
        setSuggestions((prev) => ({ ...prev, [activeInput]: [] }));
        return;
      }

      try {
        const results = await fetchSuggestions(searchTerm);
        setSuggestions((prev) => ({ ...prev, [activeInput]: results }));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions((prev) => ({ ...prev, [activeInput]: [] }));
      }
    };

    fetchSuggestionsForActiveInput();
  }, [debouncedOrigin, debouncedDest, activeInput, fetchSuggestions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    searchFlights(formData);
    navigate("/flightsResults");
  };

  const handleInputChange = (type, value) => {
    const uppercaseValue = value.toUpperCase().replace(/[^A-Z]/g, "");
    setFormData((prev) => ({ ...prev, [type]: uppercaseValue }));
  };

  const handleSuggestionClick = (type, iataCode) => {
    setFormData((prev) => ({ ...prev, [type]: iataCode }));
    setSuggestions((prev) => ({ ...prev, [type]: [] }));
  };

  const handleFocus = (inputType) => {
    setActiveInput(inputType);
    // Prevent automatic scrolling on mobile
    setTimeout(() => {
      if (formRef.current) {
        // Ensure we stay within our container
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleBlur = () => {
    setTimeout(() => setActiveInput(null), 200);
  };

  const renderSuggestions = (type) => {
    if (!suggestions[type].length || activeInput !== type) return null;

    return (
      <div className="suggestions-container absolute z-10 bg-white shadow-lg rounded mt-1 max-h-60 overflow-y-auto w-full">
        {suggestions[type].map((item, index) => (
          <div
            key={`${type}-${index}`}
            className="suggestion-item px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm"
            onClick={() => handleSuggestionClick(type, item.iataCode)}
          >
            <span className="font-bold text-purple-900">{item.iataCode}</span>
            <span className="ml-2 text-gray-600">
              {item.city}, {item.country}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="flight-search-form bg-white text-black flex flex-col md:flex-row relative"
      style={{
        borderRadius: "20px",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="form-group relative w-full md:flex-1 md:mr-4 mb-4 md:mb-0">
        <label className="block mb-2 font-medium">Origin (IATA code)</label>
        <div className="relative">
          <input
            className="font-Josefin w-full p-2 border-b-2 border-gray-300 outline-none focus:border-purple-700 transition-colors"
            type="text"
            placeholder="LOS"
            value={formData.origin}
            onChange={(e) => handleInputChange("origin", e.target.value)}
            onFocus={() => handleFocus("origin")}
            onBlur={handleBlur}
            required
            pattern="[A-Za-z]{3}"
            title="3-letter IATA code"
            maxLength={3}
          />
          {renderSuggestions("origin")}
        </div>
      </div>

      <div className="form-group relative w-full md:flex-1 md:mr-4 mb-4 md:mb-0">
        <label className="block mb-2 font-medium">
          Destination (IATA code)
        </label>
        <div className="relative">
          <input
            className="font-Josefin w-full p-2 border-b-2 border-gray-300 outline-none focus:border-purple-700 transition-colors"
            type="text"
            placeholder="JFK"
            value={formData.destination}
            onChange={(e) => handleInputChange("destination", e.target.value)}
            onFocus={() => handleFocus("destination")}
            onBlur={handleBlur}
            required
            pattern="[A-Za-z]{3}"
            title="3-letter IATA code"
            maxLength={3}
          />
          {renderSuggestions("destination")}
        </div>
      </div>

      <div className="form-group w-full md:flex-1 md:mr-4 mb-6 md:mb-0">
        <label className="block mb-2 font-medium">Departure Date</label>
        <input
          className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-purple-700 transition-colors"
          type="date"
          value={formData.departureDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, departureDate: e.target.value }))
          }
          onFocus={() => handleFocus("date")}
          onBlur={handleBlur}
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="w-full md:self-end md:w-auto">
        <button
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
          style={{
            backgroundColor: "rgb(105, 16, 87)",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            width: "100%", // Full width on mobile
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
};

export default FlightSearchForm;