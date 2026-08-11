import { useEffect, useState } from 'react';

const API_URL = "https://randomfox.ca/floof/";

function FoxImage() {
  const [image, setImage] = useState("");
  // Track whether a fetch request is currently in progress
  const [loading, setLoading] = useState(false);

  // Reusable function to fetch a new random fox image
  const fetchFoxImage = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // randomfox.ca returns { image: "<url>", link: "<url>" }
      // so the image URL lives on data.image
      setImage(data.image);
    } catch (error) {
      console.error("Error fetching Fox Image: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoxImage();
  }, []);

  return (
    <div>
      <p>Learn more about us!</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        image && <img src={image} alt="Random Fox" width="400" />
      )}
      <button onClick={fetchFoxImage} disabled={loading}>
        Click For Surprise
      </button>
    </div>
  );
}

export default FoxImage;