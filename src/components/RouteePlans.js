import React, { useState, useMemo } from 'react';
import { ChevronDown, MapPin, Calendar, Truck, Route, ArrowRight } from 'lucide-react';

const RouteePlans = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  // Sample data based on the provided JSON
  const deliveryData = [
    {
      "from": "Enugu, Enugu",
      "to": "Ibadan, Oyo",
      "state": "Oyo",
      "vehicle_tag": "TRK-3012-Y",
      "createdAt": "2025-06-12",
      "acceptedDate": "2025-06-15"
    },
    {
      "from": "Ilorin, Kwara",
      "to": "Owerri, Imo",
      "state": "Imo",
      "vehicle_tag": "TRK-7743-K",
      "createdAt": "2025-06-18",
      "acceptedDate": "2025-06-21"
    },
    {
      "from": "Jos, Plateau",
      "to": "Lokoja, Kogi",
      "state": "Kogi",
      "vehicle_tag": "TRK-0091-A",
      "createdAt": "2025-07-01",
      "acceptedDate": "2025-07-04"
    },
    {
      "from": "Makurdi, Benue",
      "to": "Gusau, Zamfara",
      "state": "Zamfara",
      "vehicle_tag": "TRK-1238-P",
      "createdAt": "2025-07-05",
      "acceptedDate": "2025-07-08"
    },
    {
      "from": "Calabar, Cross River",
      "to": "Ado-Ekiti, Ekiti",
      "state": "Ekiti",
      "vehicle_tag": "TRK-6654-T",
      "createdAt": "2025-06-23",
      "acceptedDate": "2025-06-26"
    },
    {
      "from": "Yola, Adamawa",
      "to": "Maiduguri, Borno",
      "state": "Borno",
      "vehicle_tag": "TRK-8812-L",
      "createdAt": "2025-06-15",
      "acceptedDate": "2025-06-18"
    },
    {
      "from": "Uyo, Akwa Ibom",
      "to": "Awka, Anambra",
      "state": "Anambra",
      "vehicle_tag": "TRK-4463-E",
      "createdAt": "2025-07-06",
      "acceptedDate": "2025-07-09"
    },
    {
      "from": "Bauchi, Bauchi",
      "to": "Katsina, Katsina",
      "state": "Katsina",
      "vehicle_tag": "TRK-2847-Q",
      "createdAt": "2025-06-29",
      "acceptedDate": "2025-07-01"
    },
    {
      "from": "Akure, Ondo",
      "to": "Birnin Kebbi, Kebbi",
      "state": "Kebbi",
      "vehicle_tag": "TRK-9384-J",
      "createdAt": "2025-07-10",
      "acceptedDate": "2025-07-13"
    },
    {
      "from": "Damaturu, Yobe",
      "to": "Ikeja, Lagos",
      "state": "Lagos",
      "vehicle_tag": "TRK-4472-C",
      "createdAt": "2025-07-02",
      "acceptedDate": "2025-07-04"
    }
  ];

  // Get unique states
  const uniqueStates = useMemo(() => {
    return [...new Set(deliveryData.map(item => item.state))].sort();
  }, []);

  // Get available dates for selected state
  const availableDates = useMemo(() => {
    if (!selectedState) return [];
    return [...new Set(deliveryData
      .filter(item => item.state === selectedState)
      .map(item => item.acceptedDate)
    )].sort();
  }, [selectedState]);

  // Get available vehicles for selected state and date
  const availableVehicles = useMemo(() => {
    if (!selectedState || !selectedDate) return [];
    return deliveryData
      .filter(item => item.state === selectedState && item.acceptedDate === selectedDate)
      .map(item => ({
        tag: item.vehicle_tag,
        from: item.from,
        to: item.to
      }));
  }, [selectedState, selectedDate]);

  // Get route plan for selected criteria
  const routePlan = useMemo(() => {
    if (!selectedState || !selectedDate || !selectedVehicle) return null;
    
    const selectedDelivery = deliveryData.find(item => 
      item.state === selectedState && 
      item.acceptedDate === selectedDate && 
      item.vehicle_tag === selectedVehicle
    );
    
    if (!selectedDelivery) return null;

    // Simplified route plan - just origin and destination
    return {
      vehicleTag: selectedVehicle,
      date: selectedDate,
      state: selectedState,
      totalDistance: "450 km",
      route: {
        from: selectedDelivery.from,
        to: selectedDelivery.to
      }
    };
  }, [selectedState, selectedDate, selectedVehicle]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 bg-ams-gray-dark min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text mb-1">Route Plans</h1>
        <p className="text-text-light text-sm">Optimized Route Plans</p>
      </div>

      {/* Compact Filter Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium text-text">
            <Route className="w-4 h-4 text-primary" />
            Route Filters:
          </div>
          
          {/* State Selection */}
          <div className="flex-1 min-w-48">
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDate('');
                setSelectedVehicle('');
              }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select State...</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div className="flex-1 min-w-48">
            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedVehicle('');
              }}
              disabled={!selectedState}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Date...</option>
              {availableDates.map(date => (
                <option key={date} value={date}>{formatDate(date)}</option>
              ))}
            </select>
          </div>

          {/* Vehicle Selection */}
          <div className="flex-1 min-w-64">
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              disabled={!selectedDate}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Vehicle...</option>
              {availableVehicles.map(vehicle => (
                <option key={vehicle.tag} value={vehicle.tag}>
                  {vehicle.tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Compact Selection Summary */}
        {(selectedState || selectedDate || selectedVehicle) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4 text-xs text-text-light flex-wrap">
              {selectedState && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedState}
                </span>
              )}
              {selectedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(selectedDate)}
                </span>
              )}
              {selectedVehicle && (
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  {selectedVehicle}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Route Plan Display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {!routePlan ? (
          <div className="p-8 text-center">
            <Route className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-text mb-1">No Route Plan Selected</h3>
            <p className="text-text-light text-sm">
              Select state, date, and vehicle to view the route plan.
            </p>
          </div>
        ) : (
          <div>
            {/* Route Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-text">
                    {routePlan.vehicleTag}
                  </h2>
                  <p className="text-text-light text-sm">
                    {formatDate(routePlan.date)} • {routePlan.totalDistance}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-light">Destination</div>
                  <div className="font-semibold text-text">{routePlan.state}</div>
                </div>
              </div>
            </div>

            {/* Route Display */}
            <div className="p-4">
              <div className="flex items-center justify-between bg-primary-bg rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-text text-sm">From</div>
                    <div className="font-bold text-text">{routePlan.route.from}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4">
                  <div className="h-px bg-primary flex-1 w-12"></div>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <div className="h-px bg-primary flex-1 w-12"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-text text-sm text-right">To</div>
                    <div className="font-bold text-text text-right">{routePlan.route.to}</div>
                  </div>
                  <div className="w-8 h-8 bg-ams-orange rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Route Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-text">{routePlan.totalDistance}</div>
                  <div className="text-xs text-text-light">Distance</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-text">1</div>
                  <div className="text-xs text-text-light">Route</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-text">{routePlan.vehicleTag}</div>
                  <div className="text-xs text-text-light">Vehicle</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteePlans;