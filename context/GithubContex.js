import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const [gitHubData, setGitHubData] = useState({
    stars: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.github.com/repos/AbhiVarde/syncui?type=public"
        );
        setGitHubData({
          stars: data.stargazers_count,
          loading: false,
          error: null,
        });
      } catch (error) {
        setGitHubData({
          stars: 0,
          loading: false,
          error: error.response?.data?.message || "Failed to fetch GitHub data",
        });
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <GitHubContext.Provider value={gitHubData}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error("useGitHub must be used within a GitHubProvider");
  }
  return context;
}
