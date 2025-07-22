import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../components/GoogleSignInButton";

const CompleteProfilePage = () => {
  const { googleUserData, completeGoogleSignup, loading, clearGoogleData } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  useEffect(() => {
    if (!googleUserData) {
      navigate('/auth');
      return;
    }
    // Don't pre-fill name as per user request - let user choose every field
  }, [googleUserData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await completeGoogleSignup({ name, age, gender, genderPreference });
  };

  const handleTryAnotherEmail = () => {
    clearGoogleData();
    navigate('/auth');
  };

  const handleBackToSignIn = () => {
    clearGoogleData();
    navigate('/auth');
  };

  if (!googleUserData) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8">
          Complete Your Profile
        </h2>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Verified College Email:</p>
              <p className="text-lg font-semibold text-green-600 bg-green-50 px-3 py-2 rounded-md">
                {googleUserData.email}
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
            </div>

            {/* AGE */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div className="mt-1">
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="18"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
            </div>

            {/* GENDER */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Gender
              </label>
              <div className="mt-2 flex gap-2">
                <div className="flex items-center">
                  <input
                    id="male"
                    name="gender"
                    type="checkbox"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="male" className="ml-2 block text-sm text-gray-900">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    name="gender"
                    type="checkbox"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="female" className="ml-2 block text-sm text-gray-900">
                    Female
                  </label>
                </div>
              </div>
            </div>

            {/* GENDER PREFERENCE */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prefer Me
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="prefer-male"
                    name="gender-preference"
                    type="radio"
                    value="male"
                    checked={genderPreference === "male"}
                    onChange={(e) => setGenderPreference(e.target.value)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label htmlFor="prefer-male" className="ml-2 block text-sm text-gray-900">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="prefer-female"
                    name="gender-preference"
                    type="radio"
                    value="female"
                    checked={genderPreference === "female"}
                    onChange={(e) => setGenderPreference(e.target.value)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label htmlFor="prefer-female" className="ml-2 block text-sm text-gray-900">
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="prefer-both"
                    name="gender-preference"
                    type="radio"
                    value="both"
                    checked={genderPreference === "both"}
                    onChange={(e) => setGenderPreference(e.target.value)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label htmlFor="prefer-both" className="ml-2 block text-sm text-gray-900">
                    Both
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                }`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Complete Profile"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Want to use a different email?</span>
              </div>
            </div>

            <div className="mt-4">
              <GoogleSignInButton />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?
              </p>
              <button
                onClick={handleBackToSignIn}
                className="mt-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-300"
              >
                Sign in to your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;