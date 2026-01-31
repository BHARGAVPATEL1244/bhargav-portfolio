'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Moon, CloudLightning, CloudSnow, Wind, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Weather code mapping (WMO)
const getWeatherIcon = (code: number, isDay: number) => {
    // 0: Clear sky
    if (code === 0) return isDay ? <Sun className="w-16 h-16 text-yellow-400" /> : <Moon className="w-16 h-16 text-indigo-200" />;

    // 1, 2, 3: Partly cloudy
    if (code <= 3) return <Cloud className="w-16 h-16 text-gray-400" />;

    // 45, 48: Fog
    if (code <= 48) return <Cloud className="w-16 h-16 text-gray-500 opacity-50" />;

    // 51-67: Drizzle/Rain
    if (code <= 67) return <CloudRain className="w-16 h-16 text-blue-400" />;

    // 71-77: Snow
    if (code <= 77) return <CloudSnow className="w-16 h-16 text-white" />;

    // 80-82: Rain showers
    if (code <= 82) return <CloudRain className="w-16 h-16 text-blue-500" />;

    // 85-86: Snow showers
    if (code <= 86) return <CloudSnow className="w-16 h-16 text-gray-200" />;

    // 95-99: Thunderstorm
    return <CloudLightning className="w-16 h-16 text-purple-400" />;
};

const getBackgroundGradient = (code: number, isDay: number) => {
    if (code <= 3) return isDay ? "bg-gradient-to-br from-blue-400/20 to-orange-300/20" : "bg-gradient-to-br from-indigo-900/40 to-slate-800/40";
    if (code <= 67) return "bg-gradient-to-br from-slate-700/40 to-blue-900/40"; // Rain
    if (code >= 95) return "bg-gradient-to-br from-slate-900/60 to-purple-900/40"; // Storm
    return "bg-gradient-to-br from-slate-800/30 to-slate-900/30"; // Default
};

interface WeatherData {
    temperature: number;
    weatherCode: number;
    isDay: number;
    windSpeed: number;
}

export default function WeatherApp() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Default to Tokyo for that "Cyberpunk" vibe if geo fails
    const [locationName, setLocationName] = useState("Neo Tokyo");

    useEffect(() => {
        const fetchWeather = async (lat: number, lon: number, name?: string) => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,wind_speed_10m&timezone=auto`
                );
                const json = await res.json();

                if (json.error) throw new Error("Weather API Error");

                setData({
                    temperature: json.current.temperature_2m,
                    weatherCode: json.current.weather_code,
                    isDay: json.current.is_day,
                    windSpeed: json.current.wind_speed_10m
                });
                if (name) setLocationName(name);
            } catch (err) {
                console.error(err);
                setError("Connection Lost");
            } finally {
                setLoading(false);
            }
        };

        // Try to get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    fetchWeather(pos.coords.latitude, pos.coords.longitude, "Local Sector");
                },
                () => {
                    // Fallback using approx IP location or hardcoded default
                    fetchWeather(35.6762, 139.6503, "Neo Tokyo"); // Tokyo
                }
            );
        } else {
            fetchWeather(35.6762, 139.6503, "Neo Tokyo");
        }
    }, []);

    if (loading) return (
        <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-md">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
        </div>
    );

    if (error || !data) return (
        <div className="w-full h-full flex flex-col items-center justify-center text-red-400 p-4 text-center">
            <CloudLightning className="w-12 h-12 mb-2" />
            <p>{error || "No Signal"}</p>
        </div>
    );

    const bgClass = getBackgroundGradient(data.weatherCode, data.isDay);

    return (
        <div className={`w-full h-full relative overflow-hidden flex flex-col items-center justify-between p-8 text-white ${bgClass} transition-colors duration-1000`}>

            {/* Header */}
            <div className="w-full flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium tracking-wider uppercase">{locationName}</span>
                </div>
                <div className="text-xs text-white/40 font-mono">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            {/* Main Weather Display */}
            <div className="flex flex-col items-center z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="mb-4"
                >
                    {getWeatherIcon(data.weatherCode, data.isDay)}
                </motion.div>

                <h1 className="text-6xl font-light tracking-tighter mix-blend-overlay">
                    {Math.round(data.temperature)}°
                </h1>
                <p className="text-white/60 text-lg font-light">
                    {/* Simple map for code text */}
                    {data.weatherCode === 0 ? "Clear" :
                        data.weatherCode <= 3 ? "Cloudy" :
                            data.weatherCode <= 67 ? "Rainy" :
                                data.weatherCode >= 95 ? "Storm" : "Overcast"}
                </p>
            </div>

            {/* Details */}
            <div className="w-full grid grid-cols-2 gap-4 border-t border-white/10 pt-6 z-10">
                <div className="flex flex-col items-center bg-white/5 p-3 rounded-xl backdrop-blur-sm">
                    <Wind className="w-5 h-5 text-blue-300 mb-1" />
                    <span className="text-sm font-medium">{data.windSpeed} <span className="text-[10px] text-white/50">km/h</span></span>
                </div>
                <div className="flex flex-col items-center bg-white/5 p-3 rounded-xl backdrop-blur-sm">
                    {data.isDay ? <Sun className="w-5 h-5 text-yellow-300 mb-1" /> : <Moon className="w-5 h-5 text-indigo-300 mb-1" />}
                    <span className="text-sm font-medium">{data.isDay ? "Day" : "Night"}</span>
                </div>
            </div>

            {/* Animated Rain Background (CSS only for perf) */}
            {(data.weatherCode >= 51 && data.weatherCode <= 67) || (data.weatherCode >= 80 && data.weatherCode <= 82) ? (
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none rain-container">
                    {/* Add simple CSS rain here or just rely on gradient for now to keep it clean */}
                </div>
            ) : null}

        </div>
    );
}
