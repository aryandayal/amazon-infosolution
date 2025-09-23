import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const RotatedMovingMarker = ({ position, heading, path, duration, icon, children, ...props }) => {
  const map = useMap();
  const markerRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef(0);
  const initialPositionRef = useRef(position);

  // Effect for creating the marker and setting up popup
  useEffect(() => {
    if (!map) return;

    // Create the marker if it doesn't exist
    if (!markerRef.current) {
      markerRef.current = L.marker(initialPositionRef.current, {
        icon: icon,
        ...props
      }).addTo(map);
    }

    // Handle popup content
    if (children) {
      const popupContent = document.createElement('div');
      popupContent.innerHTML = children.props.children;
      markerRef.current.bindPopup(popupContent);
    }

    return () => {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [map, icon, children, props]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect for updating position and rotation
  useEffect(() => {
    if (!markerRef.current) return;

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

        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);

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
  }, [position, heading, path, duration]);

  const updateMarkerRotation = (angle) => {
    if (markerRef.current && markerRef.current._icon) {
      markerRef.current._icon.style.transform = `rotate(${angle}deg)`;
      markerRef.current._icon.style.transformOrigin = 'center center';
    }
  };

  return null;
};

export default RotatedMovingMarker;