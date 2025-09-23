// RotatedMovingMarker.js
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const RotatedMovingMarker = ({ position, heading, path, duration, icon, children, ...props }) => {
  const map = useMap();
  const markerRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef(0);
  const initialPositionRef = useRef(position);

  useEffect(() => {
    if (!map) {
      console.error('Map not available');
      return;
    }

    try {
      // Create the marker if it doesn't exist
      if (!markerRef.current) {
        markerRef.current = L.marker(initialPositionRef.current, {
          icon: icon,
          ...props
        }).addTo(map);
        
        console.log('Marker created at position:', initialPositionRef.current);
      }

      // Handle popup content
      if (children) {
        const popupContent = document.createElement('div');
        popupContent.innerHTML = children.props.children;
        markerRef.current.bindPopup(popupContent);
      }
    } catch (error) {
      console.error('Error creating marker:', error);
    }

    return () => {
      if (markerRef.current) {
        try {
          map.removeLayer(markerRef.current);
        } catch (error) {
          console.error('Error removing marker:', error);
        }
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [map, icon, children, props]);

  useEffect(() => {
    if (!markerRef.current) {
      console.error('Marker not available');
      return;
    }

    try {
      // Cancel any ongoing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (path && path.length > 1 && duration) {
        // Animate movement along path
        const startTime = Date.now();
        const startPosition = L.latLng(path[0]);
        const endPosition = L.latLng(path[1]);
        const startRotation = rotationRef.current;
        const endRotation = heading;
        const rotationDiff = endRotation - startRotation;

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smoother easing function
          const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          // Interpolate position
          const lat = startPosition.lat + (endPosition.lat - startPosition.lat) * easeProgress;
          const lng = startPosition.lng + (endPosition.lng - startPosition.lng) * easeProgress;
          markerRef.current.setLatLng([lat, lng]);

          // Interpolate rotation
          const currentRotation = startRotation + rotationDiff * easeProgress;
          rotationRef.current = currentRotation;
          updateMarkerRotation(currentRotation);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Direct position update
        markerRef.current.setLatLng(position);
        rotationRef.current = heading;
        updateMarkerRotation(heading);
      }
    } catch (error) {
      console.error('Error updating marker:', error);
    }
  }, [position, heading, path, duration]);

  const updateMarkerRotation = (angle) => {
    if (markerRef.current && markerRef.current._icon) {
      try {
        // Find the SVG element inside the icon
        const svgElement = markerRef.current._icon.querySelector('svg');
        if (svgElement) {
          svgElement.style.transition = 'transform 0.3s ease-out';
          svgElement.style.transform = `rotate(${angle}deg)`;
          svgElement.style.transformOrigin = 'center center';
          console.log('Car rotated to:', angle);
        }
      } catch (error) {
        console.error('Error rotating marker:', error);
      }
    }
  };

  return null;
};

export default RotatedMovingMarker;