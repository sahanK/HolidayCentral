exports.flightsCsvColumns = [
  'arrival_airport',
  'arrival_city',
  'arrival_country',
  'arrival_iata',
  'departure_airport',
  'departure_city',
  'departure_country',
  'departure_iata',
  'arrival_date',
  'departure_date',
  'cabin_class',
  'airline_name',
  'airline_country',
  'airline_iata',
  'ticket_price_usd',
  'duration'
];

exports.hotelsCsvColumns = [
  'hotel_name',
  'destination_country',
  'destination_city',
  'star_rating',
  'price_per_night',
  'facilities',
  'available_room_types',
  'board_basis'
];

exports.packagesCsvColumns = [
  'package_name',
  'hotel_name',
  'destination_country',
  'destination_city',
  'duration',
  'num_travelers',
  'specialty',
  'price_usd',
  'rating'
];

exports.hotelsCsvColumnsFacilitiesIndex = 5;
exports.hotelsCsvColumnsRoomTypesIndex = 6;
exports.hotelsCsvColumnsBoardBasisIndex = 7;