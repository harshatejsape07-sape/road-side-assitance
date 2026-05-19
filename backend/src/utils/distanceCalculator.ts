/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Convert degrees to radians
 */
const toRad = (deg: number): number => {
  return (deg * Math.PI) / 180;
};

/**
 * Estimate arrival time based on distance and average speed
 * @param distance - Distance in kilometers
 * @param averageSpeed - Average speed in km/h (default: 40)
 * @returns Estimated time in minutes
 */
export const estimateArrivalTime = (
  distance: number,
  averageSpeed: number = 40
): number => {
  return Math.ceil((distance / averageSpeed) * 60);
};
