import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  // Handler to send the prompt
  const handleSend = () => {
    if (input.trim()) {
      onSent(input); // Send the prompt
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {[
                { text: "Suggest beautiful destinations for travel", icon: assets.compass_icon },
                { text: "Summarize the concept of Urban Planning", icon: assets.bulb_icon },
                { text: "Brainstorming ideas for startups", icon: assets.message_icon },
                { text: "Improve the readability of the following code", icon: assets.code_icon }
              ].map((card, index) => (
                <div 
                  key={index} 
                  className="card" 
                  onClick={() => onSent(card.text)}
                >
                  <p>{card.text}</p>
                  <img src={card.icon} alt={`${card.text} Icon`} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ __html: resultData }} 
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img
                src={assets.send_icon}
                alt="Send Icon"
                onClick={handleSend}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may contain inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;