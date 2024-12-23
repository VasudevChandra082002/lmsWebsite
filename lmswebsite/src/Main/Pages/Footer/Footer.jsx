import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li><Link to="/Our-Academy">Our Academy</Link> </li>
            <li><Link to="/teacher">Become A Teacher </Link></li>
            <li>Careers</li>
          </ul>
        </div>
        {/* <div className="footer-column">
          <h3>Marketplace</h3>
          <ul>
            <li>Trending</li>
            <li>Best selling</li>
            <li>Latest</li>
          </ul>
        </div> */}
        {/* <div className="footer-column">
          <h3>Magazine</h3>
          <ul>
            <li>Art Skills</li>
            <li>Career</li>
            <li>Inspiration</li>
            <li>News</li>
          </ul>
        </div> */}
        <div className="footer-column newsletter">
          <h3>Contact Us</h3>
          <p>
            Support:  info@thetopperacademy.com
          </p>
        </div>
      </div>
<div>

</div>
      <div className="footer-bottom">
        <h3 style={{ color: "black" }}>Legal Documents</h3>
        <p>
        <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link> ·{" "}
        <Link to="/TermsOfUse" className="footer-link">Terms and Conditions</Link>·{" "}
        {/* <Link to ="#" className="footer-link">Legal Documentation</Link> */}
        <Link to="/RefundCancellationPolicy" className="footer-link">Refund & Cancellation Policy</Link> ·{" "}
        <Link to="/DisclaimerPolicy" className="footer-link">Disclaimer Policy</Link> ·{" "}
        </p>
        <p>
<br />
        <h3 style={{ color: "black" }}>find Us On Social Media</h3>
          <div className="footer-social-icons-new">
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            {/* <a href="#" aria-label="Twitter">
             <FaTwitter />
           </a>
           <a href="#" aria-label="YouTube">
             <FaYoutube />
           </a> */}
          </div>
    <hr />
<h3>The Topper Academy@2024.</h3>
<p>Roy Career Solutions Private Limited, Bengaluru, Karnataka-560018</p>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
