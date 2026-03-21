import React, { createContext, useContext, useState, useEffect } from "react";

const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const [gitHubData, setGitHubData] = useState({
    stars: 0,
    stargazers: [],
    loading: true,
    error: null,
  });

  const fetchGitHubData = async () => {
    try {
      const res = await fetch("/api/github-stats");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setGitHubData({
        stars: data.stars,
        stargazers: data.stargazers,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("GitHub API error:", error);
      setGitHubData((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    fetchGitHubData();

    const intervalId = setInterval(() => {
      fetchGitHubData();
    }, 60000);

    return () => clearInterval(intervalId);
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
