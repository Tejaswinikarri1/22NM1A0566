import axios from "axios";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("📩 Sending request to TinyURL for:", inputValue);

      const res = await axios.get(
        `https://tinyurl.com/api-create.php?url=${inputValue}`
      );

      console.log("✅ TinyURL response:", res.data);
      setShortenLink(res.data); 
      setError(false);
    } catch (err) {
      console.error("❌ API error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }

  if (error) {
    return <p className="noData">⚠️ Something went wrong</p>;
  }

  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;






