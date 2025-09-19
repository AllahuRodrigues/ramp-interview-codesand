import React, { useState, useEffect } from 'react';

function App() {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(true);
  const [displayedFlag, setDisplayedFlag] = useState('');
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Fetch the flag from the hidden URL
    fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/636865')
      .then(response => response.text())
      .then(data => {
        setFlag(data.trim());
        setLoading(false);
        setAnimationStarted(true);
      })
      .catch(error => {
        console.error('Error fetching flag:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!animationStarted || !flag) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < flag.length) {
        setDisplayedFlag(flag.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500); // Half second delay between characters

    return () => clearInterval(interval);
  }, [flag, animationStarted]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ramp CTF Challenge</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Flag:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {displayedFlag.split('').map((char, index) => (
              <li key={index} style={{ display: 'inline', margin: '0 2px' }}>
                {char}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 
      URL Extraction Script:
      
      const https = require('https');
      const cheerio = require('cheerio');
      
      const url = 'https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge';
      
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          const $ = cheerio.load(data);
          let hiddenUrl = '';
          
          $('section[data-id^="92"]').each((i, section) => {
            const $section = $(section);
            $section.find('article[data-class$="45"]').each((j, article) => {
              const $article = $(article);
              $article.find('div[data-tag*="78"]').each((k, div) => {
                const $div = $(div);
                const $b = $div.find('b.ref[value]');
                if ($b.length > 0) {
                  const char = $b.attr('value');
                  if (char) {
                    hiddenUrl += char;
                  }
                }
              });
            });
          });
          
          console.log('Hidden URL:', hiddenUrl);
        });
      });
      */}
    </div>
  );
}

export default App;
