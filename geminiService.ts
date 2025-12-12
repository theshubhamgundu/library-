
// Mock service to simulate AI behavior without an API key
// This allows the app to function for UI demonstration purposes without needing a backend or API credentials.

export const identifyBookFromImage = async (base64Image: string): Promise<{ title: string; author: string; genre: string } | null> => {
  console.log("Simulating scan for image...");
  
  // Simulate network delay (2 seconds)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Return a mock result for demonstration
  // Since we aren't using an API key, we return a hardcoded "detected" book.
  return {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy"
  };
};
