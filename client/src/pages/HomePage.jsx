import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown } from "lucide-react";
import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const {
    isLoadingUserProfiles,
    getUserProfiles,
    userProfiles,
    subscribeToNewMatches,
    unsubscribeFromNewMatches,
  } = useMatchStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  useEffect(() => {
    authUser && subscribeToNewMatches();

    return () => {
      unsubscribeFromNewMatches();
    };
  }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100
		 overflow-hidden
		"
    >
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          {userProfiles.length > 0 && !isLoadingUserProfiles && (
            <>
              <SwipeArea />
              <SwipeFeedback />
            </>
          )}

          {userProfiles.length === 0 && !isLoadingUserProfiles && (
            <NoMoreProfiles />
          )}

          {isLoadingUserProfiles && <LoadingUI />}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

const NoMoreProfiles = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Frown className="text-pink-400 mb-6" size={80} />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Woah there, speedy fingers!
      </h2>
      <p className="text-xl text-gray-600 mb-2">
        Out of profiles. Maybe lower your standards?
      </p>
      <button
        onClick={handleRefresh}
        className="my-4 px-4 py-2 rounded-md text-white font-medium bg-pink-600 hover:bg-pink-700 transition-colors duration-300"
      >
        Refresh for New Profiles
      </button>
      <p className="text-xl text-gray-600 mt-2">
        If still nothing shows up... Maybe it&apos;s time to touch some grass.
      </p>
    </div>
  );
};

const LoadingUI = () => {
  return (
    <div className="relative w-full max-w-sm h-[28rem]">
      <div className="card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="px-4 pt-4 h-3/4">
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        </div>
        <div className="card-body bg-gradient-to-b from-white to-pink-50 p-4">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};
