import React, { useState, useEffect } from 'react';
import WinterCanvas from './background/WinterCanvas';
import VoiceRoom from './VoiceRoom';
import CampfireField from './CampfireField';
import ChatOverlay from './ChatOverlay';
import ErrorBoundary from './ErrorBoundary';
import Bonfire from './Bonfire';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const UserHome = ({ user, onLogout }) => {
    const [currentRoom, setCurrentRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [chatBubbles, setChatBubbles] = useState({});

    // WebSocket & Participant Logic (Lifted State)
    useEffect(() => {
        if (!currentRoom) {
            setParticipants([]);
            return;
        }

        const socket = new SockJS('http://172.21.102.46:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                // Subscribe to room signaling channel (Participants)
                stompClient.subscribe(`/topic/room/${currentRoom}`, (message) => {
                    const signal = JSON.parse(message.body);
                    if (signal.type === 'join' || signal.type === 'leave') {
                        if (signal.users) setParticipants(signal.users);
                    }
                });

                // Subscribe to Chat channel (Bubbles)
                stompClient.subscribe(`/topic/room/${currentRoom}/chat`, (message) => {
                    const msg = JSON.parse(message.body);
                    const msgId = Date.now() + Math.random();

                    setChatBubbles(prev => {
                        const userBubbles = prev[msg.sender] || [];
                        const updated = [...userBubbles, { id: msgId, text: msg.content }];
                        if (updated.length > 3) updated.shift();
                        return { ...prev, [msg.sender]: updated };
                    });

                    // Remove after 5 seconds
                    setTimeout(() => {
                        setChatBubbles(prev => {
                            const userBubbles = prev[msg.sender];
                            if (!userBubbles) return prev;
                            return {
                                ...prev,
                                [msg.sender]: userBubbles.filter(b => b.id !== msgId)
                            };
                        });
                    }, 5000);
                });

                // Send JOIN signal
                stompClient.publish({
                    destination: `/app/join/${currentRoom}`,
                    body: JSON.stringify({
                        type: 'join',
                        sender: user.username
                    })
                });
            },
            onDisconnect: () => {
                console.log("Disconnected from room");
            }
        });

        stompClient.activate();

        // Initial fetch as fallback
        fetch(`http://172.21.102.46:8080/api/rooms/${currentRoom}/users`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setParticipants(data);
            })
            .catch(e => console.error(e));

        return () => {
            stompClient.deactivate();
        };
    }, [currentRoom, user.username]);


    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#050505' }}>

            {/* Logout Button (Floating) */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 100 }}>
                <button onClick={onLogout} style={{
                    background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid #555',
                    padding: '8px 16px', borderRadius: '4px', cursor: 'pointer'
                }}>
                    Leave the Cold (Logout)
                </button>
            </div>

            {/* Main Content Layer */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
                {!currentRoom ? (
                    // LOBBY VIEW: The Field of Bonfires
                    <>
                        <WinterCanvas />
                        <ErrorBoundary>
                            <CampfireField
                                user={user}
                                onJoinRoom={(roomId) => setCurrentRoom(roomId)}
                            />
                        </ErrorBoundary>
                    </>
                ) : (
                    // ROOM VIEW: Enhanced Night Atmosphere
                    <div style={{
                        position: 'relative',
                        width: '100%', height: '100%',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        animation: 'fadeIn 2s ease',
                        backgroundColor: '#050c14' // Deep cold blue-black base
                    }}>

                        {/* 1. Forest Background Layer */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            backgroundImage: 'url("/forest_bg.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center bottom',
                            filter: 'brightness(0.3) blur(2px)', // Dark and slightly out of focus
                            zIndex: 0
                        }}></div>

                        {/* 2. Ground Floor with Melted Snow Effect */}
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%',
                            background: `
                                radial-gradient(
                                    ellipse at center bottom, 
                                    rgba(62, 39, 35, 0.9) 0%,   /* Wet dark mud near fire */
                                    rgba(62, 39, 35, 0.6) 30%,  /* Mud fading */
                                    rgba(255, 255, 255, 0.1) 60%, /* Snow mixing in */
                                    transparent 80%
                                )
                            `,
                            transform: 'scaleX(1.5)', // Stretch horizontally
                            zIndex: 1
                        }}></div>

                        {/* 3. Vignette & Atmosphere Overlay */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'radial-gradient(circle at center, transparent 10%, rgba(0,0,0,0.4) 40%, #000 90%)',
                            zIndex: 2, pointerEvents: 'none'
                        }}></div>

                        {/* 4. Fire Light & Glow (Brighter Center) */}
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: '800px', height: '800px',
                            background: `radial-gradient(circle, rgba(255, 140, 0, ${0.4 + (participants.length * 0.02)}) 0%, rgba(200, 50, 0, 0.1) 40%, transparent 70%)`,
                            mixBlendMode: 'screen', // Additive blending for light
                            pointerEvents: 'none',
                            zIndex: 3
                        }}></div>

                        <ErrorBoundary>
                            {/* Leave Room Button */}
                            <button
                                onClick={() => setCurrentRoom(null)}
                                style={{
                                    position: 'absolute', top: '20px', left: '20px',
                                    background: 'rgba(0,0,0,0.3)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '10px 15px', borderRadius: '8px',
                                    fontSize: '1rem', cursor: 'pointer', zIndex: 50,
                                    backdropFilter: 'blur(2px)', transition: 'all 0.2s'
                                }}
                            >
                                <span>❄️</span> Back
                            </button>

                            {/* Room Title */}
                            <h2 style={{
                                position: 'absolute', top: '15%',
                                color: 'rgba(255, 200, 150, 0.9)', fontSize: '2rem',
                                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                                fontFamily: 'serif', letterSpacing: '4px',
                                zIndex: 10, pointerEvents: 'none'
                            }}>
                                {currentRoom}
                            </h2>

                            {/* Central Dynamic Bonfire */}
                            <div style={{ zIndex: 10, position: 'relative' }}>
                                <Bonfire
                                    roomName=""
                                    userCount={participants.length}
                                    size="large"
                                />
                            </div>

                            {/* Voice Controls (Visible for Debugging) */}
                            <div style={{ position: 'absolute', top: '80px', right: '20px', zIndex: 50, background: 'rgba(0,0,0,0.8)', padding: '10px', borderRadius: '8px' }}>
                                <VoiceRoom roomId={currentRoom} userId={user.username} />
                            </div>

                            {/* Participants Circle */}
                            <RoomParticipantsCircle
                                participants={participants}
                                chatBubbles={chatBubbles}
                                currentUser={user.username}
                            />

                            {/* Text Chat Overlay */}
                            <ChatOverlay roomId={currentRoom} user={user} />
                        </ErrorBoundary>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

// Stateless Sub-component for Circular Layout
const RoomParticipantsCircle = ({ participants, chatBubbles, currentUser }) => {
    const radius = 250; // Distance from fire
    const total = participants.length;

    return (
        <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '0', height: '0', zIndex: 20
        }}>
            {participants.map((username, index) => {
                const angle = (index / total) * 2 * Math.PI;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const yPersp = y * 0.7; // Perspective flattening

                const bubbles = chatBubbles[username] || [];

                return (
                    <div key={username} style={{
                        position: 'absolute',
                        left: `${x}px`, top: `${yPersp}px`,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        transition: 'all 0.5s ease-out'
                    }}>
                        {/* Chat Bubbles Stack */}
                        <div style={{
                            position: 'absolute', bottom: '100%', marginBottom: '10px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            gap: '5px', width: '200px', pointerEvents: 'none'
                        }}>
                            {bubbles.map(bubble => (
                                <div key={bubble.id} style={{
                                    background: 'rgba(20, 20, 20, 0.8)',
                                    color: '#eee',
                                    border: '1px solid #444',
                                    padding: '5px 10px', borderRadius: '12px',
                                    fontSize: '14px', textAlign: 'center'
                                }}>
                                    {bubble.text}
                                </div>
                            ))}
                        </div>

                        {/* Avatar */}
                        <div style={{
                            width: '50px', height: '50px', borderRadius: '50%',
                            background: '#222',
                            border: username === currentUser ? '2px solid #5cb85c' : '2px solid #dba159',
                            boxShadow: '0 5px 15px black',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontSize: '18px', color: '#ddd',
                            position: 'relative'
                        }}>
                            {username.charAt(0).toUpperCase()}
                        </div>

                        {/* Nameplate */}
                        <span style={{
                            marginTop: '8px', color: '#ccc', fontSize: '12px',
                            textShadow: '0 2px 2px black',
                            background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px',
                        }}>
                            {username}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default UserHome;
