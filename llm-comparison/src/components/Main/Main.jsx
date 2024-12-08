import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setRecentPrompt,
    setSelectedModel, // New method from context
    selectedModel, // New state from context
  } = useContext(Context);

  // State to track if the user is editing
  const [isEditing, setIsEditing] = useState(false);

  // Handle keypress for the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input) {
      onSent();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setInput(recentPrompt);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSent(input);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value); // Update the model name
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <div className="dropdown">
          <img src={assets.user_icon} alt="" />
          <select onChange={handleModelChange} value={selectedModel}>
            <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
            <option value="gemini-1.5-flash-8b">Gemini 1.5 Flash-8b</option>
          </select>
        </div>
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
              <button className="edit-button" onClick={handleEdit}>Edit</button>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
          </div>
        )}

        {isEditing && (
          <div className="edit-input-container">
            <input
              className="edit-input"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              value={input}
              type="text"
            />
            <button className="edit-button" onClick={handleSave}>Save</button>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.file_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  width={30}
                  alt=""
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
