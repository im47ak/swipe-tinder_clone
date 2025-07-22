import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set, get) => ({
  messages: [],
  loading: true,
  unreadCounts: {},
  currentChatUser: null, // Track which chat is currently open

  sendMessage: async (receiverId, content) => {
    try {
      // mockup a message, show it in the chat immediately
      set((state) => ({
        messages: [
          ...state.messages,
          {
            _id: Date.now(),
            sender: useAuthStore.getState().authUser._id,
            content,
          },
        ],
      }));
      const res = await axiosInstance.post("/messages/send", {
        receiverId,
        content,
      });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  getMessages: async (userId) => {
    try {
      set({ loading: true, currentChatUser: userId });
      const res = await axiosInstance.get(`/messages/conversation/${userId}`);
      set({ messages: res.data.messages });
      
      // Clear unread count for this user when opening conversation
      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [userId]: 0
        }
      }));
    } catch (error) {
      console.error("Error loading messages:", error);
      set({ messages: [] });
    } finally {
      set({ loading: false });
    }
  },

  getUnreadCounts: async () => {
    try {
      const res = await axiosInstance.get("/messages/unread-counts");
      const unreadCountsMap = {};
      res.data.unreadCounts.forEach((item) => {
        unreadCountsMap[item._id] = item.count;
      });
      set({ unreadCounts: unreadCountsMap });
    } catch (error) {
      console.error("Error getting unread counts:", error);
      set({ unreadCounts: {} });
    }
  },

  subscribeToMessages: () => {
    const socket = getSocket();
    if (socket) {
      socket.on("newMessage", ({ message }) => {
        const currentUserId = useAuthStore.getState().authUser?._id;
        const { currentChatUser } = get();
        
        set((state) => ({ messages: [...state.messages, message] }));
        
        // Update unread counts in real-time only if user is not currently viewing this chat
        if (message.receiver === currentUserId && message.sender !== currentChatUser) {
          set((state) => ({
            unreadCounts: {
              ...state.unreadCounts,
              [message.sender]: (state.unreadCounts[message.sender] || 0) + 1
            }
          }));
        }
      });
    }
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    if (socket) {
      socket.off("newMessage");
    }
  },

  clearCurrentChat: () => {
    set({ currentChatUser: null, messages: [] });
  },
}));
