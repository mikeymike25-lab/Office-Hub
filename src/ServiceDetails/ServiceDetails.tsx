import './ServiceDetails.css';
import { useState } from 'react';

export default function ServiceDetails() {
  const [activeTab, setActiveTab] = useState('offers');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'offers':
        return (
          <div className="tab-pane fade show active" role="tabpanel">
            <h3 className="tab-pane-header">Service Offers</h3>
            <h5>Here are the services we offer:</h5>
            <ul>
              <li>Office Space Rental</li>
              <li>Meeting Room Bookings</li>
              <li>Virtual Office Services</li>
              <li>Mail Handling</li>
              <li>Administrative Support</li>
            </ul>
            <p>Contact us for more details on pricing and availability.</p>
          </div>
        );
      case 'policies':
        return (
          <div className="tab-pane fade show active" role="tabpanel">
            <h3 className="tab-pane-header">Website Policies</h3>
            <h5>Confidentiality Agreements:</h5>
            <ul>
              <li>All members must sign a confidentiality agreement before accessing any proprietary information.</li>
            </ul>
            <h5>Payment Terms:</h5>
            <ul>
              <li>Payments must be made in advance for all services.</li>
              <li>
                We accept credit cards, bank transfers, e-cash, and cash payments. (ie. GCash, MasterCard, BPI, BDO)
              </li>
            </ul>
            <h5>Cancellation and Refund Policies:</h5>
            <ul>
              <li>Cancellations made more than 24 hours before the scheduled time will be eligible for a full refund.</li>
              <li>Cancellations made within 24 hours of the scheduled time will not be eligible for a refund.</li>
            </ul>
          </div>
        );
      case 'guidelines':
        return (
          <div className="tab-pane fade show active" role="tabpanel">
            <h3 className="tab-pane-header">Guidelines</h3>
            <h5>Please follow these guidelines while using our facilities:</h5>
            <ul>
              <li>No smoking policy</li>
              <li>Keep common areas clean</li>
              <li>Book resources in advance</li>
              <li>Report any issues promptly</li>
              <li>Use equipment responsibly</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div className="tab-pane fade show active" role="tabpanel">
            <h3 className="tab-pane-header">Contact Information</h3>
            <h5>Get in touch with us:</h5>
            <p>
              <strong>Address:</strong> Saint Joseph Street, Angeles City, Pampanga 2009 Philippines
            </p>
            <p>
              <strong>Phone:</strong> (02) 8271 1411
            </p>
            <p>
              <strong>Email:</strong> office-hub@gmail.com
            </p>
            <p>
              <strong>Additional:</strong> 4HMP+WV Angeles City, Pampanga, mtlim@gmail.com, 0908-384-1752
            </p>
          </div>
        );
      case 'faq':
        return (
          <div className="tab-pane fade show active" role="tabpanel">
            <h3 className="tab-pane-header">Frequently Asked Questions</h3>
            <p>
              <strong>Q: How do I book a meeting room?</strong>
            </p>
            <p>A: You can book through our online portal or contact our admin team.</p>
            <p>
              <strong>Q: What are the available hours?</strong>
            </p>
            <p>A: We are open from Monday to Saturday, 8 AM-7 PM.</p>
            <p>
              <strong>Q: Is parking available?</strong>
            </p>
            <p>A: Yes, we have on-site parking for members.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Primary Navigation Bar */}
      <nav className="navbar navbar-expand-md">
        <a className="navbar-brand" href="officehub.html">
          <img src="src/assets/Images/officehublogo.png" alt="officehub" />
        </a>
        <a className="navbar-brand ml-auto" href="#">
          <img src="src/assets/Images/userprofile.png" alt="userprofile" id="userprofile" />
        </a>
      </nav>

      {/* Secondary Navigation Bar */}
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <button
          className="navbar-toggler navbar-dark"
          type="button"
          data-toggle="collapse"
          data-target="#main-navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="main-navigation">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="Areas.html">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                SERVICES
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Areas.html">
                CONTACT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                PAGES
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content-background">
        <div className="container mt-5">
          <div className="row">
            {/* Service Details Navigation Tabs */}
            <div className="col-md-3">
              <div className="service-details-nav">
                <div className="nav flex-column nav-pills" role="tablist">
                  <button
                    className={`nav-link ${activeTab === 'offers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('offers')}
                    role="tab"
                  >
                    Service Offers
                  </button>
                  <button
                    className={`nav-link ${activeTab === 'policies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('policies')}
                    role="tab"
                  >
                    Website Policies
                  </button>
                  <button
                    className={`nav-link ${activeTab === 'guidelines' ? 'active' : ''}`}
                    onClick={() => setActiveTab('guidelines')}
                    role="tab"
                  >
                    Guidelines
                  </button>
                  <button
                    className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contact')}
                    role="tab"
                  >
                    Contact Info
                  </button>
                  <button
                    className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faq')}
                    role="tab"
                  >
                    FAQ
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="col-md-9">
              <div className="tab-content">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Footer */}
      <footer className="map-area">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.4273160098164!2d120.58460077500938!3d15.134859385417268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f3d7084b279b%3A0x1d649fcbc0e03607!2sOffice%20Hub!5e0!3m2!1sen!2sph!4v1772790477380!5m2!1sen!2sph"
          width="600"
          height="450"
          style={{ border: '0' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </footer>

      {/* Page Footer */}
      <footer className="page-footer">
        <div className="container">
          <div className="row" id="contact">
            {/* Left column: Office Details */}
            <div className="col-lg-8 col-md-8 col-sm-12">
              <h3 className="text font-weight-bold">OFFICE DETAILS</h3>
              <p>
                <em>
                  Saint Joseph Street, Angeles City, Pampanga 2009 Philippines
                  <br />
                  (02) 8271 1411
                  <br />
                  office-hub.com
                </em>
              </p>
            </div>

            {/* Right column: Contact Details */}
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h6 className="text-uppercase font-weight-bold">MORE INFORMATION</h6>
              <p>
                <em>
                  4HMP+WV Angeles City, Pampanga
                  <br />
                  mtlim@gmail.com
                  <br />
                  0908-384-1752
                </em>
              </p>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="footer-copyright text-center">
            © 2026 Copyright
          </div>
        </div>
      </footer>
    </>
  );
}
