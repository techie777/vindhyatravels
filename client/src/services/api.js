import axios from 'axios';

// Base Axios instance
const API = axios.create({
  baseURL: '/api',
});

// Attach JWT token to protected requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Currency Rates & Helpers
export const CURRENCY_RATES = {
  INR: { symbol: '₹', rate: 1, code: 'INR' },
  USD: { symbol: '$', rate: 0.012, code: 'USD' },
  EUR: { symbol: '€', rate: 0.011, code: 'EUR' }
};

export const formatPrice = (priceInINR, currencyCode = 'INR') => {
  const curr = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.INR;
  const converted = priceInINR * curr.rate;
  
  if (currencyCode === 'INR') {
    return `${curr.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${curr.symbol}${Math.round(converted).toLocaleString('en-US')}`;
};

// Destination Endpoints
export const fetchDestinations = (category = '', search = '') => 
  API.get(`/destinations?category=${category}&search=${search}`);

export const fetchDestinationById = (id) => 
  API.get(`/destinations/${id}`);

// Vehicle Fleet Endpoints
export const fetchVehicles = (category = '', search = '') => 
  API.get(`/vehicles?category=${category}&search=${search}`);

export const createVehicle = (vehicleData) => 
  API.post('/vehicles', vehicleData);

export const updateVehicle = (id, vehicleData) => 
  API.put(`/vehicles/${id}`, vehicleData);

export const deleteVehicle = (id) => 
  API.delete(`/vehicles/${id}`);

// Hero Settings Control Endpoints (Admin Image & Title Upload)
export const fetchHeroSettings = () => 
  API.get('/vehicles/hero/settings');

export const updateHeroSettings = (heroData) => 
  API.put('/vehicles/hero/settings', heroData);

// Enquiry & Review Endpoints
export const submitEnquiry = (enquiryData) => 
  API.post('/enquiries', enquiryData);

export const fetchPublicReviews = () => 
  API.get('/reviews');

export const submitReview = (reviewData) => 
  API.post('/reviews', reviewData);

// Admin Endpoints
export const adminLogin = (credentials) => 
  API.post('/auth/login', credentials);

export const createDestination = (data) => 
  API.post('/destinations', data);

export const updateDestination = (id, data) => 
  API.put(`/destinations/${id}`, data);

export const deleteDestination = (id) => 
  API.delete(`/destinations/${id}`);

export const fetchAdminEnquiries = () => 
  API.get('/enquiries');

export const updateEnquiryStatus = (id, status) => 
  API.put(`/enquiries/${id}/status`, { status });

export const deleteEnquiry = (id) => 
  API.delete(`/enquiries/${id}`);

export const fetchAdminReviews = () => 
  API.get('/reviews/admin');

export const toggleApproveReview = (id, approved) => 
  API.put(`/reviews/${id}/approve`, { approved });

export const deleteReview = (id) => 
  API.delete(`/reviews/${id}`);

export default API;
