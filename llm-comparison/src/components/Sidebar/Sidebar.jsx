import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        await onSent(prompt);
        setRecentPrompt(prompt);
    };

    return (
        <div className="sidebar">
            <div className="top">
                {/* Updated Collapsible Nav Icon */}
                <img 
                    src={extended ? assets.close_icon : assets.menu_icon} 
                    alt="toggle" 
                    className="menu" 
                    onClick={() => setExtended((prev) => !prev)} 
                />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="new" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => loadPrompt(item)} 
                                className="recent-entry"
                            >
                                <img src={assets.message_icon} alt="message" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="activity" />
                    {extended ? <p>Activity</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
