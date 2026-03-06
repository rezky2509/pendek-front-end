'use client';
import { useState } from 'react';

export default function UrlInput() {
    const [input, setInput] = useState('');
    const [processing, setProcessing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleExecute = () => {
        if (input.length > 0) {
            setProcessing(true);
            setShowResult(false);

            setTimeout(() => {
                setShowResult(true);
                setProcessing(false);
            }, 800);
        }
    };

    return (
        <>
            <div className="input-group">
                <span className="terminal-prompt">&gt;</span>
                <input
                    type="text"
                    placeholder="https://very-long-url.com/entry-point"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleExecute();
                    }}
                />

                <div className="action-row">
                    <button style={{ background: 'transparent', color: 'black', padding: '16px 20px', border: 'none', textDecoration: 'underline' }}>OPTIONS</button>
                    <button onClick={handleExecute}>
                        {processing ? "PROCESSING..." : "EXECUTE"}
                    </button>
                </div>
            </div>

            <div className="result-area" style={{ display: showResult ? 'block' : 'none' }}>
                <span className="result-label">OUTPUT:</span>
                shrt.io/x92f
            </div>
        </>
    );
}
