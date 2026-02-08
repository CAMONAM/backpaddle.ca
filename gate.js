(function() {
  function hash(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
  }
  
  const KEY = 'eljzl0'; // hash of the password
  const stored = sessionStorage.getItem('bp_auth');
  if (stored === KEY) return;
  
  document.documentElement.style.display = 'none';
  
  const overlay = document.createElement('div');
  overlay.id = 'bp-gate';
  overlay.innerHTML = `
    <style>
      #bp-gate {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: #0a0f0d;
        display: flex; align-items: center; justify-content: center;
        flex-direction: column; gap: 20px; z-index: 99999;
        font-family: 'Inter', system-ui, sans-serif;
      }
      #bp-gate img { height: 80px; }
      #bp-gate h1 { color: #f0fdf4; font-size: 2rem; letter-spacing: -0.02em; }
      #bp-gate h1 span { color: #4ade80; }
      #bp-gate input {
        padding: 12px 20px; border-radius: 8px; border: 1px solid #1e293b;
        background: #141a17; color: #f0fdf4; font-size: 16px; width: 260px;
        text-align: center; outline: none;
      }
      #bp-gate input:focus { border-color: #4ade80; }
      #bp-gate .hint { color: #94a3b8; font-size: 13px; }
      #bp-gate .error { color: #E53935; font-size: 13px; display: none; }
    </style>
    <img src="/assets/backpaddle-paddles.png" alt="">
    <h1>Back<span>paddle</span></h1>
    <input type="password" id="bp-pass" placeholder="Enter password" autofocus>
    <div class="error" id="bp-error">Wrong password</div>
    <div class="hint">This site is under construction</div>
  `;
  
  document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(overlay);
    document.documentElement.style.display = '';
    document.documentElement.style.overflow = 'hidden';
    
    document.getElementById('bp-pass').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        if (hash(this.value) === KEY) {
          sessionStorage.setItem('bp_auth', KEY);
          overlay.remove();
          document.documentElement.style.overflow = '';
        } else {
          document.getElementById('bp-error').style.display = 'block';
          this.value = '';
        }
      }
    });
  });
})();
