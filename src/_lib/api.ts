export const handleRequest = async (url: string, method: string, body?: object) => {
  try {
      const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
          console.error(`Request failed: ${res.status} ${res.statusText}`);
          return { error: true, message: "Request failed" }; 
      }

      return await res.json();
  } catch (error) {
      console.error("Fetch error:", error);
      return { error: true, message: "Network error" }; 
  }
};
