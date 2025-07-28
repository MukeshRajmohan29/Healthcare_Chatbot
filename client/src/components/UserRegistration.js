import React, { useState } from 'react';
import { User, Calendar, Calculator } from 'lucide-react';
import { cn } from '../utils/cn';

const UserRegistration = ({ onRegister, healthcareContext, privacyStyle }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 13) {
        newErrors.dateOfBirth = 'You must be at least 13 years old to use this service';
      } else if (age > 120) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const age = calculateAge(formData.dateOfBirth);
      const userDetails = {
        ...formData,
        age,
        fullName: `${formData.firstName} ${formData.lastName}`
      };
      
      await onRegister(userDetails);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Healthcare Chatbot
            </h1>
            <p className="text-gray-600">
              Please provide your information to start your personalized healthcare session
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={cn(
                  "input-field",
                  errors.firstName && "border-red-300 focus:ring-red-500 focus:border-red-500"
                )}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={cn(
                  "input-field",
                  errors.lastName && "border-red-300 focus:ring-red-500 focus:border-red-500"
                )}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={cn(
                    "input-field pr-10",
                    errors.dateOfBirth && "border-red-300 focus:ring-red-500 focus:border-red-500"
                  )}
                  max={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.dateOfBirth && (
                <p className="text-red-600 text-xs mt-1">{errors.dateOfBirth}</p>
              )}
              {formData.dateOfBirth && !errors.dateOfBirth && (
                <p className="text-green-600 text-xs mt-1 flex items-center">
                  <Calculator className="w-3 h-3 mr-1" />
                  Age: {calculateAge(formData.dateOfBirth)} years old
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Session Information</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Healthcare Context:</strong> {healthcareContext}</p>
                <p><strong>Privacy Style:</strong> {privacyStyle}</p>
                <p><strong>Session ID:</strong> Will be generated based on your information</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "btn-primary w-full",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Starting Session...
                </div>
              ) : (
                'Start Healthcare Session'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Your information is used to create a unique session ID and provide personalized care.
              <br />
              All data is encrypted and handled according to our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration; 