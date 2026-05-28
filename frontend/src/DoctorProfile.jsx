import React, { useState } from 'react';
import './DoctorProfile.css';

// React Icons Imports
import { IoMdArrowBack } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { FiCheckCircle, FiPauseCircle, FiXCircle, FiInfo } from "react-icons/fi";
import { 
  BiShieldAlt2, 
  BiRupee, 
  BiCalendar, 
  BiMedal, 
  BiFirstAid, 
  BiLeaf, 
  BiUser, 
  BiCalendarPlus, 
  BiGlobe, 
  BiFile, 
  BiBriefcase, 
  BiLink, 
  BiPhone, 
  BiUserPlus,
  BiFileBlank
} from "react-icons/bi";
import { IoLanguageOutline } from "react-icons/io5";

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="dashboard-container">
      {/* Back Button */}
      <button className="back-button">
        <IoMdArrowBack size={18} /> Back to Doctors
      </button>

      {/* Top Profile Card */}
      <div className="card profile-top-card">
        <div className="profile-main">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img 
                src="https://via.placeholder.com/120" 
                alt="Dr. Rohit Sharma" 
                className="avatar-img"
              />
              <span className="online-indicator"></span>
            </div>
            <div className="status-badges">
              <span className="badge badge-success"><FiCheckCircle /> Approved</span>
              <span className="badge badge-neutral"><BiShieldAlt2 /> Profile Verified</span>
            </div>
          </div>

          {/* Info Section */}
          <div className="profile-info-section">
            <div className="profile-header">
              <h1>Dr. Rohit Sharma <MdVerified className="verified-tick" /></h1>
              <p className="subtitle">Ayurvedic Doctor</p>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-icon"><BiMedal size={20} /></span>
                <div>
                  <strong>10+</strong>
                  <p>Years Experience</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon"><BiRupee size={20} /></span>
                <div>
                  <strong>₹1000.00</strong>
                  <p>Consultation Fee</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon"><BiCalendar size={20} /></span>
                <div>
                  <strong>8+</strong>
                  <p>Practice Years</p>
                </div>
              </div>
            </div>

            <div className="tags-row">
              <span className="tag"><BiFirstAid size={14} /> BAMS</span>
              <span className="tag"><BiLeaf size={14} /> Panchakarma</span>
              <span className="tag"><BiUser size={14} /> Vata Dosha Expert</span>
            </div>
          </div>
        </div>

        {/* Right Side: Extra Info & Actions */}
        <div className="profile-side-info">
          <div className="side-details">
            <div className="detail-item">
              <BiCalendarPlus className="detail-icon" size={20} />
              <div>
                <p className="detail-label">Date of Birth</p>
                <p className="detail-value">12 May 1990</p>
              </div>
            </div>
            <div className="detail-item">
              <IoLanguageOutline className="detail-icon" size={20} />
              <div>
                <p className="detail-label">Languages</p>
                <p className="detail-value">Hindi, English</p>
              </div>
            </div>
            <div className="detail-item">
              <BiGlobe className="detail-icon" size={20} />
              <div>
                <p className="detail-label">Nationality</p>
                <p className="detail-value">Indian</p>
              </div>
            </div>
            <div className="detail-item bio-item">
              <BiFile className="detail-icon" size={20} />
              <div>
                <p className="detail-label">Bio</p>
                <p className="detail-value">Ayurvedic Doctor with<br/>10+ years of experience.</p>
              </div>
            </div>
          </div>
          <div className="action-buttons-column">
            <button className="btn btn-approve"><FiCheckCircle size={16} /> Approve</button>
            <button className="btn btn-suspend"><FiPauseCircle size={16} /> Suspend</button>
            <button className="btn btn-reject"><FiXCircle size={16} /> Reject</button>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'personal' ? 'active' : ''}`} 
          onClick={() => setActiveTab('personal')}
        >
          <BiUser size={18} /> Personal Information
        </button>
        <button className="tab"><BiBriefcase size={18} /> Professional Information</button>
        <button className="tab"><BiLink size={18} /> Social Links</button>
        <button className="tab"><BiFileBlank size={18} /> Documents</button>
      </div>

      {/* Tab Content Grid */}
      <div className="info-cards-grid">
        {/* Personal Details Card */}
        <div className="card info-card">
          <h3><BiUser size={20} className="card-heading-icon"/> Personal Details</h3>
          <ul className="info-list">
            <li><span>Date of Birth</span> <span>12 May 1990</span></li>
            <li><span>Gender</span> <span>Male</span></li>
            <li><span>Nationality</span> <span>Indian</span></li>
            <li><span>Languages Spoken</span> <span>Hindi, English</span></li>
            <li className="align-top">
              <span>Bio</span> 
              <span className="text-right">Ayurvedic Doctor with<br/>10+ years of experience.</span>
            </li>
          </ul>
        </div>

        {/* Contact Information Card */}
        <div className="card info-card">
          <h3><BiPhone size={20} className="card-heading-icon"/> Contact Information</h3>
          <ul className="info-list">
            <li><span>Email</span> <span>doctor@test.com</span></li>
            <li><span>Phone</span> <span>9876543210</span></li>
            <li className="align-top">
              <span>Address</span> 
              <span className="text-right">Sector 10, Delhi, Delhi<br/>110001, India</span>
            </li>
          </ul>
        </div>

        {/* Emergency Contact Card */}
        <div className="card info-card">
          <h3><BiUserPlus size={20} className="card-heading-icon"/> Emergency Contact</h3>
          <ul className="info-list">
            <li><span>Contact Name</span> <span>Rohit</span></li>
            <li><span>Relation</span> <span>Brother</span></li>
            <li><span>Phone</span> <span>9999999999</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="card footer-action-bar">
        <div className="footer-info">
          <span className="info-icon"><FiInfo size={22} /></span>
          <div>
            <h4>Review the doctor's profile and take appropriate action.</h4>
            <p>Please verify all the details before approving.</p>
          </div>
        </div>
        <div className="action-buttons-row">
          <button className="btn btn-reject-outline"><FiXCircle size={16} /> Reject</button>
          <button className="btn btn-suspend-outline"><FiPauseCircle size={16} /> Suspend</button>
          <button className="btn btn-approve"><FiCheckCircle size={16} /> Approve</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;