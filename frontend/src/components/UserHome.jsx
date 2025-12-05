import React from 'react';
import WinterCanvas from './background/WinterCanvas';

const UserHome = ({ onLogout }) => {
    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <WinterCanvas />

            <div className="user-container" style={{
                display: 'flex',
                height: '100%',
                position: 'relative',
                zIndex: 10,
                color: 'var(--winter-text)',
                fontFamily: "'Inter', sans-serif"
            }}>
                {/* Sidebar */}
                <div style={{
                    width: '280px',
                    ...glassStyle,
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem'
                }}>
                    <h2 style={{ marginBottom: '3rem', color: 'var(--winter-accent)', textShadow: '0 0 10px rgba(56, 189, 248, 0.3)' }}>Y-Lounge</h2>
                    <nav style={{ flex: 1 }}>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['Dashboard', 'Messages', 'Contacts', 'Settings'].map((item) => (
                                <li key={item} style={{
                                    padding: '15px 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'pointer',
                                    color: item === 'Dashboard' ? 'white' : 'rgba(255,255,255,0.6)',
                                    fontWeight: item === 'Dashboard' ? 'bold' : 'normal'
                                }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <button
                        onClick={onLogout}
                        style={{
                            padding: '12px',
                            background: 'rgba(255, 75, 75, 0.2)',
                            color: '#ff6b6b',
                            border: '1px solid rgba(255, 75, 75, 0.3)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginTop: 'auto',
                            transition: 'all 0.2s'
                        }}
                    >
                        Logout
                    </button>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Hello, User!</h1>
                            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>The aurora looks beautiful today.</p>
                        </div>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'var(--winter-accent)',
                            borderRadius: '50%',
                            boxShadow: '0 0 15px rgba(56, 189, 248, 0.5)'
                        }}></div>
                    </header>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {['Recent Chats', 'Online Friends', 'Notifications'].map((title) => (
                            <div key={title} style={{
                                ...glassStyle,
                                padding: '2rem',
                                borderRadius: '20px',
                                transition: 'transform 0.3s',
                                cursor: 'pointer'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <h3 style={{ marginBottom: '1rem', color: 'var(--winter-accent)' }}>{title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)' }}>No content available.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
