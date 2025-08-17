import { useLocation, useNavigate } from "react-router-dom";

import type { FC } from "react";

const Navigator: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check current path
  const isHomePage = location.pathname === "/";
  const isWishlistPage = location.pathname === "/wishlist";

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
      {/* Show back button when NOT on home page */}
      {!isHomePage && (
        <button className="back-btn" onClick={() => navigate("/")}>
          &#171; Go Back Home
        </button>
      )}

      {/* Show wishlist button when NOT on wishlist page */}
      {!isWishlistPage && (
        <button className="wishlist-btn" onClick={() => navigate("/wishlist")}>
          Go to Wishlist
        </button>
      )}
    </div>
  );
};

export default Navigator;
