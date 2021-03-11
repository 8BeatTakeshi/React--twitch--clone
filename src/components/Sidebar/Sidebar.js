import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar_title">Chaines recommandées</h2>
      <ul className="sidebar_streamList"></ul>
    </div>
  );
};

export default Sidebar;
