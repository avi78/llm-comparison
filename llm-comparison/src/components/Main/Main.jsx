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
    input
  } = useContext(Context);

  // Handle keypress for the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input) {
      onSent();
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <div className="dropdown">
          <img src={assets.user_icon} alt="" />
          <select>
            <option value="default">Gemini 1.0 Pro</option>
            <option value="advanced">Gemini 1.5 Flash</option>
            <option value="creative">Gemini 1.5 Flash-8b</option>
          </select>
        </div>
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
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
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
          </>
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
