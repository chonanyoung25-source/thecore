"use client";

const CoreVisualization = () => {
  return (
    <div className="visualization-container">
      <div className="core-sphere">
         {/* Particles for sparkle effect */}
        <div className="particle" style={{ top: '25%', left: '40%', animationDelay: '0s' }} />
        <div className="particle" style={{ top: '50%', left: '75%', animationDelay: '-1s' }} />
        <div className="particle" style={{ top: '75%', left: '30%', animationDelay: '-2s' }} />
      </div>

      {/* Geodesic Wireframe */}
      <div className="geo-sphere">
        <div className="geo-ring" style={{ transform: 'rotateY(0deg) rotateX(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateY(30deg) rotateX(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateY(60deg) rotateX(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateY(90deg) rotateX(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateY(120deg) rotateX(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateY(150deg) rotateX(15deg)' }}></div>
        
        <div className="geo-ring" style={{ transform: 'rotateX(90deg) rotateY(0deg) rotateZ(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateX(90deg) rotateY(30deg) rotateZ(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateX(90deg) rotateY(60deg) rotateZ(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateX(90deg) rotateY(90deg) rotateZ(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateX(90deg) rotateY(120deg) rotateZ(15deg)' }}></div>
        <div className="geo-ring" style={{ transform: 'rotateX(90deg) rotateY(150deg) rotateZ(15deg)' }}></div>
      </div>

      {/* Orbits and Satellites */}
      <div className="orbit-path orbit-1">
        <div className="satellite satellite-1" />
      </div>
      <div className="orbit-path orbit-2">
        <div className="satellite satellite-2" />
      </div>
      <div className="orbit-path orbit-3">
        <div className="satellite satellite-3" />
      </div>
    </div>
  );
};

export default CoreVisualization;
