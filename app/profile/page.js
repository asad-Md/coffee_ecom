"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    country: '',
    city: '',
    state: '',
    pinCode: '',
    alternateNumber: '',
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchUserDetails();
    }
  }, [status, session]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const userData = await response.json();
      setUser(userData);
      setFormData({
        phone: userData.phone || '',
        address: userData.address || '',
        country: userData.country || '',
        city: userData.city || '',
        state: userData.state || '',
        pinCode: userData.pinCode || '',
        alternateNumber: userData.alternateNumber || '',
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      setMessage({ type: 'error', text: 'Failed to load profile information' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  // Add auto-hide effect for snackbar messages
  useEffect(() => {
    if(message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">Access Denied</h1>
          <p className="text-foreground mb-6">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background p-8 md:p-12">
        <div className="max-w-4xl mx-auto bg-foreground rounded-3xl p-8 shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">Your Profile</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image and Email Section */}
            <div className="flex flex-col items-center md:w-1/3">
              <div className="relative w-32 h-32 mb-4">
                <Image 
                  src={session?.user?.image || "/images/profile.svg"}
                  alt="Profile Image"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-primary mb-2">{user?.name}</h2>
              <p className="text-primary mb-6">{session?.user?.email}</p>
            </div>

            {/* User Details Section */}
            <div className="md:w-2/3">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-background text-foreground"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="alternateNumber" className="block text-sm font-medium text-primary mb-1">Alternate Number (Optional)</label>
                      <input
                        type="tel"
                        id="alternateNumber"
                        name="alternateNumber"
                        value={formData.alternateNumber}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-primary mb-1">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-primary mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-primary mb-1">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-primary mb-1">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label htmlFor="pinCode" className="block text-sm font-medium text-primary mb-1">PIN Code</label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="px-4 py-2 bg-accent text-primary rounded-full hover:opacity-90 transition-colors disabled:opacity-70"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary border-b border-accent pb-2">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-primary/70">Phone Number</p>
                      <p className="text-primary">{user?.phone || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-primary/70">Alternate Number</p>
                      <p className="text-primary">{user?.alternateNumber || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-primary border-b border-accent pb-2 pt-4">Address Information</h3>
                  
                  <div>
                    <p className="text-sm text-primary/70">Address</p>
                    <p className="text-primary">{user?.address || 'Not provided'}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-primary/70">City</p>
                      <p className="text-primary">{user?.city || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-primary/70">State</p>
                      <p className="text-primary">{user?.state || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-primary/70">Country</p>
                      <p className="text-primary">{user?.country || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-primary/70">PIN Code</p>
                      <p className="text-primary">{user?.pinCode || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-accent text-primary rounded-full hover:opacity-90 transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Snackbar */}
      {message.text && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-center ${
          message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message.text}
        </div>
      )}
    </>
  );
}
