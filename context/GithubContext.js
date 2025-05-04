import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";

const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const [gitHubData, setGitHubData] = useState({
    stars: 0,
    stargazers: [],
    loading: true,
    error: null,
  });

  const isInitialLoad = useRef(true);
  const previousStargazersRef = useRef([]);

  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const fetchGitHubData = async () => {
    try {
      const headers = {
        Accept: "application/vnd.github.v3+json",
      };

      if (GITHUB_TOKEN) {
        headers.Authorization = `token ${GITHUB_TOKEN}`;
      }

      const repoResponse = await axios.get(
        "https://api.github.com/repos/AbhiVarde/syncui",
        { headers }
      );

      const stargazersResponse = await axios.get(
        "https://api.github.com/repos/AbhiVarde/syncui/stargazers",
        {
          headers,
          params: {
            per_page: 100,
          },
        }
      );

      const newStargazers = stargazersResponse.data;
      const newStarsCount = repoResponse.data.stargazers_count;

      if (isInitialLoad.current) {
        setGitHubData({
          stars: newStarsCount,
          stargazers: newStargazers,
          loading: false,
          error: null,
        });
        isInitialLoad.current = false;
        previousStargazersRef.current = newStargazers;
      } else {
        if (newStarsCount !== gitHubData.stars) {
          setGitHubData({
            stars: newStarsCount,
            stargazers: newStargazers,
            loading: false,
            error: null,
          });
          previousStargazersRef.current = newStargazers;
        }
      }

      if (process.env.NODE_ENV === "development") {
        const rateLimit = repoResponse.headers["x-ratelimit-remaining"];
        console.log(`GitHub API rate limit remaining: ${rateLimit}`);
      }
    } catch (error) {
      console.error("GitHub API error:", error);

      setGitHubData((prevData) => ({
        ...prevData,
        stars: prevData.stars || 0,
        loading: false,
        error: error.response?.data?.message || "Failed to fetch GitHub data",
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
