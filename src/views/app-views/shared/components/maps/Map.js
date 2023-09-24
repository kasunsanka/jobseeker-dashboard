import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './style.css';
import _ from 'lodash';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhhcmluZHVtYWMiLCJhIjoiY2s3eGlqbm8xMGJkYTNnczg5MjkxYWQzaSJ9.fgP95FAYVeqR9LYo20B-CQ';
const defaultMapStyle = 'mapbox://styles/tharindumac/ck7zwjfvj115x1ip5ymd71j4z';

export default function Map({ width = '100%', height = '400px', mapStyle = defaultMapStyle, qbitsClickable = true, ...props }) {
    // states
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const [lng, setLng] = useState(79.861244);
    const [lat, setLat] = useState(6.927079);
    const [zoom, setZoom] = useState(6);

    // Hooks
    useEffect(() => {
        if (mapRef.current) return; // initialize map only once

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            center: [lng, lat],
            zoom: zoom,
            style: mapStyle
        });

        mapRef.current = map;

        map.on('load', function () {
            if (props.source && props.sourceName && props.clickableLayerName && props.clickableLayerId) {
                let selectedQbits = [];

                // add a data source containing GeoJSON data.
                if (props.source) map.addSource(props.sourceName, props.source);
                // add layers to map
                if (props.layers) props.layers.map(layer => map.addLayer(layer));

                if (qbitsClickable) {
                    map.on('click', props.clickableLayerName, function (e) {
                        const coordinates = e.features[0].geometry.coordinates[0];

                        const bounds = coordinates.reduce(function (bounds, coordinates) {
                            return bounds.extend(coordinates);
                        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

                        // map.fitBounds(bounds, {
                        //     padding: 150
                        // });

                        var features = map.queryRenderedFeatures(e.point, {
                            layers: [props.clickableLayerName]
                        });

                        if (features && features[0]) {
                            if (selectedQbits.find(qbit => qbit.featuresId === features[0].properties.fid)) {
                                selectedQbits = selectedQbits.filter(qbits => qbits.featuresId !== features[0].properties.fid);
                            } else {
                                selectedQbits.push({
                                    featuresId: features[0].properties.fid
                                });
                            }
                        }

                        const featureIds = selectedQbits.map(qbit => qbit['featuresId']);
                        const featureIdsForFilter = ["in", "fid"].concat(props.selectedQbits, featureIds);

                        map.setFilter(props.clickableLayerId, featureIdsForFilter);

                        props.onSelectLayers(props.selectedQbits.concat(featureIds));
                        // map.setFilter(props.clickableLayerId, ["in", "fid"].concat(featureIds));
                    });

                    // Change the cursor to a pointer when the mouse is over the states layer.
                    map.on('mouseenter', props.clickableLayerName, function (e) {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a pointer when it leaves.
                    map.on('mouseleave', props.clickableLayerName, function () {
                        map.getCanvas().style.cursor = '';
                    });
                } else {
                    if (props.selectedQbits) {
                        map.setFilter(props.clickableLayerId, ["in", "fid"].concat(props.selectedQbits));
                    }
                }
            }
        });
    }, [lat, lng, zoom]);

    useEffect(() => {
        if (!mapRef.current) return; // wait for map to initialize
        mapRef.current.on('move', () => {
            setLng(mapRef.current.getCenter().lng.toFixed(4));
            setLat(mapRef.current.getCenter().lat.toFixed(4));
            setZoom(mapRef.current.getZoom().toFixed(2));
        });
    });

    return (
        <div style={{ alignSelf: 'center', top: 30, width: width, height: height, borderRadius: 10, overflow: 'hidden' }}>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}
