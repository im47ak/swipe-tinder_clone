import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set, get) => ({
	authUser: null,
	checkingAuth: true,
	loading: false,
	googleUserData: null, // Store Google user data for profile completion

	signup: async (signupData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/signup", signupData);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);

			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	login: async (loginData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/login", loginData);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);
			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	logout: async () => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/logout");
			disconnectSocket();
			if (res.status === 200) {
				set({ 
					authUser: null, 
					googleUserData: null,
					loading: false 
				});
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
			set({ loading: false });
		}
	},
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/me");
			initializeSocket(res.data.user._id);
			set({ authUser: res.data.user });
		} catch (error) {
			set({ authUser: null });
			console.error("Auth check error:", error);
		} finally {
			set({ checkingAuth: false });
		}
	},

	googleAuth: async (accessToken) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/google", { access_token: accessToken });
			
			if (res.data.newUser) {
				// New user - store Google data for profile completion
				set({ googleUserData: res.data.googleUserData });
				toast.success(res.data.message || "Please complete your profile");
				return "complete-profile"; // Signal to show profile completion
			} else {
				// Existing user - log them in
				set({ authUser: res.data.user });
				initializeSocket(res.data.user._id);
				toast.success(res.data.message || "Login successful");
				return "login-success";
			}
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Google authentication failed";
			toast.error(errorMessage);
			return "error";
		} finally {
			set({ loading: false });
		}
	},

	completeGoogleSignup: async (profileData) => {
		try {
			set({ loading: true });
			const googleData = get().googleUserData;
			
			const completeData = {
				...profileData,
				email: googleData.email
			};
			
			const res = await axiosInstance.post("/auth/google/complete", completeData);
			set({ authUser: res.data.user, googleUserData: null });
			initializeSocket(res.data.user._id);
			toast.success(res.data.message || "Account created successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},

	clearGoogleData: () => set({ googleUserData: null }),

	setAuthUser: (user) => set({ authUser: user }),
}));