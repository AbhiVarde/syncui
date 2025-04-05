import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const [gitHubData, setGitHubData] = useState({
    stars: 0,
    stargazers: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Get basic repo data first
        const repoResponse = await axios.get(
          "https://api.github.com/repos/AbhiVarde/syncui?type=public"
        );

        // Then get stargazers data
        const stargazersResponse = await axios.get(
          "https://api.github.com/repos/AbhiVarde/syncui/stargazers",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
            params: {
              per_page: 100,
            },
          }
        );

        setGitHubData({
          stars: repoResponse.data.stargazers_count,
          stargazers: stargazersResponse.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setGitHubData({
          stars: 0,
          stargazers: [],
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
