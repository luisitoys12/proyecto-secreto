(() => {
  const STORAGE_KEYS = {
    overlay: 'obs_broadcast_overlay_v2',
    cameras: 'obs_broadcast_cameras_v2',
    media: 'obs_broadcast_media_v2',
    calls: 'obs_broadcast_calls_v2'
  };

  const CHANNEL_NAME = 'obs_broadcast_overlay_channel';
  const channel = ('BroadcastChannel' in window) ? new BroadcastChannel(CHANNEL_NAME) : null;

  const getJson = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const setJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const escapeHtml = (value) =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const safeUrl = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.toString();
    } catch {
      return '';
    }
    return '';
  };

  const asYouTubeEmbed = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtu.be')) {
        return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`;
      }
      if (parsed.hostname.includes('youtube.com')) {
        const id = parsed.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    } catch {
      return '';
    }
    return '';
  };

  const effectPresets = {
    clean: { shadow: 'none', filter: 'none' },
    cinematic: { shadow: '0 8px 35px rgba(42,121,255,0.45)', filter: 'saturate(1.15) contrast(1.08)' },
    neon: { shadow: '0 0 18px rgba(0,255,255,0.75)', filter: 'saturate(1.35) brightness(1.08)' }
  };

  const publishOverlayData = (data) => {
    setJson(STORAGE_KEYS.overlay, data);
    if (channel) channel.postMessage(data);
  };

  const isOverlayPage = document.body.classList.contains('overlay-body');

  if (isOverlayPage) {
    const apply = (data) => {
      const shell = document.getElementById('shell');
      if (!data || !shell) return;
      document.getElementById('ovTitle').textContent = data.title || 'OBS Broadcast Suite';
      document.getElementById('ovSubtitle').textContent = data.subtitle || 'Overlay en espera';
      document.getElementById('ovA').textContent = data.teamA || 'Equipo A';
      document.getElementById('ovB').textContent = data.teamB || 'Equipo B';
      document.getElementById('ovSA').textContent = String(data.scoreA ?? 0);
      document.getElementById('ovSB').textContent = String(data.scoreB ?? 0);
      document.getElementById('ovTimer').textContent = data.timer || '00:00';
      shell.style.setProperty('--accent', data.accent || '#2a79ff');
      shell.style.opacity = `${Number(data.opacity ?? 92) / 100}`;

      const preset = effectPresets[data.effectPreset] || effectPresets.clean;
      shell.style.boxShadow = preset.shadow;
      shell.style.filter = preset.filter;
    };

    apply(getJson(STORAGE_KEYS.overlay, {}));

    if (channel) channel.addEventListener('message', (ev) => apply(ev.data));
    window.addEventListener('storage', (ev) => {
      if (ev.key === STORAGE_KEYS.overlay && ev.newValue) {
        try { apply(JSON.parse(ev.newValue)); } catch {}
      }
    });
    return;
  }

  const byId = (id) => document.getElementById(id);
  if (!byId('publishOverlay')) return;

  const overlay = {
    title: byId('overlayTitle'),
    subtitle: byId('overlaySubtitle'),
    teamA: byId('teamA'),
    teamB: byId('teamB'),
    scoreA: byId('scoreA'),
    scoreB: byId('scoreB'),
    timer: byId('timer'),
    accent: byId('accent'),
    effectPreset: byId('effectPreset'),
    opacity: byId('overlayOpacity')
  };

  const overlayUrlOutput = byId('overlayUrlOutput');
  const overlayUrl = `${window.location.origin}${window.location.pathname.replace('control-center.html', 'obs-browser-overlay.html')}`;
  overlayUrlOutput.textContent = `URL para Browser Source en OBS: ${overlayUrl}`;

  const hydrateOverlayForm = () => {
    const state = getJson(STORAGE_KEYS.overlay, {});
    overlay.title.value = state.title || '';
    overlay.subtitle.value = state.subtitle || '';
    overlay.teamA.value = state.teamA || '';
    overlay.teamB.value = state.teamB || '';
    overlay.scoreA.value = Number(state.scoreA ?? 0);
    overlay.scoreB.value = Number(state.scoreB ?? 0);
    overlay.timer.value = state.timer || '';
    overlay.accent.value = state.accent || '#2a79ff';
    overlay.effectPreset.value = state.effectPreset || 'clean';
    overlay.opacity.value = Number(state.opacity ?? 92);
  };

  const collectOverlay = () => ({
    title: overlay.title.value.trim(),
    subtitle: overlay.subtitle.value.trim(),
    teamA: overlay.teamA.value.trim(),
    teamB: overlay.teamB.value.trim(),
    scoreA: Number(overlay.scoreA.value || 0),
    scoreB: Number(overlay.scoreB.value || 0),
    timer: overlay.timer.value.trim(),
    accent: overlay.accent.value,
    effectPreset: overlay.effectPreset.value,
    opacity: Number(overlay.opacity.value || 92)
  });

  byId('publishOverlay').addEventListener('click', () => publishOverlayData(collectOverlay()));
  byId('resetOverlay').addEventListener('click', () => {
    const empty = {
      title: '', subtitle: '', teamA: '', teamB: '', scoreA: 0, scoreB: 0, timer: '',
      accent: '#2a79ff', effectPreset: 'clean', opacity: 92
    };
    publishOverlayData(empty);
    hydrateOverlayForm();
  });
  byId('openOverlayPreview').addEventListener('click', () => window.open(overlayUrl, '_blank', 'noopener,noreferrer'));

  // Cameras
  const cameraGrid = byId('cameraGrid');
  const renderCameras = () => {
    const cameras = getJson(STORAGE_KEYS.cameras, []);
    cameraGrid.innerHTML = '';
    cameras.forEach((cam, idx) => {
      const name = escapeHtml(cam.name);
      const url = safeUrl(cam.url);
      if (!url) return;

      const el = document.createElement('article');
      el.className = 'camera-tile';
      el.innerHTML = `
        <header class="camera-head">
          <strong>${name}</strong>
          <button class="btn" data-remove="${idx}">Quitar</button>
        </header>
        <iframe class="camera-frame" src="${url}" loading="lazy" referrerpolicy="no-referrer"></iframe>
      `;
      cameraGrid.appendChild(el);
    });

    cameraGrid.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-remove'));
        const cameras = getJson(STORAGE_KEYS.cameras, []);
        cameras.splice(idx, 1);
        setJson(STORAGE_KEYS.cameras, cameras);
        renderCameras();
      });
    });
  };

  byId('addCamera').addEventListener('click', () => {
    const name = byId('cameraName').value.trim();
    const url = safeUrl(byId('cameraUrl').value.trim());
    if (!name || !url) return;
    const cameras = getJson(STORAGE_KEYS.cameras, []);
    cameras.push({ name, url });
    setJson(STORAGE_KEYS.cameras, cameras);
    renderCameras();
  });

  byId('clearCameras').addEventListener('click', () => {
    setJson(STORAGE_KEYS.cameras, []);
    renderCameras();
  });

  // Calls Jitsi/Zoom
  const callList = byId('callList');
  const renderCalls = () => {
    const calls = getJson(STORAGE_KEYS.calls, []);
    callList.innerHTML = '';
    calls.forEach((call, idx) => {
      const title = escapeHtml(call.title || 'Llamada');
      const url = safeUrl(call.url);
      const provider = escapeHtml(call.provider);
      if (!url) return;

      const item = document.createElement('article');
      item.className = 'media-item';
      item.innerHTML = `
        <header class="media-head">
          <strong>${title}</strong>
          <button class="btn" data-remove-call="${idx}">Quitar</button>
        </header>
        <div class="media-body">
          <p class="note">${provider.toUpperCase()}</p>
          <iframe class="media-embed" src="${url}" loading="lazy" referrerpolicy="no-referrer"></iframe>
          <p><a href="${url}" target="_blank" rel="noopener noreferrer">Abrir llamada en nueva pestaña</a></p>
        </div>
      `;
      callList.appendChild(item);
    });

    callList.querySelectorAll('[data-remove-call]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-remove-call'));
        const calls = getJson(STORAGE_KEYS.calls, []);
        calls.splice(idx, 1);
        setJson(STORAGE_KEYS.calls, calls);
        renderCalls();
      });
    });
  };

  byId('addCall').addEventListener('click', () => {
    const provider = byId('callProvider').value;
    const title = byId('callTitle').value.trim();
    const url = safeUrl(byId('callUrl').value.trim());
    if (!url) return;
    const calls = getJson(STORAGE_KEYS.calls, []);
    calls.push({ provider, title, url });
    setJson(STORAGE_KEYS.calls, calls);
    renderCalls();
  });

  byId('clearCalls').addEventListener('click', () => {
    setJson(STORAGE_KEYS.calls, []);
    renderCalls();
  });

  // Media URL manager
  const mediaList = byId('mediaList');
  const renderMedia = () => {
    const items = getJson(STORAGE_KEYS.media, []);
    mediaList.innerHTML = '';

    items.forEach((item, idx) => {
      const title = escapeHtml(item.title || 'Media');
      const platform = escapeHtml(item.platform);
      const url = safeUrl(item.url);
      if (!url) return;

      const el = document.createElement('article');
      el.className = 'media-item';

      const embed = item.platform === 'youtube' ? asYouTubeEmbed(url) : '';
      const body = embed
        ? `<iframe class="media-embed" src="${embed}" allowfullscreen></iframe>`
        : `<p><a href="${url}" target="_blank" rel="noopener noreferrer">Abrir enlace</a></p>`;

      el.innerHTML = `
        <header class="media-head">
          <strong>${title}</strong>
          <button class="btn" data-remove-media="${idx}">Quitar</button>
        </header>
        <div class="media-body">
          <p class="note">${platform.toUpperCase()}</p>
          ${body}
        </div>
      `;
      mediaList.appendChild(el);
    });

    mediaList.querySelectorAll('[data-remove-media]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-remove-media'));
        const items = getJson(STORAGE_KEYS.media, []);
        items.splice(idx, 1);
        setJson(STORAGE_KEYS.media, items);
        renderMedia();
      });
    });
  };

  byId('addMedia').addEventListener('click', () => {
    const platform = byId('mediaPlatform').value;
    const title = byId('mediaTitle').value.trim();
    const url = safeUrl(byId('mediaUrl').value.trim());
    if (!url) return;
    const items = getJson(STORAGE_KEYS.media, []);
    items.push({ platform, title, url });
    setJson(STORAGE_KEYS.media, items);
    renderMedia();
  });

  byId('clearMedia').addEventListener('click', () => {
    setJson(STORAGE_KEYS.media, []);
    renderMedia();
  });

  hydrateOverlayForm();
  renderCameras();
  renderCalls();
  renderMedia();
})();
