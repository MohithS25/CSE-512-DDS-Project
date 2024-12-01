"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaCaretDown } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(52, 211, 153, 0.8))", // Transparent gradient
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        position: "fixed", // Fixed position
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000", // Ensure it's above other elements
        transition: "background 0.3s ease", // Optional transition for background
      }}
    >
      {/* Left Side - Home */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaHome size={20} color="white" style={{ marginRight: "10px" }} />
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "bold",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#cbd5e1")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
        >
          Home
        </Link>
      </div>

      {/* Right Side - Login/Signup with Dropdown */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Dropdown Container */}
        <div
          style={{
            position: "relative",
            marginRight: "20px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span
            style={{
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaUser size={16} style={{ marginRight: "5px" }} />
            Account
            <FaCaretDown size={12} style={{ marginLeft: "5px" }} />
          </span>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: 0,
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
              }}
            >
              <Link
                href="/signup"
                style={{
                  display: "block",
                  padding: "10px 20px",
                  textDecoration: "none",
                  color: "#3b82f6",
                  fontWeight: "500",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f1f5f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Login
              </Link>
              <Link
                href="/loginPage"
                style={{
                  display: "block",
                  padding: "10px 20px",
                  textDecoration: "none",
                  color: "#3b82f6",
                  fontWeight: "500",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f1f5f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Direct Links */}
        <Link
          href="/signup"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "600",
            marginRight: "20px",
            padding: "10px 15px",
            borderRadius: "5px",
            backgroundColor: "#2563eb",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1e40af")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
        >
          Login
        </Link>

        <Link
          href="/loginPage"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "600",
            padding: "10px 15px",
            borderRadius: "5px",
            backgroundColor: "#10b981",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#047857")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#10b981")
          }
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
